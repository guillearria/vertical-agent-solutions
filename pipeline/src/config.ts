import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function required(name: string): string {
	const value = process.env[name];
	if (!value) {
		console.error(
			`\nMissing required env var: ${name}\n` +
				`→ Copy pipeline/.env.example to pipeline/.env and fill it in.\n`,
		);
		process.exit(1);
	}
	return value;
}

const here = path.dirname(fileURLToPath(import.meta.url)); // pipeline/src
const repoRoot = path.resolve(here, '..', '..'); // vertical-agent-solutions

export const config = {
	botToken: required('TELEGRAM_BOT_TOKEN'),
	ownerId: process.env.TELEGRAM_OWNER_ID ? Number(process.env.TELEGRAM_OWNER_ID) : undefined,
	inboxDir: process.env.INBOX_DIR || path.join(repoRoot, 'inbox'),
	draftsDir: process.env.DRAFTS_DIR || path.join(repoRoot, 'drafts'),
};
