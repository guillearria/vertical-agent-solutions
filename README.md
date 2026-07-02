# Vertical Agent Solutions

Plain-English guides on adopting AI agents, industry by industry — written for business owners, not engineers. Live at **https://vertical-agent-solutions.pages.dev** (custom domain `verticalagentsolutions.com` pending).

The blog runs itself:

- **Daily editor** (`.github/workflows/editor.yml` → `pipeline/src/editor.ts`) — every day an AI "editor-in-chief" reviews the whole catalog and takes the single highest-value action: publish a new post, improve an existing one, archive redundant content, or skip. It publishes autonomously and reports to Telegram with an Undo button.
- **Phone-to-publish** (manual, still available) — send an idea to the Telegram bot, `/draft` turns it into a fact-checked draft (headless Claude Code + WebSearch), tap Approve to publish.
- **Contact form** (`/about`) — posts to `functions/api/contact.ts`, which forwards to Telegram. Spam-guarded by Cloudflare Turnstile + honeypot + rate limit.

## Stack

| Piece | Where |
|---|---|
| Astro static site | `src/` (content collection in `src/content/blog/`) |
| Cloudflare Pages Functions (Telegram webhook, contact form) | `functions/api/` |
| Node pipeline run by GitHub Actions (drafting, daily editor) | `pipeline/` |
| Shared helpers (both runtimes) | `lib/` |

Hosting: Cloudflare Pages, auto-builds on every push to `main`. State (idea fragments, draft candidates, undo tokens): Cloudflare KV. AI runs bill the owner's Claude Max subscription via headless Claude Code (`pipeline/src/claude.ts`) — no Anthropic API credits.

## Commands

| Command | Action |
|---|---|
| `npm install && npm run dev` | Site at `localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `cd pipeline && EDITOR_DRY_RUN=1 npx tsx src/editor.ts` | Dry-run the daily editor (no push, no Telegram) |
| `cd pipeline && npx tsc --noEmit` | Type-check the pipeline |

## Docs

- `SETUP.md` — full architecture + one-time setup (Cloudflare, GitHub, Telegram, Turnstile).
- `BACKLOG.md` — status and pending work.
