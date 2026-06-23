import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sendMessage } from './telegram';

/**
 * Weekly maintenance (GitHub Actions, scheduled). Reads every published post and
 * asks the model to (a) flag near-duplicate / overlapping posts and (b) suggest
 * low-value posts to archive — then reports to Telegram. Archiving itself is
 * human-confirmed: each suggestion comes with an Archive button handled by the
 * Pages Function (it sets `archived: true` via the GitHub API). Nothing is
 * deleted automatically.
 *
 * Env: ANTHROPIC_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_OWNER_ID.
 */

const here = path.dirname(fileURLToPath(import.meta.url)); // pipeline/src
const blogDir = path.resolve(here, '..', '..', 'src', 'content', 'blog');

interface Post {
	slug: string;
	title: string;
	description: string;
	excerpt: string;
	archived: boolean;
}

function frontmatterValue(fm: string, key: string): string {
	const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
	return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
}

async function loadPosts(): Promise<Post[]> {
	const files = (await fs.readdir(blogDir)).filter((f) => /\.(md|mdx)$/.test(f));
	return Promise.all(
		files.map(async (f) => {
			const content = await fs.readFile(path.join(blogDir, f), 'utf8');
			const end = content.indexOf('\n---', 3);
			const fm = content.startsWith('---') && end !== -1 ? content.slice(3, end) : '';
			const body = end !== -1 ? content.slice(end + 4) : content;
			return {
				slug: f.replace(/\.(md|mdx)$/, ''),
				title: frontmatterValue(fm, 'title'),
				description: frontmatterValue(fm, 'description'),
				excerpt: body.replace(/\s+/g, ' ').trim().slice(0, 600),
				archived: /^archived:\s*true\s*$/m.test(fm),
			};
		}),
	);
}

interface Report {
	overlaps: { slugs: string[]; reason: string }[];
	archive: { slug: string; reason: string }[];
}

const SYSTEM = `You are the managing editor for "Vertical Agent Solutions", a blog teaching non-technical business owners how to adopt AI agents. Your job is to keep the catalog tight and non-redundant.

Given the list of published posts, identify:
1. "overlaps": groups of posts that cover substantially the same ground and could be merged or differentiated.
2. "archive": individual low-value posts worth retiring (thin, outdated, off-topic, or fully superseded by another post).

Be conservative — only flag clear cases. It is fine to return empty lists.

Respond with ONLY a JSON object, no prose, in exactly this shape:
{"overlaps":[{"slugs":["slug-a","slug-b"],"reason":"..."}],"archive":[{"slug":"slug-c","reason":"..."}]}`;

function parseReport(text: string): Report {
	const match = text.match(/\{[\s\S]*\}/);
	if (!match) return { overlaps: [], archive: [] };
	try {
		const obj = JSON.parse(match[0]);
		return { overlaps: obj.overlaps ?? [], archive: obj.archive ?? [] };
	} catch {
		return { overlaps: [], archive: [] };
	}
}

async function main(): Promise<void> {
	const all = await loadPosts();
	const posts = all.filter((p) => !p.archived);
	if (posts.length < 2) {
		console.log('Fewer than 2 active posts — nothing to review.');
		return;
	}

	const client = new Anthropic();
	const catalog = posts
		.map((p) => `### ${p.slug}\nTitle: ${p.title}\nDescription: ${p.description}\nExcerpt: ${p.excerpt}`)
		.join('\n\n');

	const msg = await client.messages.create({
		model: 'claude-opus-4-8',
		max_tokens: 2000,
		system: SYSTEM,
		messages: [{ role: 'user', content: `Here are the ${posts.length} published posts:\n\n${catalog}` }],
	});
	const text = msg.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
	const report = parseReport(text);

	if (report.overlaps.length === 0 && report.archive.length === 0) {
		console.log('No issues found. (Skipping Telegram report.)');
		return;
	}

	let summary = '🧹 *Weekly catalog review*\n';
	if (report.overlaps.length) {
		summary += '\n*Possible overlaps:*\n';
		for (const o of report.overlaps) summary += `• ${o.slugs.join(' ↔ ')}\n  _${o.reason}_\n`;
	}
	if (report.archive.length) {
		summary += `\n*${report.archive.length} archive suggestion(s) below.*`;
	}
	await sendMessage(summary);

	// One message + Archive button per archive suggestion.
	for (const a of report.archive) {
		await sendMessage(`Archive *${a.slug}*?\n_${a.reason}_`, [
			{ text: '📦 Archive', callback_data: `archive:${a.slug}` },
		]);
	}

	console.log(`Reported ${report.overlaps.length} overlap(s), ${report.archive.length} archive suggestion(s).`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
