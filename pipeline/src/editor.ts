import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { runClaude } from './claude';
import { kvDelete, kvGet, kvList, kvPut } from './kv';
import { loadPosts, repoRoot, splitPost, frontmatterValue, type Post } from './posts';
import { sendMessage } from './telegram';
import { catalogHealth } from './variety';
import {
	buildFrontmatter,
	draftFromText,
	improvePost,
	pubDateString,
	slugify,
	type CatalogEntry,
	type Parsed,
} from './writer';

/**
 * Daily editor-in-chief (GitHub Actions, scheduled). Reviews the whole catalog
 * plus any stale idea fragments, then takes exactly ONE action:
 *
 *   new_post      — write & publish a post on an uncovered vertical/topic,
 *                   in a format the decider picks to vary article structure
 *   improve_post  — upgrade an existing thin/stale/style-redundant post
 *                   (may retitle; the slug/URL never changes)
 *   archive_post  — retire a post that is redundant with a better one
 *   skip          — nothing worth doing today
 *
 * It publishes autonomously (commit + push → Cloudflare Pages rebuild) and
 * reports to Telegram with an Undo button. Undo state lives in KV
 * (`undo:<token>`, 7-day TTL); the Pages Function handles the button.
 *
 * Safety guards are enforced in code, not just in the prompt: a 14-day
 * per-slug cooldown (from the committed editor-log.json), an archive floor of
 * 4 active posts, and no archiving of anything touched in the last 30 days.
 *
 * Env: CLAUDE_CODE_OAUTH_TOKEN (CI; locally the logged-in `claude` CLI is used),
 *      TELEGRAM_BOT_TOKEN, TELEGRAM_OWNER_ID,
 *      CF_ACCOUNT_ID, CF_KV_NAMESPACE_ID, CF_API_TOKEN,
 *      SITE_URL (optional), EDITOR_DRY_RUN=1 (optional — no push/KV/Telegram).
 */

const DRY_RUN = !!process.env.EDITOR_DRY_RUN;
const SITE_URL = process.env.SITE_URL || 'https://vertical-agent-solutions.pages.dev';
const LOG_PATH = path.join(repoRoot, 'pipeline', 'editor-log.json');
const UNDO_TTL_SECONDS = 7 * 24 * 60 * 60;
const COOLDOWN_DAYS = 14; // don't touch the same slug twice within this window
const ARCHIVE_MIN_ACTIVE = 4; // never shrink the catalog below this
const ARCHIVE_MIN_AGE_DAYS = 30; // never archive something recently published/updated
const FRAGMENT_MIN_AGE_HOURS = 48; // leave fresh fragments to the manual /draft flow

interface Decision {
	action: 'new_post' | 'improve_post' | 'archive_post' | 'skip';
	slug?: string;
	topic?: string;
	brief?: string;
	format?: string;
	fragmentId?: string;
	reason?: string;
}

interface LogEntry {
	date: string; // ISO
	action: string;
	slug: string;
	reason: string;
}

interface Fragment {
	id: string;
	text: string;
	createdAt: string;
}

const DECIDER_SYSTEM = `You are the editor-in-chief of "Vertical Agent Solutions", a blog teaching non-technical business owners how to adopt AI agents, one industry (vertical) at a time. Once per day you pick exactly ONE action that most moves the blog forward.

Actions:
- "new_post": commission a post on a vertical or topic the blog has not covered yet. Prefer breadth — reach new industries before deepening covered ones. Phrase "topic" the way the target reader would type it into Google, and write a 2–4 sentence "brief" for the writer. Also set "format" — the article's structure — picked to differ from what recent posts used: practical guide, cost/ROI breakdown, FAQ, case walkthrough, myth-busting, checklist, or comparison.
- "improve_post": upgrade an existing post that is thin (well under ~600 words), stale, weaker than its topic deserves, or style-redundant — a templated title that mirrors another post's phrasing, or boilerplate sections duplicated across posts (see "Catalog health"). Set "slug" and a specific "brief" saying what to fix or expand. Retitling is allowed and encouraged for templated titles — say so explicitly in the brief; the URL/slug never changes, so it is safe.
- "archive_post": retire a post that is clearly redundant with a better one or off-mission. Set "slug" and "reason". Be conservative — only clear cases.
- "skip": nothing worth doing today. A respectable choice; do not invent work.

Rules:
- Never pick a slug listed under "Recently touched" — those are cooling down.
- One action only. Quality over volume: a repetitive catalog is worse than a small one.
- Idea fragments from the owner are optional inspiration for new_post; if you build on one, set "fragmentId".
- Always explain "reason" in one or two sentences.

Respond with ONLY a JSON object, no prose, in exactly this shape (omit fields that don't apply):
{"action":"new_post|improve_post|archive_post|skip","slug":"...","topic":"...","brief":"...","format":"...","fragmentId":"...","reason":"..."}`;

