import { kvPut } from './kv';
import { sendMessage } from './telegram';
import { buildFrontmatter, draftFromText } from './writer';

/**
 * GitHub Actions entry point for drafting. Triggered by a `repository_dispatch`
 * of type `draft` whose client_payload carries the fragment id + text.
 *
 * It drafts (with web-search verification), stores the candidate in Cloudflare
 * KV under `cand:<id>`, and sends the owner a Telegram preview with
 * Approve / Reject buttons. Approving (handled by the Pages Function) promotes
 * the candidate into `src/content/blog/`.
 *
 * Env: FRAGMENT_ID, FRAGMENT_TEXT, ANTHROPIC_API_KEY,
 *      TELEGRAM_BOT_TOKEN, TELEGRAM_OWNER_ID,
 *      CF_ACCOUNT_ID, CF_KV_NAMESPACE_ID, CF_API_TOKEN.
 */

const CANDIDATE_TTL_SECONDS = 7 * 24 * 60 * 60; // candidates expire after a week

async function main(): Promise<void> {
	const id = process.env.FRAGMENT_ID?.trim();
	const text = process.env.FRAGMENT_TEXT;
	if (!id || !text) {
		console.error('Missing FRAGMENT_ID or FRAGMENT_TEXT.');
		process.exit(1);
	}

	console.log(`Drafting fragment ${id} (researching + fact-checking via web search)…`);

	let parsed;
	try {
		parsed = await draftFromText(text);
	} catch (err) {
		await sendMessage(`⚠️ Draft failed for \`${id}\`: ${(err as Error).message}`);
		throw err;
	}

	const frontmatter = buildFrontmatter(parsed);
	await kvPut(
		`cand:${id}`,
		{ id, title: parsed.title, description: parsed.description, sources: parsed.sources, frontmatter, createdAt: new Date().toISOString() },
		CANDIDATE_TTL_SECONDS,
	);

	const snippet = parsed.body.replace(/\s+/g, ' ').slice(0, 400);
	const preview =
		`📝 *Draft ready*\n\n*${parsed.title}*\n${parsed.description}\n\n` +
		`${snippet}…\n\n` +
		`_${parsed.sources.length} source(s) verified._\n\nPublish this?`;

	await sendMessage(preview, [
		{ text: '✅ Approve', callback_data: `approve:${id}` },
		{ text: '🗑 Reject', callback_data: `reject:${id}` },
	]);

	console.log(`✓ Candidate stored (cand:${id}) and preview sent. Title: ${parsed.title}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
