/**
 * Telegram webhook — Cloudflare Pages Function (Workers runtime).
 *
 * The always-on "front door" for the publishing loop. It is intentionally thin:
 *   • captures ideas into Cloudflare KV (no git noise, no rebuild on capture)
 *   • /list recent ideas
 *   • /draft → kicks a GitHub Action (repository_dispatch) which does the heavy
 *     AI drafting and sends a preview with Approve / Reject buttons
 *   • Approve  → promotes the KV candidate into src/content/blog/ via the GitHub
 *     contents API (one commit → Cloudflare Pages rebuilds → live)
 *   • Reject   → discards the candidate
 *   • Archive  → sets `archived: true` on a published post (from maintenance)
 *
 * Bindings / vars (set in the Pages project):
 *   INBOX_KV (KV namespace), TELEGRAM_BOT_TOKEN, TELEGRAM_OWNER_ID,
 *   TELEGRAM_SECRET_TOKEN, GITHUB_REPO ("owner/name"), GITHUB_DISPATCH_TOKEN,
 *   GITHUB_BRANCH (optional, default "main"), SITE_URL (optional).
 */

import { slugify } from '../../lib/slug';

interface Env {
	INBOX_KV: KVNamespace;
	TELEGRAM_BOT_TOKEN: string;
	TELEGRAM_OWNER_ID?: string;
	TELEGRAM_SECRET_TOKEN: string;
	GITHUB_REPO: string;
	GITHUB_DISPATCH_TOKEN: string;
	GITHUB_BRANCH?: string;
	SITE_URL?: string;
}

// Minimal KV shape (avoids a dependency on @cloudflare/workers-types).
interface KVNamespace {
	get(key: string): Promise<string | null>;
	put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
	delete(key: string): Promise<void>;
	list(opts?: { prefix?: string }): Promise<{ keys: { name: string }[] }>;
}

// TODO: flip back to https://verticalagentsolutions.com once the custom domain is connected.
const DEFAULT_SITE = 'https://vertical-agent-solutions.pages.dev';

// ---------- helpers ----------

function makeId(now: Date): string {
	const stamp = now.toISOString().slice(0, 16).replace(/[-:T]/g, ''); // 202606201655
	const rand = Math.random().toString(36).slice(2, 7);
	return `${stamp}-${rand}`;
}

function toBase64(str: string): string {
	const bytes = new TextEncoder().encode(str);
	let bin = '';
	for (const b of bytes) bin += String.fromCharCode(b);
	return btoa(bin);
}

function fromBase64(b64: string): string {
	const bin = atob(b64.replace(/\s/g, ''));
	const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
	return new TextDecoder().decode(bytes);
}

async function tg(env: Env, method: string, body: Record<string, unknown>): Promise<void> {
	await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
}

function reply(env: Env, chatId: number | string, text: string): Promise<void> {
	return tg(env, 'sendMessage', { chat_id: chatId, text, disable_web_page_preview: true });
}

function ghHeaders(env: Env): Record<string, string> {
	return {
		Authorization: `Bearer ${env.GITHUB_DISPATCH_TOKEN}`,
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		'User-Agent': 'vas-bot',
	};
}

function ghBranch(env: Env): string {
	return env.GITHUB_BRANCH || 'main';
}

async function repositoryDispatch(env: Env, eventType: string, payload: Record<string, unknown>): Promise<boolean> {
	const res = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/dispatches`, {
		method: 'POST',
		headers: { ...ghHeaders(env), 'Content-Type': 'application/json' },
		body: JSON.stringify({ event_type: eventType, client_payload: payload }),
	});
	return res.ok; // 204 on success
}

async function ghGetFile(env: Env, path: string): Promise<{ content: string; sha: string } | null> {
	const res = await fetch(
		`https://api.github.com/repos/${env.GITHUB_REPO}/contents/${path}?ref=${ghBranch(env)}`,
		{ headers: ghHeaders(env) },
	);
	if (res.status === 404) return null;
	if (!res.ok) throw new Error(`GitHub getFile ${path} failed: ${res.status}`);
	const json = (await res.json()) as { content: string; sha: string };
	return { content: fromBase64(json.content), sha: json.sha };
}

