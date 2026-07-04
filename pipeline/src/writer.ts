import { runClaude } from './claude';
import { varietyFeedback } from './variety';
import { slugify, truncateDescription } from '../../lib/slug';

/**
 * The shared "staff writer" core: turns a raw idea into a finished, fact-checked
 * Vertical Agent Solutions post. Used by the GitHub Action runners
 * (`runDraft.ts`, `editor.ts`).
 */

export { slugify };

export const SYSTEM = `You are the staff writer for "Vertical Agent Solutions", a blog that teaches people across every industry how to adopt AI agents.

Voice and rules:
- Write in plain English for a smart but non-technical reader — a business owner, not an engineer. Assume no coding background.
- No hype, no buzzword salad, no "in today's fast-paced world" filler. Be concrete and specific.
- Simplify hard ideas with everyday analogies and real, named use cases across different industries.
- Deeply verify every factual claim. Use the WebSearch tool to check anything that is a stat, a date, a capability claim, or a reference to a real product/company/study. If you cannot find support for a claim, soften it to opinion or cut it. Never invent sources.
- Aim for roughly 600–900 words. Tight is better than padded.
- End with a short, non-salesy close that points the reader toward a concrete next step they could take.
- SEO: the TITLE should read like something the target reader would actually type into Google — a specific industry plus a specific problem. No clickbait.
- SEO: the DESCRIPTION must work as a Google search snippet — one concrete sentence, under 160 characters, that makes the right reader click.

Variety — the catalog must never read as if one template wrote it:
- Never reuse the headline structure of any already-published post shown to you. A new title needs a different grammatical shape, not a reworded copy of an existing one.
- Never open the DESCRIPTION the way an existing post's description opens (if "A plain-English guide…" already exists, no post may open that way again). Each description must read like a distinct search snippet.
- Vary section headers across posts. In particular, do not default the closing section to a "first step" style header — the close should still point to a concrete next step, but name the section differently than other posts do.
- If the editorial brief names an article format (FAQ, cost breakdown, case walkthrough, checklist, myth-busting, comparison, …), commit to that structure for the whole post instead of the default guide shape.

Output format — follow it exactly:
TITLE: <a clear, specific headline>
DESCRIPTION: <one sentence, max ~160 chars, summarizing the post>

<the full article body in Markdown — use ## subheadings, short paragraphs, and lists. Do NOT repeat the title as an H1.>

SOURCES:
- <source label> — <url>
(List only sources you actually used via WebSearch. If you used none, write "SOURCES:" followed by "- none".)`;

export interface Parsed {
	title: string;
	/** True when the title came from a real `TITLE:` line, not fallback extraction. */
	titleExplicit: boolean;
	description: string;
	sources: string[];
	body: string;
}

