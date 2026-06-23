import Anthropic from '@anthropic-ai/sdk';

/**
 * The shared "staff writer" core: turns a raw idea into a finished, fact-checked
 * Vertical Agent Solutions post. Used by both the local CLI (`draft.ts`) and the
 * GitHub Action runner (`runDraft.ts`).
 */

export const SYSTEM = `You are the staff writer for "Vertical Agent Solutions", a blog that teaches people across every industry how to adopt AI agents.

Voice and rules:
- Write in plain English for a smart but non-technical reader — a business owner, not an engineer. Assume no coding background.
- No hype, no buzzword salad, no "in today's fast-paced world" filler. Be concrete and specific.
- Simplify hard ideas with everyday analogies and real, named use cases across different industries.
- Deeply verify every factual claim. Use the web_search tool to check anything that is a stat, a date, a capability claim, or a reference to a real product/company/study. If you cannot find support for a claim, soften it to opinion or cut it. Never invent sources.
- Aim for roughly 600–900 words. Tight is better than padded.
- End with a short, non-salesy close that points the reader toward a concrete next step they could take.

Output format — follow it exactly:
TITLE: <a clear, specific headline>
DESCRIPTION: <one sentence, max ~160 chars, summarizing the post>

<the full article body in Markdown — use ## subheadings, short paragraphs, and lists. Do NOT repeat the title as an H1.>

SOURCES:
- <source label> — <url>
(List only sources you actually used via web_search. If you used none, write "SOURCES:" followed by "- none".)`;

export interface Parsed {
	title: string;
	description: string;
	sources: string[];
	body: string;
}

export function parseOutput(text: string): Parsed {
	// Tolerant of bold markers (**TITLE:**), `:` or `-` separators, and case.
	const titleMatch = text.match(/^\s*\**\s*TITLE\s*[:\-]\s*(.+?)\s*$/im);
	let title = titleMatch?.[1]?.replace(/\*+/g, '').trim();
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
	return { title, description, sources, body };
}

/** Turn a slug-friendly string from a title (used for the published filename / URL). */
export function slugify(title: string): string {
	return (
		title
			.toLowerCase()
			.replace(/['"]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.slice(0, 50) || 'post'
	);
}

/** A pubDate string Astro's `z.coerce.date()` accepts, e.g. "Jun 20 2026". */
export function pubDateString(d = new Date()): string {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
}

export function buildFrontmatter(p: Parsed, fragmentId: string): string {
	const sourcesBlock = p.sources.length
		? '\n' + p.sources.map((s) => `  - ${JSON.stringify(s)}`).join('\n')
		: ' []';
	return [
		'---',
		`title: ${JSON.stringify(p.title)}`,
		`description: ${JSON.stringify(p.description)}`,
		`pubDate: '${pubDateString()}'`,
		`sourceFragment: ${fragmentId}`,
		'status: draft',
		`sources:${sourcesBlock}`,
		'---',
		'',
		p.body,
		'',
	].join('\n');
}

/**
 * Run the model (with server-side web search) against a raw idea and return the
 * parsed draft. Requires ANTHROPIC_API_KEY in the environment.
 * Throws on refusal.
 */
export async function draftFromText(idea: string): Promise<Parsed> {
	const client = new Anthropic();

	const messages: Anthropic.MessageParam[] = [
		{
			role: 'user',
			content:
				`Here is a raw idea fragment I captured from my phone:\n\n"""\n${idea}\n"""\n\n` +
				`Develop it into a finished Vertical Agent Solutions post, following every rule in your instructions.`,
		},
	];

	// Collect each turn's text separately and join with newlines so the format
	// markers (TITLE:, DESCRIPTION:, SOURCES:) stay at the start of a line even
	// when the web-search loop splits the output across multiple turns.
	const parts: string[] = [];
	let stopReason: string | null | undefined;
	for (let i = 0; i < 6; i++) {
		const stream = client.messages.stream({
			model: 'claude-opus-4-8',
			max_tokens: 16000,
			thinking: { type: 'adaptive' },
			output_config: { effort: 'high' },
			tools: [{ type: 'web_search_20260209', name: 'web_search' }],
			system: SYSTEM,
			messages,
		});
		const final = await stream.finalMessage();
		let turnText = '';
		for (const block of final.content) {
			if (block.type === 'text') turnText += block.text;
		}
		if (turnText) parts.push(turnText);
		stopReason = final.stop_reason;
		if (stopReason === 'pause_turn') {
			// Server-side tool loop paused — resend with the assistant turn to resume.
			messages.push({ role: 'assistant', content: final.content });
			continue;
		}
		break;
	}

	if (stopReason === 'refusal') {
		throw new Error('The model declined to draft this fragment. Try rewording it.');
	}

	const collected = parts.join('\n');
	if (!/^\s*\**\s*TITLE\s*[:\-]/im.test(collected)) {
		console.warn('⚠️ No TITLE: line found in model output. First 300 chars:\n' + collected.slice(0, 300));
	}
	return parseOutput(collected);
}