function git(...args: string[]): string {
	return execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8' });
}

function daysSince(dateStr: string): number {
	const t = new Date(dateStr).getTime();
	if (Number.isNaN(t)) return Infinity;
	return (Date.now() - t) / 86_400_000;
}

async function readLog(): Promise<LogEntry[]> {
	try {
		const entries = JSON.parse(await fs.readFile(LOG_PATH, 'utf8')) as LogEntry[];
		return entries.filter((e) => daysSince(e.date) <= 60).slice(-30);
	} catch {
		return [];
	}
}

async function loadStaleFragments(): Promise<Fragment[]> {
	const keys = await kvList('frag:');
	const out: Fragment[] = [];
	for (const key of keys.slice(-20)) {
		const frag = await kvGet<Fragment>(key);
		if (frag && daysSince(frag.createdAt) * 24 >= FRAGMENT_MIN_AGE_HOURS) out.push(frag);
	}
	return out.slice(0, 10);
}

function parseDecision(text: string): Decision {
	const match = text.match(/\{[\s\S]*\}/);
	if (!match) return { action: 'skip', reason: 'No JSON in decision output.' };
	try {
		const obj = JSON.parse(match[0]) as Decision;
		if (!['new_post', 'improve_post', 'archive_post', 'skip'].includes(obj.action)) {
			return { action: 'skip', reason: `Unknown action "${obj.action}".` };
		}
		return obj;
	} catch {
		return { action: 'skip', reason: 'Malformed decision JSON.' };
	}
}

async function decide(posts: Post[], log: LogEntry[], fragments: Fragment[]): Promise<Decision> {
	const active = posts.filter((p) => !p.archived);
	const catalog = posts
		.map(
			(p) =>
				`### ${p.slug}${p.archived ? ' [ARCHIVED]' : ''}\n` +
				`Title: ${p.title}\nDescription: ${p.description}\n` +
				`Published: ${p.pubDate}${p.updatedDate ? ` (updated ${p.updatedDate})` : ''} · ${p.wordCount} words\n` +
				`Excerpt: ${p.excerpt}`,
		)
		.join('\n\n');

	const cooling = log
		.filter((e) => e.slug && daysSince(e.date) <= COOLDOWN_DAYS)
		.map((e) => `- ${e.slug} (${e.action}, ${e.date.slice(0, 10)})`);
	const recent = log.slice(-10).map((e) => `- ${e.date.slice(0, 10)}: ${e.action} ${e.slug} — ${e.reason}`);
	const ideas = fragments.map((f) => `- [${f.id}] ${f.text.replace(/\s+/g, ' ').slice(0, 200)}`);

	// Computed in code so redundancy is a fact in front of the decider, not an inference.
	const health = catalogHealth(active);
	console.log(`Catalog health:\n${health}`);

	const user =
		`Today is ${pubDateString()}. The catalog has ${active.length} active post(s):\n\n${catalog}\n\n` +
		`Catalog health (computed template-collision check):\n${health}\n\n` +
		`Recently touched (cooldown — do not pick these):\n${cooling.join('\n') || '- none'}\n\n` +
		`Recent editor actions:\n${recent.join('\n') || '- none'}\n\n` +
		`Pending idea fragments from the owner:\n${ideas.join('\n') || '- none'}\n\n` +
		`Pick today's single action.`;

	// No tools: the decider must answer from the catalog alone, in one shot.
	return parseDecision(await runClaude({ system: DECIDER_SYSTEM, prompt: user, timeoutMs: 5 * 60_000 }));
}

