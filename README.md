# Vertical Agent Solutions

Free, plain-English guides on adopting AI agents, industry by industry — written for business owners, not engineers. Live at **https://vertical-agent-solutions.pages.dev**.

The site is an independent publication with nothing for sale: no services, no contact form, no mailing list. Corrections and suggestions go through [GitHub Issues](https://github.com/guillearria/vertical-agent-solutions/issues). It is also a working demonstration of an autonomous editor, which [how this site writes itself](https://vertical-agent-solutions.pages.dev/how-this-site-writes-itself/) explains.

The blog runs itself:

- **Daily editor** (`.github/workflows/editor.yml` → `pipeline/src/editor.ts`) — every day an AI "editor-in-chief" reviews the whole catalog and takes the single highest-value action: publish a new post, improve an existing one, archive redundant content, or skip. It publishes autonomously and reports to Telegram. All Telegram traffic is outbound and purely informational — no buttons, no commands, no webhook; a bad action is reverted in git.
- **Guards in code, not prompts** — a 14-day per-slug cooldown, an archive floor, a variety gate against template rot (`pipeline/src/variety.ts`), and a solicitation gate (`pipeline/src/solicitation.ts`) that refuses to publish a draft that reads as the site selling anything.

## Stack

| Piece | Where |
|---|---|
| Astro static site | `src/` (content collection in `src/content/blog/`) |
| Node pipeline run by GitHub Actions (daily editor) | `pipeline/` |
| Shared helpers | `lib/` |

Hosting: Cloudflare Pages, auto-builds on every push to `main`. AI runs bill the owner's Claude Max subscription via headless Claude Code (`pipeline/src/claude.ts`) — no Anthropic API credits.

## Commands

| Command | Action |
|---|---|
| `npm install && npm run dev` | Site at `localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `cd pipeline && EDITOR_DRY_RUN=1 npx tsx src/editor.ts` | Dry-run the daily editor (no push, no Telegram) |
| `cd pipeline && npx tsc --noEmit` | Type-check the pipeline |

## Docs

- `SETUP.md` — full architecture + one-time setup (Cloudflare Pages, GitHub, Telegram).
- `BACKLOG.md` — status and pending work.
