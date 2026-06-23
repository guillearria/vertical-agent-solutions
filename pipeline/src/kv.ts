/**
 * Minimal Cloudflare KV REST client, for use from GitHub Actions (which can't
 * use a Worker KV binding). The Pages Function talks to the same namespace via
 * its native binding. Requires CF_ACCOUNT_ID, CF_KV_NAMESPACE_ID, CF_API_TOKEN.
 */

function base(): string {
	const account = process.env.CF_ACCOUNT_ID;
	const ns = process.env.CF_KV_NAMESPACE_ID;
	if (!account || !ns) {
		throw new Error('Missing CF_ACCOUNT_ID or CF_KV_NAMESPACE_ID for KV access.');
	}
	return `https://api.cloudflare.com/client/v4/accounts/${account}/storage/kv/namespaces/${ns}`;
}

function authHeaders(): Record<string, string> {
	const token = process.env.CF_API_TOKEN;
	if (!token) throw new Error('Missing CF_API_TOKEN for KV access.');
	return { Authorization: `Bearer ${token}` };
}

/** Write a value (any JSON-serializable) under a key, optionally expiring after `ttlSeconds`. */
export async function kvPut(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
	const url = new URL(`${base()}/values/${encodeURIComponent(key)}`);
	if (ttlSeconds) url.searchParams.set('expiration_ttl', String(ttlSeconds));
	const res = await fetch(url, {
		method: 'PUT',
		headers: authHeaders(),
		body: typeof value === 'string' ? value : JSON.stringify(value),
	});
	if (!res.ok) throw new Error(`KV put failed (${res.status}): ${await res.text()}`);
}

/** Read and JSON-parse a value, or null if absent. */
export async function kvGet<T = unknown>(key: string): Promise<T | null> {
	const res = await fetch(`${base()}/values/${encodeURIComponent(key)}`, { headers: authHeaders() });
	if (res.status === 404) return null;
	if (!res.ok) throw new Error(`KV get failed (${res.status}): ${await res.text()}`);
	return (await res.json()) as T;
}
