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
	const title = text.match(/^TITLE:\s*(.+)$/m)?.[1]?.trim() ?? 'Untitled draft';
	const descMatch = text.match(/^DESCRIPTION:\s*(.+)$/m);
	const description = descMatch?.[1]?.trim() ?? '';

	let body = text;
	let sources: string[] = [];
	const sourcesIdx = text.search(/^SOURCES:\s*$/m);
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
	}
	return { title, description, sources, body: body.trim() };
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

	let collected = '';
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
		for (const block of final.content) {
			if (block.type === 'text') collected += block.text;
		}
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

	return parseOutput(collected);
}
