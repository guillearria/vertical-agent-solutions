export interface ParsedSource {
	label: string;
	url?: string;
}

/**
 * Post sources are stored as `"Title (Publisher) — https://url"` (see the
 * writer pipeline's SOURCES format). Split on the last ` — ` when what
 * follows is a URL; otherwise the whole string is a label.
 */
export function parseSource(source: string): ParsedSource {
	const i = source.lastIndexOf(' — ');
	if (i !== -1) {
		const url = source.slice(i + 3).trim();
		if (/^https?:\/\/\S+$/.test(url)) return { label: source.slice(0, i).trim(), url };
	}
	return { label: source.trim() };
}

/** Display form of a source URL: its hostname without a leading www. */
export function sourceHost(url: string): string {
	try {
		return new URL(url).hostname.replace(/^www\./, '');
	} catch {
		return url;
	}
}
