/**
 * Contact form endpoint — Cloudflare Pages Function (Workers runtime).
 *
 * POST /api/contact with form data (name, email, message) forwards the message
 * to the owner's Telegram chat. Spam defenses, in order:
 *   1. Honeypot field ("company") — bots that fill it get a fake success.
 *   2. KV rate limit — max 5 messages per IP per hour.
 *   3. Cloudflare Turnstile — verified server-side when TURNSTILE_SECRET_KEY is
 *      configured (skipped otherwise so the form works before Turnstile setup).
 *
 * Vars (set in the Pages project): TELEGRAM_BOT_TOKEN, TELEGRAM_OWNER_ID,
 * TURNSTILE_SECRET_KEY (optional but recommended) + the INBOX_KV binding.
 */

interface Env {
	INBOX_KV: KVNamespace;
	TELEGRAM_BOT_TOKEN: string;
	TELEGRAM_OWNER_ID: string;
	TURNSTILE_SECRET_KEY?: string;
}

// Minimal KV shape (avoids a dependency on @cloudflare/workers-types).
interface KVNamespace {
	get(key: string): Promise<string | null>;
	put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
}

const RATE_LIMIT = 5; // messages per IP per hour

function respond(request: Request, status: number, error?: string): Response {
	// No-JS fallback: a plain form POST expects a page back, so redirect.
	if ((request.headers.get('Accept') ?? '').includes('text/html')) {
		const to = error ? `/contact/?error=${encodeURIComponent(error)}` : '/contact/?sent=1';
		return new Response(null, { status: 303, headers: { Location: to } });
	}
	return new Response(JSON.stringify(error ? { ok: false, error } : { ok: true }), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
	const body = new URLSearchParams({ secret, response: token });
	if (ip) body.set('remoteip', ip);
	const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		body,
	});
	if (!res.ok) return false;
	const outcome = (await res.json()) as { success: boolean };
	return outcome.success;
}

export const onRequestPost = async (context: { request: Request; env: Env }): Promise<Response> => {
	const { request, env } = context;

	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return respond(request, 400, 'Invalid form submission.');
	}

	const name = String(form.get('name') ?? '').trim();
	const email = String(form.get('email') ?? '').trim();
	const message = String(form.get('message') ?? '').trim();
	const honeypot = String(form.get('company') ?? '').trim();

	// Honeypot: pretend it worked, forward nothing.
	if (honeypot) return respond(request, 200);

	const ip = request.headers.get('CF-Connecting-IP');
	if (ip) {
		const key = `rl:contact:${ip}`;
		const count = Number((await env.INBOX_KV.get(key)) ?? '0');
		if (count >= RATE_LIMIT) {
			return respond(request, 429, 'Too many messages from this connection — please try again later.');
		}
		await env.INBOX_KV.put(key, String(count + 1), { expirationTtl: 3600 });
	}

	if (!name || name.length > 100) return respond(request, 400, 'Please provide your name.');
	if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 200) {
		return respond(request, 400, 'Please provide a valid email address.');
	}
	if (message.length < 10 || message.length > 2000) {
		return respond(request, 400, 'Please write a message between 10 and 2000 characters.');
	}

	if (env.TURNSTILE_SECRET_KEY) {
		const token = String(form.get('cf-turnstile-response') ?? '');
		const human = token && (await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip));
		if (!human) return respond(request, 400, 'Spam check failed — please reload and try again.');
	}

	// Plain text on purpose: no parse_mode means user input can't inject Telegram markup.
	const text = `📬 Contact form\nFrom: ${name} <${email}>\n\n${message}`;
	const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ chat_id: env.TELEGRAM_OWNER_ID, text, disable_web_page_preview: true }),
	});
	if (!res.ok) return respond(request, 502, 'Could not deliver your message — please try again later.');

	return respond(request, 200);
};
