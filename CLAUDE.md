# CLAUDE.md

Astro blog ("Vertical Agent Solutions") with an autonomous AI publishing pipeline. Read `SETUP.md` for architecture, `BACKLOG.md` for pending work.

## Three runtimes — don't mix their APIs

- `src/` — Astro static site. Content collection: `src/content/blog/*.md`, schema in `src/content.config.ts`. Site-wide `<head>`/SEO: `src/components/BaseHead.astro`.
- `functions/` — **Cloudflare Pages Functions (Workers runtime)**. No Node APIs, no npm dependencies. `functions/api/contact.ts` (contact form) is the only Function.
- `pipeline/` — Node 22 scripts run by GitHub Actions (`tsx`). `editor.ts` = daily autonomous editor; `writer.ts` = shared drafting core; `variety.ts` = anti-template collision checks (writer gate + decider's `Catalog health:` block). Model access goes through `claude.ts` → headless Claude Code (`claude -p`) on **subscription auth** — never the metered Anthropic SDK/API (owner's explicit choice; `claude.ts` strips `ANTHROPIC_API_KEY` defensively).

`lib/` holds zero-dependency helpers imported by BOTH `functions/` and `pipeline/` — keep it free of imports and runtime-specific APIs.

## Commands

- `npm run build` (root) — build + validate content schema.
- `cd pipeline && npx tsc --noEmit` — type-check pipeline (includes `lib/`).
- `cd pipeline && EDITOR_DRY_RUN=1 npx tsx src/editor.ts` — safe editor dry run (uses the logged-in `claude` CLI; skips git push / Telegram).

## Constraints to respect

- **Telegram is outbound-only and purely informational** (owner's explicit choice): plain notifications, no inline buttons, no webhook, no bot commands. Undoing an editor action = reverting its commit.
- Deploys: Cloudflare Pages auto-builds on push to `main`; the editor workflow pushes with `GITHUB_TOKEN` (this does trigger Pages, which uses its own GitHub App).
- Posts are never deleted — retire with `archived: true` frontmatter (filtered from listing/RSS).
- `pubDate`/`updatedDate` format: `'Jun 20 2026'` (see `pubDateString` in `pipeline/src/writer.ts`).