/** Apply the hard guards; returns the (possibly downgraded) decision. */
function applyGuards(decision: Decision, posts: Post[], log: LogEntry[]): Decision {
	const skip = (reason: string): Decision => ({ action: 'skip', reason });
	const active = posts.filter((p) => !p.archived);

	if (decision.action === 'skip') return decision;

	if (decision.slug) {
		const touched = log.find((e) => e.slug === decision.slug && daysSince(e.date) <= COOLDOWN_DAYS);
		if (touched) return skip(`Guard: ${decision.slug} was touched ${touched.date.slice(0, 10)} (cooldown).`);
	}

	if (decision.action === 'improve_post' || decision.action === 'archive_post') {
		const target = posts.find((p) => p.slug === decision.slug);
		if (!target) return skip(`Guard: unknown slug "${decision.slug}".`);
		if (target.archived) return skip(`Guard: ${decision.slug} is already archived.`);
		if (decision.action === 'archive_post') {
			if (active.length < ARCHIVE_MIN_ACTIVE) {
				return skip(`Guard: only ${active.length} active posts — not archiving below ${ARCHIVE_MIN_ACTIVE}.`);
			}
			const touched = target.updatedDate || target.pubDate;
			if (daysSince(touched) < ARCHIVE_MIN_AGE_DAYS) {
				return skip(`Guard: ${decision.slug} was published/updated < ${ARCHIVE_MIN_AGE_DAYS} days ago.`);
			}
		}
	}

	if (decision.action === 'new_post' && !decision.topic) return skip('Guard: new_post without a topic.');
	if (decision.action === 'improve_post' && !decision.brief) return skip('Guard: improve_post without a brief.');

	return decision;
}

interface Outcome {
	summary: string; // Telegram message
	commitMessage: string;
	changedFiles: string[]; // repo-relative
	logEntry: LogEntry;
	undo: { type: Decision['action']; slug: string; path: string; prevContent?: string };
	consumedFragmentId?: string;
}

async function uniqueSlug(title: string): Promise<string> {
	let slug = slugify(title);
	for (let n = 2; ; n++) {
		try {
			await fs.access(path.join(repoRoot, 'src', 'content', 'blog', `${slug}.md`));
			slug = `${slugify(title)}-${n}`;
		} catch {
			return slug;
		}
	}
}

async function execute(decision: Decision, posts: Post[], fragments: Fragment[]): Promise<Outcome> {
	const activeCatalog: CatalogEntry[] = posts
		.filter((p) => !p.archived)
		.map((p) => ({ slug: p.slug, title: p.title, description: p.description }));
	const logEntry = (action: string, slug: string): LogEntry => ({
		date: new Date().toISOString(),
		action,
		slug,
		reason: decision.reason ?? '',
	});

	if (decision.action === 'new_post') {
		const fragment = fragments.find((f) => f.id === decision.fragmentId);
		const idea =
			`${decision.topic}\n\nEditorial brief: ${decision.brief ?? 'none'}` +
			(decision.format ? `\n\nArticle format: ${decision.format}` : '') +
			(fragment ? `\n\nOwner's raw idea note:\n${fragment.text}` : '');
		const parsed = await draftFromText(idea, { catalog: activeCatalog });
		const slug = await uniqueSlug(parsed.title);
		const filePath = `src/content/blog/${slug}.md`;
		await fs.writeFile(path.join(repoRoot, filePath), buildFrontmatter(parsed));
		return {
			summary:
				`🤖 Daily editor: published a new post\n\n*${parsed.title}*\n${parsed.description}\n\n` +
				`_Why: ${decision.reason}_\n${SITE_URL}/blog/${slug}/\n(Live in ~30–60s after the build.)`,
			commitMessage: `Editor: publish "${parsed.title}"`,
			changedFiles: [filePath],
			logEntry: logEntry('new_post', slug),
			undo: { type: 'new_post', slug, path: filePath },
			consumedFragmentId: fragment?.id,
		};
	}

	if (decision.action === 'improve_post') {
		const target = posts.find((p) => p.slug === decision.slug)!;
		const absPath = path.join(repoRoot, target.filePath);
		const prevContent = await fs.readFile(absPath, 'utf8');
		const { fm, body } = splitPost(prevContent);
		const sources = [...fm.matchAll(/^\s*-\s*"(.+)"\s*$/gm)].map((m) => m[1]);
		const parsed = await improvePost(
			{ title: target.title, description: target.description, body: body.trim(), sources },
			decision.brief!,
			activeCatalog.filter((c) => c.slug !== target.slug),
		);
		// The URL/slug never changes, but the writer may retitle when the brief
		// asks for it. Only accept a title that came from a real TITLE: line —
		// a degenerate parse must not destroy a good title.
		const newTitle = parsed.titleExplicit && parsed.title.trim() ? parsed.title : target.title;
		const updated: Parsed = { ...parsed, title: newTitle };
		const retitled = newTitle !== target.title;
		await fs.writeFile(
			absPath,
			buildFrontmatter(updated, {
				pubDate: frontmatterValue(fm, 'pubDate') || undefined,
				updatedDate: pubDateString(),
				industry: frontmatterValue(fm, 'industry') || undefined,
			}),
		);
		return {
			summary:
				`🤖 Daily editor: improved *${target.slug}*\n\n` +
				(retitled ? `Retitled: "${target.title}" → "${newTitle}"\n\n` : '') +
				`_Why: ${decision.reason}_\n` +
				`${SITE_URL}/blog/${target.slug}/\n(Live in ~30–60s after the build.)`,
			commitMessage: `Editor: improve "${newTitle}"`,
			changedFiles: [target.filePath],
			logEntry: logEntry('improve_post', target.slug),
			undo: { type: 'improve_post', slug: target.slug, path: target.filePath, prevContent },
		};
	}

	// archive_post
	const target = posts.find((p) => p.slug === decision.slug)!;
	const absPath = path.join(repoRoot, target.filePath);
	const prevContent = await fs.readFile(absPath, 'utf8');
	await fs.writeFile(absPath, prevContent.replace(/^---\n/, '---\narchived: true\n'));
	return {
		summary: `🤖 Daily editor: archived *${target.slug}*\n\n_Why: ${decision.reason}_\n(Hidden after the next build; the file is kept.)`,
		commitMessage: `Editor: archive ${target.slug}`,
		changedFiles: [target.filePath],
		logEntry: logEntry('archive_post', target.slug),
		undo: { type: 'archive_post', slug: target.slug, path: target.filePath, prevContent },
	};
}