async function ghPutFile(env: Env, path: string, content: string, message: string, sha?: string): Promise<void> {
	const res = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/${path}`, {
		method: 'PUT',
		headers: { ...ghHeaders(env), 'Content-Type': 'application/json' },
		body: JSON.stringify({ message, content: toBase64(content), branch: ghBranch(env), sha }),
	});
	if (!res.ok) throw new Error(`GitHub putFile ${path} failed: ${res.status} ${await res.text()}`);
}

async function ghDeleteFile(env: Env, path: string, message: string, sha: string): Promise<void> {
	const res = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/${path}`, {
		method: 'DELETE',
		headers: { ...ghHeaders(env), 'Content-Type': 'application/json' },
		body: JSON.stringify({ message, branch: ghBranch(env), sha }),
	});
	if (!res.ok) throw new Error(`GitHub deleteFile ${path} failed: ${res.status} ${await res.text()}`);
}

// ---------- fragment storage (KV) ----------

interface Fragment {
	id: string;
	text: string;
	createdAt: string;
	from?: string;
}

async function saveFragment(env: Env, text: string, from?: string): Promise<string> {
	const id = makeId(new Date());
	const frag: Fragment = { id, text: text.trim(), createdAt: new Date().toISOString(), from };
	await env.INBOX_KV.put(`frag:${id}`, JSON.stringify(frag));
	return id;
}

async function recentFragments(env: Env, n: number): Promise<Fragment[]> {
	const { keys } = await env.INBOX_KV.list({ prefix: 'frag:' });
	// ids are timestamp-prefixed, so lexicographic desc == newest first.
	const top = keys.map((k) => k.name).sort((a, b) => (a < b ? 1 : -1)).slice(0, n);
	const out: Fragment[] = [];
	for (const key of top) {
		const raw = await env.INBOX_KV.get(key);
		if (raw) out.push(JSON.parse(raw) as Fragment);
	}
	return out;
}

async function latestFragment(env: Env): Promise<Fragment | null> {
	const [f] = await recentFragments(env, 1);
	return f ?? null;
}

// ---------- handlers ----------

async function handleMessage(env: Env, message: any): Promise<void> {
	const chatId = message.chat?.id;
	const text: string = (message.text ?? '').trim();
	if (!text) {
		await reply(env, chatId, 'Text only for now — voice notes and images are coming next.');
		return;
	}

	if (text.startsWith('/start')) {
		await reply(
			env,
			chatId,
			'Vertical Agent Solutions — idea inbox.\n\n' +
				'Send me a thought and I save it. Then:\n' +
				'/draft — turn your latest idea into a fact-checked post (I’ll send a preview to approve)\n' +
				'/list — your 5 most recent ideas',
		);
		return;
	}

	if (text.startsWith('/list')) {
		const recent = await recentFragments(env, 5);
		if (recent.length === 0) {
			await reply(env, chatId, 'Inbox is empty. Send me an idea.');
			return;
		}
		const lines = recent.map((r, i) => `${i + 1}. ${(r.text.split('\n')[0] || '(no text)').slice(0, 60)}`);
		await reply(env, chatId, 'Recent ideas:\n' + lines.join('\n'));
		return;
	}

	if (text.startsWith('/draft')) {
		const arg = text.slice('/draft'.length).trim();
		const frag = arg ? await getFragmentById(env, arg) : await latestFragment(env);
		if (!frag) {
			await reply(env, chatId, 'No idea found to draft. Send me a thought first.');
			return;
		}
		const ok = await repositoryDispatch(env, 'draft', { id: frag.id, text: frag.text });
		await reply(
			env,
			chatId,
			ok
				? `Drafting “${frag.text.slice(0, 40)}…” 📝\nResearching + fact-checking now — I’ll send a preview to approve in a couple minutes.`
				: 'Could not start the draft job (GitHub dispatch failed). Check the bot config.',
		);
		return;
	}

	// Anything else = a new idea.
	const id = await saveFragment(env, text, message.from?.username ?? message.from?.first_name);
	await reply(env, chatId, `Saved ✓  ${id}\nSend /draft to turn it into a post.`);
}

async function getFragmentById(env: Env, idOrPrefix: string): Promise<Fragment | null> {
	const exact = await env.INBOX_KV.get(`frag:${idOrPrefix}`);
	if (exact) return JSON.parse(exact) as Fragment;
	const { keys } = await env.INBOX_KV.list({ prefix: `frag:${idOrPrefix}` });
	if (keys[0]) {
		const raw = await env.INBOX_KV.get(keys[0].name);
		if (raw) return JSON.parse(raw) as Fragment;
	}
	return null;
}

interface Candidate {
	id: string;
	title: string;
	description: string;
	sources: string[];
	frontmatter: string; // the full post file contents
	createdAt: string;
}

