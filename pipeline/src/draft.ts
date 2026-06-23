import fs from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';
import { loadFragment, setFragmentStatus } from './inbox';
import { buildFrontmatter, draftFromText } from './writer';

/**
 * Local CLI: draft from a filesystem fragment in `inbox/` and write the result
 * to `drafts/`. The hosted pipeline uses `runDraft.ts` instead, but this stays
 * handy for offline / laptop use.
 *
 *   npm run draft            # most recent un-drafted fragment
 *   npm run draft <id>       # a specific fragment
 */
async function main(): Promise<void> {
	if (!process.env.ANTHROPIC_API_KEY) {
		console.error(
			'\nMissing ANTHROPIC_API_KEY.\n' +
				'→ Add it to pipeline/.env (get one at https://console.anthropic.com → API keys).\n',
		);
		process.exit(1);
	}

	const fragment = await loadFragment(process.argv[2]);
	if (!fragment) {
		console.error('No fragment found. Send an idea to the Telegram bot first, or pass a fragment id.');
		process.exit(1);
	}

	console.log(`Drafting from fragment ${fragment.id} (researching + fact-checking via web search)…`);
	const parsed = await draftFromText(fragment.body);

	await fs.mkdir(config.draftsDir, { recursive: true });
	const draftFile = path.join(config.draftsDir, `${fragment.id}.md`);
	await fs.writeFile(draftFile, buildFrontmatter(parsed, fragment.id), 'utf8');
	await setFragmentStatus(fragment.file, 'drafted');

	console.log(`\n✓ Draft written: ${draftFile}`);
	console.log(`  Title:   ${parsed.title}`);
	console.log(`  Sources: ${parsed.sources.length}`);
	console.log('\nReview it, then we wire the gates + publish step.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
