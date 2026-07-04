/**
 * Formula-agnostic template detection for the catalog. The blog's failure mode
 * is convergence: titles that reuse another post's phrasing skeleton and
 * descriptions that all open the same way. Rather than hard-coding known
 * formulas (which only catches yesterday's template), these checks flag any
 * word-level overlap:
 *
 *   - titles: a shared 4-word sequence. 4 is deliberate — "ai agents for
 *     realtors" vs "ai agents for dental practices" don't collide (the
 *     vertical name breaks the run), but "help and where they" catches both
 *     "…Where They Actually Help (and Where They Don't)" and "…Where They
 *     Help and Where They Bite". No stopword stripping: formulas ARE
 *     stopword-heavy.
 *   - descriptions: an identical first-4-words opener.
 *
 * Used in three places: the decider prompt (catalog health facts), the
 * writer's post-generation retry gate, and one-off catalog audits. Approximate
 * by design — the output feeds an LLM, not a classifier.
 */

export interface VarietyEntry {
	slug: string;
	title: string;
	description?: string;
}

const TITLE_NGRAM = 4;
const OPENER_WORDS = 4;

function words(s: string): string[] {
	return s
		.toLowerCase()
		.replace(/['’‘"“”]/g, '')
		.replace(/[^a-z0-9]+/g, ' ')
		.trim()
		.split(/\s+/)
		.filter(Boolean);
}

function titleNgrams(title: string): Set<string> {
	const w = words(title);
	const grams = new Set<string>();
	for (let i = 0; i + TITLE_NGRAM <= w.length; i++) {
		grams.add(w.slice(i, i + TITLE_NGRAM).join(' '));
	}
	return grams;
}

function opener(description: string): string {
	return words(description).slice(0, OPENER_WORDS).join(' ');
}

/** The first catalog entry whose title shares a 4-word run with the candidate, or null. */
export function titleCollision(candidate: string, catalog: VarietyEntry[]): VarietyEntry | null {
	const grams = titleNgrams(candidate);
	if (!grams.size) return null;
	for (const entry of catalog) {
		for (const gram of titleNgrams(entry.title)) {
			if (grams.has(gram)) return entry;
		}
	}
	return null;
}

/** The first catalog entry whose description opens with the same 4 words, or null. */
export function openerCollision(candidateDesc: string, catalog: VarietyEntry[]): VarietyEntry | null {
	const candidateOpener = opener(candidateDesc);
	if (words(candidateDesc).length < OPENER_WORDS) return null;
	for (const entry of catalog) {
		if (!entry.description) continue;
		if (words(entry.description).length < OPENER_WORDS) continue;
		if (opener(entry.description) === candidateOpener) return entry;
	}
	return null;
}

function groups(entries: VarietyEntry[], keys: (e: VarietyEntry) => string[]): string[][] {
	const bySlug = new Map<string, Set<string>>(); // key -> slugs sharing it
	for (const e of entries) {
		for (const key of keys(e)) {
			let set = bySlug.get(key);
			if (!set) bySlug.set(key, (set = new Set()));
			set.add(e.slug);
		}
	}
	// Merge overlapping key-groups into slug clusters (a shared gram chain is one cluster).
	const clusters: Set<string>[] = [];
	for (const set of bySlug.values()) {
		if (set.size < 2) continue;
		const overlapping = clusters.filter((c) => [...set].some((s) => c.has(s)));
		const merged = new Set([...set, ...overlapping.flatMap((c) => [...c])]);
		for (const c of overlapping) clusters.splice(clusters.indexOf(c), 1);
		clusters.push(merged);
	}
	return clusters.map((c) => [...c].sort());
}

/**
 * Human/LLM-readable facts block for the decider: which posts share a title
 * formula and which share a description opener. Computed in code so redundancy
 * is a fact in front of the decider, not an inference it must make.
 */
export function catalogHealth(entries: VarietyEntry[]): string {
	const titleGroups = groups(entries, (e) => [...titleNgrams(e.title)]);
	const openerGroups = groups(
		entries.filter((e) => e.description && words(e.description).length >= OPENER_WORDS),
		(e) => [opener(e.description!)],
	);

	if (!titleGroups.length && !openerGroups.length) return 'No template collisions detected.';

	const lines: string[] = [];
	for (const g of titleGroups) {
		lines.push(`- Templated titles (shared phrasing): ${g.join(', ')}`);
	}
	for (const g of openerGroups) {
		lines.push(`- Same description opener: ${g.join(', ')}`);
	}
	return lines.join('\n');
}

/**
 * Retry instruction for the writer's variety gate, or null if the draft is
 * clean against the catalog.
 */
export function varietyFeedback(
	draft: { title: string; description: string },
	catalog: VarietyEntry[],
): string | null {
	const problems: string[] = [];
	const t = titleCollision(draft.title, catalog);
	if (t) {
		problems.push(
			`Your TITLE ("${draft.title}") shares its phrasing with the existing post "${t.title}" ` +
				`(/blog/${t.slug}/). Restructure the headline entirely — a different grammatical shape, not a reworded copy.`,
		);
	}
	const d = openerCollision(draft.description, catalog);
	if (d) {
		problems.push(
			`Your DESCRIPTION opens with the same words as the existing post "${d.title}" ` +
				`(/blog/${d.slug}/). Open the description a different way.`,
		);
	}
	return problems.length ? problems.join('\n') : null;
}
