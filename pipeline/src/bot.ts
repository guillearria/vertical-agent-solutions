import { Bot } from 'grammy';
import { config } from './config';
import { listRecent, saveFragment } from './inbox';

const bot = new Bot(config.botToken);

// Lock the bot to its owner, if an owner id is configured.
bot.use(async (ctx, next) => {
	if (config.ownerId && ctx.from?.id !== config.ownerId) {
		await ctx.reply('This inbox is private.');
		return;
	}
	await next();
});

bot.command('start', (ctx) =>
	ctx.reply(
		'Vertical Agent Solutions — idea inbox.\n\n' +
			'Send me anything: a thought, a rough draft, a link. I save it as a fragment for the writing pipeline.\n\n' +
			'/list — show your 5 most recent fragments',
	),
);

bot.command('list', async (ctx) => {
	const recent = await listRecent(5);
	if (recent.length === 0) {
		await ctx.reply('Inbox is empty. Send me an idea.');
		return;
	}
	const lines = recent.map((r, i) => `${i + 1}. ${r.preview || '(no text)'}`);
	await ctx.reply('Recent fragments:\n' + lines.join('\n'));
});

bot.on('message:text', async (ctx) => {
	const { id } = await saveFragment({ text: ctx.message.text, type: 'text', from: ctx.from });
	await ctx.reply(`Saved ✓  ${id}`);
});

// Anything that isn't plain text (voice, photos, etc.) — acknowledged, handled later.
bot.on('message', (ctx) =>
	ctx.reply('Text only for now — voice notes and images are coming next. Send text and I will save it.'),
);

bot.catch((err) => console.error('Bot error:', err));

console.log('VAS inbox bot starting (long polling)…');
bot.start();