export function parseOutput(text: string): Parsed {
	// Tolerant of bold markers (**TITLE:**), `:` or `-` separators, and case.
	const titleMatch = text.match(/^\s*\**\s*TITLE\s*[:\-]\s*(.+?)\s*$/im);
	let title = titleMatch?.[1]?.replace(/\*+/g, '').trim();
	const titleExplicit = !!title;
	const descMatch = text.match(/^\s*\**\s*DESCRIPTION\s*[:\-]\s*(.+?)\s*$/im);
	const description = (descMatch?.[1] ?? '').replace(/\*+/g, '').trim();

	let body = text;
	let sources: string[] = [];
	const sourcesIdx = text.search(/^\s*\**\s*SOURCES\s*[:\-]?\s*\**\s*$/im);
	if (sourcesIdx !== -1) {
		sources = text
			.slice(sourcesIdx)
			.split('\n')
			.slice(1)
			.filter((l) => l.trim().startsWith('-'))
			.map((l) => l.replace(/^\s*-\s*/, '').trim())
			.filter((l) => l && l.toLowerCase() !== 'none');
		body = text.slice(0, sourcesIdx);
	}
	if (descMatch) {
		const at = body.indexOf(descMatch[0]);
		if (at !== -1) body = body.slice(at + descMatch[0].length);
	} else if (titleMatch) {
		const at = body.indexOf(titleMatch[0]);
		if (at !== -1) body = body.slice(at + titleMatch[0].length);
	}
	body = body.trim();

	// Fallback: if the model didn't emit a TITLE line, use the first heading or line.
	if (!title) {
		const heading = body.match(/^#{1,3}\s+(.+)$/m);
		title =
			heading?.[1]?.replace(/\*+/g, '').trim() ??
			body
				.split('\n')
				.map((l) => l.replace(/^#+\s*/, '').replace(/\*+/g, '').trim())
				.find((l) => l.length > 0)
				?.slice(0, 120) ??
			'Untitled draft';
	}
	return { title, titleExplicit, description, sources, body };
}

/** A pubDate string Astro's `z.coerce.date()` accepts, e.g. "Jun 20 2026". */
export function pubDateString(d = new Date()): string {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
}

export function buildFrontmatter(p: Parsed, opts: { pubDate?: string; updatedDate?: string } = {}): string {
	const sourcesBlock = p.sources.length
		? '\n' + p.sources.map((s) => `  - ${JSON.stringify(s)}`).join('\n')
		: ' []';
	const lines = [
		'---',
		`title: ${JSON.stringify(p.title)}`,
		`description: ${JSON.stringify(truncateDescription(p.description))}`,
		`pubDate: '${opts.pubDate ?? pubDateString()}'`,
	];
	if (opts.updatedDate) lines.push(`updatedDate: '${opts.updatedDate}'`);
	lines.push(`sources:${sourcesBlock}`, '---', '', p.body, '');
	return lines.join('\n');
}

/** An existing post the writer may internally link to (and must not imitate). */
export interface CatalogEntry {
	slug: string;
	title: string;
	/** Used by the variety gate to catch repeated description openers. */
	description?: string;
}

const AGENT_EXPLAINER_SLUG = 'the-agentic-wave-is-not-just-for-tech';

function catalogNote(catalog?: CatalogEntry[]): string {
	if (!catalog?.length) return '';
	const list = catalog.map((c) => `- /blog/${c.slug}/ — ${c.title}`).join('\n');
	const explainerRule = catalog.some((c) => c.slug === AGENT_EXPLAINER_SLUG)
		? `Never re-explain what an AI agent is: when the reader needs that grounding, link to ` +
			`/blog/${AGENT_EXPLAINER_SLUG}/ in a single sentence instead of writing your own explainer section. `
		: '';
	return (
		`\n\nAlready published on this blog:\n${list}\n\n` +
		`These are listed so you can link to them — NOT as models to imitate. Do not copy their ` +
		`title structures, description openers, or section skeletons. ${explainerRule}` +
		`Where genuinely relevant, link to 1–3 of these existing posts in the body, using their ` +
		`relative URLs exactly as listed. Never link to a post that is not in this list, and never ` +
		`force a link where it doesn't help the reader.`
	);
}

/**
 * Run the writer (headless Claude Code with WebSearch) against a user message
 * and return the parsed draft. Retries once if the output format is ignored,
 * and once more if the draft's title/description collide with the catalog
 * (the variety gate) — the prompt rules request variety, this enforces it.
 * A draft that still collides after the retry is accepted with a warning:
 * publishing a templated post beats a failed run, and the improve loop can
 * fix it later.
 */
async function runWriter(userContent: string, catalog?: CatalogEntry[]): Promise<Parsed> {
	let text = '';
	for (let attempt = 1; attempt <= 2; attempt++) {
		text = await runClaude({ system: SYSTEM, prompt: userContent, tools: ['WebSearch'] });
		if (/^\s*\**\s*TITLE\s*[:\-]/im.test(text)) break;
		console.warn(`⚠️ Attempt ${attempt}: no TITLE: line in output. First 300 chars:\n` + text.slice(0, 300));
	}
	let parsed = parseOutput(text);

	const feedback = catalog?.length ? varietyFeedback(parsed, catalog) : null;
	if (feedback) {
		console.warn(`⚠️ Variety gate: draft collides with the catalog — retrying once.\n${feedback}`);
		const retryText = await runClaude({
			system: SYSTEM,
			prompt:
				userContent +
				`\n\nYour previous draft failed a variety check against the published catalog:\n${feedback}\n\n` +
				`Previous draft:\n"""\n${text}\n"""\n\n` +
				`Produce the corrected post in the exact same output format. Keep the substance, sources, and ` +
				`verified facts; restructure what the check flagged (and anything else that echoes an existing post).`,
			tools: ['WebSearch'],
		});
		const retry = parseOutput(retryText);
		if (retry.titleExplicit) {
			parsed = retry;
			const still = varietyFeedback(parsed, catalog!);
			if (still) console.warn(`⚠️ Variety gate: still colliding after retry — accepting anyway.\n${still}`);
		} else {
			console.warn('⚠️ Variety gate: retry output lost the TITLE format — keeping the first draft.');
		}
	}
	return parsed;
}

/** Draft a brand-new post from a raw idea / editorial brief. */
export async function draftFromText(idea: string, opts: { catalog?: CatalogEntry[] } = {}): Promise<Parsed> {
	return runWriter(
		`Here is the idea for the next post:\n\n"""\n${idea}\n"""\n\n` +
			`Develop it into a finished Vertical Agent Solutions post, following every rule in your instructions.` +
			catalogNote(opts.catalog),
		opts.catalog,
	);
}

/** The parts of an already-published post that `improvePost` revises. */
export interface CurrentPost {
	title: string;
	description: string;
	body: string;
	sources: string[];
}

/** Revise an existing post per an editorial brief (same voice, same topic, same URL). */
export async function improvePost(
	current: CurrentPost,
	brief: string,
	catalog?: CatalogEntry[],
): Promise<Parsed> {
	const sourcesList = current.sources.map((s) => `- ${s}`).join('\n') || '- none';
	return runWriter(
		`Below is a post already published on the blog. Revise and improve it per this editorial brief:\n\n` +
			`"""\n${brief}\n"""\n\n` +
			`Rules for the revision:\n` +
			`- Keep the same core topic and angle — this is an upgrade, not a new post.\n` +
			`- Re-verify key stats and claims with WebSearch; update or cut anything stale.\n` +
			`- Target 700–1000 words.\n` +
			`- Keep the TITLE close to the original unless the brief says otherwise.\n` +
			`- Follow every rule in your instructions, including the exact output format.` +
			catalogNote(catalog) +
			`\n\nCurrent title: ${current.title}\n` +
			`Current description: ${current.description}\n\n` +
			`Current body:\n"""\n${current.body}\n"""\n\n` +
			`Sources previously cited:\n${sourcesList}`,
		catalog,
	);
}