async function publishCandidate(env: Env, id: string): Promise<string> {
	const raw = await env.INBOX_KV.get(`cand:${id}`);
	if (!raw) throw new Error('expired');
	const cand = JSON.parse(raw) as Candidate;

	let slug = slugify(cand.title);
	let filePath = `src/content/blog/${slug}.md`;
	if (await ghGetFile(env, filePath)) {
		slug = `${slug}-${id.slice(-5)}`;
		filePath = `src/content/blog/${slug}.md`;
	}

	await ghPutFile(env, filePath, cand.frontmatter, `Publish: ${cand.title}`);
	await env.INBOX_KV.delete(`cand:${id}`);
	const site = env.SITE_URL || DEFAULT_SITE;
	return `${site}/blog/${slug}/`;
}

/** Written by the daily editor (pipeline/src/editor.ts) under `undo:<token>`. */
interface UndoRecord {
	type: 'new_post' | 'improve_post' | 'archive_post';
	slug: string;
	path: string;
	prevContent?: string;
}

async function undoEditorAction(env: Env, token: string): Promise<string> {
	const raw = await env.INBOX_KV.get(`undo:${token}`);
	if (!raw) throw new Error('expired');
	const undo = JSON.parse(raw) as UndoRecord;

	const file = await ghGetFile(env, undo.path);
	if (undo.type === 'new_post') {
		if (file) await ghDeleteFile(env, undo.path, `Undo publish: ${undo.slug}`, file.sha);
	} else {
		if (!undo.prevContent) throw new Error('undo record missing previous content');
		await ghPutFile(env, undo.path, undo.prevContent, `Undo ${undo.type}: ${undo.slug}`, file?.sha);
	}
	await env.INBOX_KV.delete(`undo:${token}`);
	return undo.slug;
}

async function archivePost(env: Env, slug: string): Promise<void> {
	const path = `src/content/blog/${slug}.md`;
	const file = await ghGetFile(env, path);
	if (!file) throw new Error('not found');
	if (/^archived:\s*true\s*$/m.test(file.content)) return; // already archived
	// Insert `archived: true` as the first line inside the frontmatter block.
	const updated = file.content.replace(/^---\n/, '---\narchived: true\n');
	await ghPutFile(env, path, updated, `Archive: ${slug}`, file.sha);
}

async function handleCallback(env: Env, cb: any): Promise<void> {
	const data: string = cb.data ?? '';
	const chatId = cb.message?.chat?.id;
	const [action, ...rest] = data.split(':');
	const arg = rest.join(':');

	const ack = (text: string) => tg(env, 'answerCallbackQuery', { callback_query_id: cb.id, text });

	try {
		if (action === 'approve') {
			const url = await publishCandidate(env, arg);
			await ack('Publishing…');
			await reply(env, chatId, `Published ✓\n${url}\n(Live in ~30–60s after the build.)`);
		} else if (action === 'reject') {
			await env.INBOX_KV.delete(`cand:${arg}`);
			await ack('Discarded');
			await reply(env, chatId, 'Discarded. Nothing was published.');
		} else if (action === 'archive') {
			await archivePost(env, arg);
			await ack('Archived');
			await reply(env, chatId, `Archived ✓  ${arg} (hidden after the next build).`);
		} else if (action === 'undo') {
			const slug = await undoEditorAction(env, arg);
			await ack('Reverting…');
			await reply(env, chatId, `Reverted ✓  ${slug} (live after the next build).`);
		} else {
			await ack('Unknown action');
		}
	} catch (err) {
		const msg = (err as Error).message;
		await ack(msg === 'expired' ? 'That action expired' : 'Failed');
		await reply(env, chatId, `Action failed: ${msg}`);
	}
}

// ---------- entry point ----------

export const onRequestPost = async (context: { request: Request; env: Env }): Promise<Response> => {
	const { request, env } = context;

	// Telegram includes the secret token on every webhook call.
	if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.TELEGRAM_SECRET_TOKEN) {
		return new Response('unauthorized', { status: 401 });
	}

	const update = (await request.json().catch(() => null)) as any;
	if (!update) return new Response('ok');

	const fromId = update.message?.from?.id ?? update.callback_query?.from?.id;
	if (env.TELEGRAM_OWNER_ID && String(fromId) !== String(env.TELEGRAM_OWNER_ID)) {
		const chatId = update.message?.chat?.id ?? update.callback_query?.message?.chat?.id;
		if (chatId) await reply(env, chatId, 'This inbox is private.');
		return new Response('ok');
	}

	try {
		if (update.message) await handleMessage(env, update.message);
		else if (update.callback_query) await handleCallback(env, update.callback_query);
	} catch (err) {
		console.error('handler error', err);
	}

	return new Response('ok');
};