async function appendLog(log: LogEntry[], entry: LogEntry): Promise<void> {
	const updated = [...log, entry].slice(-30);
	await fs.writeFile(LOG_PATH, JSON.stringify(updated, null, '\t') + '\n');
}

function commitAndPush(files: string[], message: string): void {
	git('config', 'user.name', 'github-actions[bot]');
	git('config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com');
	git('add', ...files);
	git('commit', '-m', message);
	try {
		git('push');
	} catch {
		// Race with a concurrent commit (e.g. a manual Approve) — rebase once and retry.
		git('pull', '--rebase', 'origin', 'main');
		git('push');
	}
}

async function main(): Promise<void> {
	const posts = await loadPosts();
	const log = await readLog();
	const fragments = DRY_RUN ? [] : await loadStaleFragments();

	console.log(`Catalog: ${posts.length} post(s). Deciding today's action…`);
	const decision = applyGuards(await decide(posts, log, fragments), posts, log);
	console.log('Decision:', JSON.stringify(decision, null, 2));

	if (decision.action === 'skip') {
		console.log(`Skipping today. ${decision.reason ?? ''}`);
		return;
	}

	const outcome = await execute(decision, posts, fragments);
	await appendLog(log, outcome.logEntry);

	if (DRY_RUN) {
		console.log(`[dry run] Files changed in working tree: ${outcome.changedFiles.join(', ')}`);
		console.log(`[dry run] Would commit: "${outcome.commitMessage}", store undo token, and send Telegram:`);
		console.log(outcome.summary);
		return;
	}

	const token = Math.random().toString(36).slice(2, 10);
	await kvPut(`undo:${token}`, outcome.undo, UNDO_TTL_SECONDS);

	commitAndPush([...outcome.changedFiles, 'pipeline/editor-log.json'], outcome.commitMessage);
	if (outcome.consumedFragmentId) await kvDelete(`frag:${outcome.consumedFragmentId}`);

	await sendMessage(outcome.summary, [{ text: '↩️ Undo', callback_data: `undo:${token}` }]);
	console.log(`✓ ${outcome.commitMessage} — pushed, undo token ${token}, Telegram sent.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
