/**
 * Shared, zero-dependency text helpers used by BOTH runtimes:
 * the Node pipeline (`pipeline/`, GitHub Actions) and the Cloudflare Pages
 * Functions (`functions/`, Workers). Keep this file import-free and free of
 * Node- or Workers-only APIs.
 */

/**
 * Slug for the published filename / URL, e.g. "AI Agents for Realtors" →
 * "ai-agents-for-realtors". Capped at 50 chars without cutting mid-word —
 * keeps URLs tidy, and existing published slugs already follow this cap.
 */
export function slugify(title: string): string {
	let slug = title
		.toLowerCase()
		.replace(/['"]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	if (slug.length > 50) {
		const cut = slug.slice(0, 50);
		// If the cut lands mid-word, drop the partial trailing segment
		// (unless the slug is one giant word — then keep the hard cut).
		slug = slug[50] === '-' ? cut : cut.replace(/-[^-]*$/, '') || cut;
		slug = slug.replace(/-+$/g, '');
	}
	return slug || 'post';
}

/**
 * Word-boundary truncation for SEO meta descriptions (Google snippets cut
 * around 160 chars). Also collapses whitespace.
 */
export function truncateDescription(text: string, max = 160): string {
	const clean = text.replace(/\s+/g, ' ').trim();
	if (clean.length <= max) return clean;
	const cut = clean.slice(0, max - 1);
	const lastSpace = cut.lastIndexOf(' ');
	return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.]+$/g, '') + '…';
}
