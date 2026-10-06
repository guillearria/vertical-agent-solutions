/**
 * Solicitation gate. The site is a publication, not a vendor: nothing on it is
 * for sale, and no post may read as the site offering, building, or selling
 * anything, or invite the reader to contact it. The writer prompt asks for
 * that voice; this enforces it in code, the way `variety.ts` enforces variety.
 *
 * Quoted dialogue is exempt. Scenario posts quote the business ("we can take
 * you at 2:15"), and that "we" is the business speaking, not the site. Text
 * inside straight or curly double quotes and blockquote lines is stripped
 * before matching, so only the publication's own voice is checked.
 *
 * Used by the writer's retry gate (fail-closed: a draft that still trips it
 * after one retry is not published) and by one-off catalog audits.
 */

export interface SolicitationHit {
	/** Which rule fired. */
	label: string;
	/** The offending text, for the retry feedback. */
	match: string;
}

const PATTERNS: Array<[RegExp, string]> = [
	[/vertical agent solutions/i, 'names the site in the post'],
	[/\/contact\b/i, 'links a contact page'],
	[
		/\b(?:contact|email|call|message|hire|talk to|work with|reach out to|get in touch with) (?:us|me|the (?:site|editor|author|team))\b/i,
		'invites the reader to contact the site',
	],
	[
		/\b(?:we|our team|the team) (?:build|builds|design|designs|ship|ships|install|installs|deploy|deploys|offer|offers|sell|sells|set up|sets up|configure|configures|can help|help you|are here to help)\b/i,
		'speaks as a vendor',
	],
	[/\bour (?:clients|customers|services|agency|consultancy|pricing|packages|engagements)\b/i, 'speaks as a vendor'],
	[/\b(?:free|no-cost) (?:consultation|audit|assessment|scoping|strategy call)\b/i, 'offers a free consultation'],
	[/\bbook a (?:call|consultation|strategy session) with (?:us|me)\b/i, 'invites a sales call'],
];

/** Remove quoted dialogue and blockquotes so only the publisher's voice remains. */
export function stripQuoted(text: string): string {
	return text
		.split('\n')
		.filter((line) => !/^\s*>/.test(line))
		.join('\n')
		.replace(/"[^"\n]*"/g, ' ')
		.replace(/“[^”\n]*”/g, ' ');
}

export function solicitationHits(draft: { title: string; description: string; body: string }): SolicitationHit[] {
	const hits: SolicitationHit[] = [];
	const fields: Array<[string, string]> = [
		['TITLE', draft.title],
		['DESCRIPTION', draft.description],
		['body', stripQuoted(draft.body)],
	];
	for (const [field, text] of fields) {
		for (const [pattern, label] of PATTERNS) {
			const m = text.match(pattern);
			if (m) hits.push({ label: `${field} ${label}`, match: m[0] });
		}
	}
	return hits;
}

/**
 * Retry instruction for the writer, or null if the draft reads as a
 * publication should.
 */
export function solicitationFeedback(draft: { title: string; description: string; body: string }): string | null {
	const hits = solicitationHits(draft);
	if (!hits.length) return null;
	const lines = hits.map((h) => `- ${h.label}: "${h.match}"`);
	return (
		`This site is an independent publication with nothing for sale. It never offers, builds, or ` +
		`sells anything, never invites readers to contact it, and is never named in a post. Your draft ` +
		`reads as a pitch in these places:\n${lines.join('\n')}\n` +
		`Rewrite those passages in the publication's voice (quoted dialogue where the business itself ` +
		`speaks is fine). Where the reader needs help beyond the post, point them to the kinds of ` +
		`vendors, professionals, or resources to look for, never to this site.`
	);
}
