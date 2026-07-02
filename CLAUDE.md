# CLAUDE.md

Astro blog ("Vertical Agent Solutions") with an autonomous AI publishing pipeline. Read `SETUP.md` for architecture, `BACKLOG.md` for pending work.

## Three runtimes — don't mix their APIs

- `src/` — Astro static site. Content collection: `src/content/blog/*.md`, schema in `src/content.config.ts`. Site-wide `<head>`/SEO: `src/components/BaseHead.astro`.
- `functions/` — **Cloudflare Pages Functions (Workers runtime)**. No Node APIs, no npm dependencies. `functions/api/telegram.ts` is the Telegram webhook (publish/archive/undo via GitHub Contents API); `functions/api/contact.ts` is the contact form.
- `pipeline/` — Node 22 scripts run by GitHub Actions (`tsx`, Anthropic SDK). `editor.ts` = daily autonomous editor; `runDraft.ts` = manual `/draft` flow; `writer.ts` = shared drafting core.

`lib/` holds zero-dependency helpers imported by BOTH `functions/` and `pipeline/` — keep it free of imports and runtime-specific APIs.

## Commands

- `npm run build` (root) — build + validate content schema.
- `cd pipeline && npx tsc --noEmit` — type-check pipeline (includes `lib/`).
- `cd pipeline && EDITOR_DRY_RUN=1 npx tsx src/editor.ts` — safe editor dry run (needs `ANTHROPIC_API_KEY`; skips git push / KV writes / Telegram).

## Constraints to respect

- **Telegram `callback_data` is max 64 bytes.** That's why slugs cap at 50 chars (`archive:<slug>`) and editor undo uses short KV tokens (`undo:<token>`).
- Deploys: Cloudflare Pages auto-builds on push to `main`; the editor workflow pushes with `GITHUB_TOKEN` (this does trigger Pages, which uses its own GitHub App).
- Posts are never deleted — retire with `archived: true` frontmatter (filtered from listing/RSS).
- `pubDate`/`updatedDate` format: `'Jun 20 2026'` (see `pubDateString` in `pipeline/src/writer.ts`).
