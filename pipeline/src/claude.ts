import { execFile } from 'node:child_process';

/**
 * Thin wrapper around headless Claude Code (`claude -p`) — the pipeline's only
 * model access. It runs on Claude *subscription* auth, never metered API
 * billing: locally via the logged-in CLI, in CI via a `CLAUDE_CODE_OAUTH_TOKEN`
 * secret generated once with `claude setup-token`.
 *
 * ANTHROPIC_API_KEY is deliberately stripped from the child environment — if
 * it leaked in, the CLI would silently switch to metered API billing.
 */

const MODEL = process.env.CLAUDE_MODEL || 'opus';

export function runClaude(opts: {
	system: string;
	prompt: string;
	/** Built-in tools to expose, e.g. ['WebSearch']. Default: none. */
	tools?: string[];
	timeoutMs?: number;
}): Promise<string> {
	const tools = opts.tools?.join(',') ?? '';
	const args = [
		'-p',
		'--output-format', 'text',
		'--model', MODEL,
		'--fallback-model', 'sonnet',
		'--system-prompt', opts.system,
		'--tools', tools,
		'--strict-mcp-config', // no MCP servers, even if the local user has some configured
	];
	if (tools) args.push('--allowedTools', tools);

	const env = { ...process.env };
	delete env.ANTHROPIC_API_KEY;

	return new Promise((resolve, reject) => {
		const child = execFile(
			'claude',
			args,
			{ env, timeout: opts.timeoutMs ?? 15 * 60_000, maxBuffer: 32 * 1024 * 1024 },
			(err, stdout, stderr) => {
				if (err) {
					reject(new Error(`claude -p failed: ${err.message}\n${String(stderr).slice(0, 2000)}`));
				} else {
					resolve(String(stdout));
				}
			},
		);
		// Prompt via stdin — briefs embed whole post bodies, too big for argv.
		child.stdin?.write(opts.prompt);
		child.stdin?.end();
	});
}
