import fs from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';

export interface FragmentInput {
	text: string;
	type?: string;
	from?: { id?: number; username?: string; first_name?: string };
}

function makeId(now: Date): string {
	const stamp = now.toISOString().slice(0, 16).replace(/[-:T]/g, ''); // 202606201655
	const rand = Math.random().toString(36).slice(2, 7);
	return `${stamp}-${rand}`;
}

/** Save a captured fragment as a markdown file with frontmatter in the inbox. */
export async function saveFragment(input: FragmentInput): Promise<{ id: string; file: string }> {
	await fs.mkdir(config.inboxDir, { recursive: true });
	const now = new Date();
	const id = makeId(now);
	const file = path.join(config.inboxDir, `${id}.md`);

	const fromLabel = input.from?.username
		? `@${input.from.username}`
		: (input.from?.first_name ?? String(input.from?.id ?? 'unknown'));

	const doc = [
		'---',
		`id: ${id}`,
		`created: ${now.toISOString()}`,
		'source: telegram',
		`type: ${input.type ?? 'text'}`,
		`from: ${fromLabel}`,
		'status: inbox',
		'---',
		'',
		input.text.trim(),
		'',
	].join('\n');

	await fs.writeFile(file, doc, 'utf8');
	return { id, file };
}

/** Return the N most recent fragments with a short text preview. */
export async function listRecent(n = 5): Promise<Array<{ file: string; preview: string }>> {
	await fs.mkdir(config.inboxDir, { recursive: true });
	const files = (await fs.readdir(config.inboxDir)).filter((f) => f.endsWith('.md'));

	const withTimes = await Promise.all(
		files.map(async (f) => ({
			f,
			t: (await fs.stat(path.join(config.inboxDir, f))).mtimeMs,
		})),
	);
	withTimes.sort((a, b) => b.t - a.t);

	return Promise.all(
		withTimes.slice(0, n).map(async ({ f }) => {
			const content = await fs.readFile(path.join(config.inboxDir, f), 'utf8');
			const body = content.split('---').slice(2).join('---').trim();
			const preview = (body.split('\n')[0] ?? '').slice(0, 60);
			return { file: f, preview };
		}),
	);
}

export interface Fragment {
	id: string;
	file: string;
	frontmatter: Record<string, string>;
	body: string;
}

function parseFrontmatter(content: string): { fm: Record<string, string>; body: string } {
	if (!content.startsWith('---')) return { fm: {}, body: content.trim() };
	const end = content.indexOf('\n---', 3);
	if (end === -1) return { fm: {}, body: content.trim() };
	const fmBlock = content.slice(3, end).trim();
	const body = content.slice(end + 4).replace(/^\s*\n/, '').trim();
	const fm: Record<string, string> = {};
	for (const line of fmBlock.split('\n')) {
		const i = line.indexOf(':');
		if (i === -1) continue;
		fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
	}
	return { fm, body };
}

/** Load a fragment by id, or the most recent one still in the inbox if no id is given. */
export async function loadFragment(id?: string): Promise<Fragment | null> {
	await fs.mkdir(config.inboxDir, { recursive: true });
	const files = (await fs.readdir(config.inboxDir)).filter((f) => f.endsWith('.md'));
	if (files.length === 0) return null;

	let chosen: string | undefined;
	if (id) {
		chosen = files.find((f) => f === `${id}.md` || f.startsWith(id));
		if (!chosen) return null;
	} else {
		const withTimes = await Promise.all(
			files.map(async (f) => ({
				f,
				t: (await fs.stat(path.join(config.inboxDir, f))).mtimeMs,
			})),
		);
		withTimes.sort((a, b) => b.t - a.t);
		for (const { f } of withTimes) {
			const c = await fs.readFile(path.join(config.inboxDir, f), 'utf8');
			if ((parseFrontmatter(c).fm.status ?? 'inbox') === 'inbox') {
				chosen = f;
				break;
			}
		}
		chosen = chosen ?? withTimes[0]!.f;
	}

	const fullPath = path.join(config.inboxDir, chosen);
	const { fm, body } = parseFrontmatter(await fs.readFile(fullPath, 'utf8'));
	return { id: fm.id ?? chosen.replace(/\.md$/, ''), file: fullPath, frontmatter: fm, body };
}

/** Update the `status:` line of a fragment file in place. */
export async function setFragmentStatus(file: string, status: string): Promise<void> {
	const content = await fs.readFile(file, 'utf8');
	await fs.writeFile(file, content.replace(/^status:.*$/m, `status: ${status}`), 'utf8');
}
