/**
 * Tiny Telegram Bot API helper for the GitHub Actions side. Purely
 * informational by design: plain notifications to the owner, no inline
 * buttons, no interactive actions. Messages are sent to TELEGRAM_OWNER_ID
 * using TELEGRAM_BOT_TOKEN.
 */

function token(): string {
	const t = process.env.TELEGRAM_BOT_TOKEN;
	if (!t) throw new Error('Missing TELEGRAM_BOT_TOKEN.');
	return t;
}

function chatId(): string {
	const id = process.env.TELEGRAM_OWNER_ID;
	if (!id) throw new Error('Missing TELEGRAM_OWNER_ID (the chat to notify).');
	return id;
}

/** Send a plain informational message to the owner. */
export async function sendMessage(text: string): Promise<void> {
	const res = await fetch(`https://api.telegram.org/bot${token()}/sendMessage`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			chat_id: chatId(),
			text,
			parse_mode: 'Markdown',
			disable_web_page_preview: true,
		}),
	});
	if (!res.ok) throw new Error(`Telegram sendMessage failed (${res.status}): ${await res.text()}`);
}
