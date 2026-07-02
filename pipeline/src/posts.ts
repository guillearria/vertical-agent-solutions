import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Loads the published catalog from `src/content/blog` for the pipeline jobs.
 * Deliberately parses frontmatter with regexes (not a YAML lib) — the pipeline
 * writes that frontmatter itself via `buildFrontmatter`, so the shape is known.
 */

const here = path.dirname(fileURLToPath(import.meta.url)); // pipeline/src
export const repoRoot = path.resolve(here, '..', '..');
export const blogDir = path.join(repoRoot, 'src', 'content', 'blog');

export interface Post {
	slug: string;
	/** Repo-relative path, e.g. "src/content/blog/foo.md". */
	filePath: string;
	title: string;
	description: string;
	pubDate: string;
	updatedDate: string;
	wordCount: number;
	excerpt: string;
	archived: boolean;
}

export function frontmatterValue(fm: string, key: string): string {
	const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
	return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
}

export function splitPost(content: string): { fm: string; body: string } {
	const end = content.indexOf('\n---', 3);
	const fm = content.startsWith('---') && end !== -1 ? content.slice(3, end) : '';
	const body = end !== -1 ? content.slice(end + 4) : content;
	return { fm, body };
}

export async function loadPosts(): Promise<Post[]> {
	const files = (await fs.readdir(blogDir)).filter((f) => /\.(md|mdx)$/.test(f));
	return Promise.all(
		files.map(async (f) => {
			const content = await fs.readFile(path.join(blogDir, f), 'utf8');
			const { fm, body } = splitPost(content);
			const text = body.trim();
			return {
				slug: f.replace(/\.(md|mdx)$/, ''),
				filePath: `src/content/blog/${f}`,
				title: frontmatterValue(fm, 'title'),
				description: frontmatterValue(fm, 'description'),
				pubDate: frontmatterValue(fm, 'pubDate'),
				updatedDate: frontmatterValue(fm, 'updatedDate'),
				wordCount: text ? text.split(/\s+/).length : 0,
				excerpt: text.replace(/\s+/g, ' ').slice(0, 600),
				archived: /^archived:\s*true\s*$/m.test(fm),
			};
		}),
	);
}
