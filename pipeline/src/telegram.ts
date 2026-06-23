/**
 * Tiny Telegram Bot API helper for the GitHub Actions side (drafting +
 * maintenance). Messages are sent to TELEGRAM_OWNER_ID using TELEGRAM_BOT_TOKEN.
 */

export interface InlineButton {
	text: string;
	callback_data: string;
}

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

/** Send a message to the owner, optionally with one row of inline buttons. */
export async function sendMessage(text: string, buttons?: InlineButton[]): Promise<void> {
	const body: Record<string, unknown> = {
		chat_id: chatId(),
		text,
		parse_mode: 'Markdown',
		disable_web_page_preview: true,
	};
	if (buttons?.length) {
		body.reply_markup = { inline_keyboard: [buttons.map((b) => ({ ...b }))] };
	}
	const res = await fetch(`https://api.telegram.org/bot${token()}/sendMessage`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	if (!res.ok) throw new Error(`Telegram sendMessage failed (${res.status}): ${await res.text()}`);
}
