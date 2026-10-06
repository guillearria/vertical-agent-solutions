# CLAUDE.md

Astro blog ("Vertical Agent Solutions") with an autonomous AI publishing pipeline. Read `SETUP.md` for architecture, `BACKLOG.md` for pending work.

## Two runtimes — don't mix their APIs

- `src/` — Astro static site. Content collection: `src/content/blog/*.md`, schema in `src/content.config.ts`. Site-wide `<head>`/SEO: `src/components/BaseHead.astro`.
- `pipeline/` — Node 22 scripts run by GitHub Actions (`tsx`). `editor.ts` = daily autonomous editor; `writer.ts` = shared drafting core; `variety.ts` = anti-template collision checks (writer gate + decider's `Catalog health:` block); `solicitation.ts` = the no-pitch gate (writer, fail-closed). Model access goes through `claude.ts` → headless Claude Code (`claude -p`) on **subscription auth** — never the metered Anthropic SDK/API (owner's explicit choice; `claude.ts` strips `ANTHROPIC_API_KEY` defensively).

`lib/` holds zero-dependency modules shared across runtimes: `slug.ts` (used by `pipeline/`) and `industries.ts`, the sector-hub list (used by `src/` and the pipeline's decider). Keep it free of imports and runtime-specific APIs.

## Commands

- `npm run build` (root) — build + validate content schema.
- `cd pipeline && npx tsc --noEmit` — type-check pipeline (includes `lib/`).
- `cd pipeline && EDITOR_DRY_RUN=1 npx tsx src/editor.ts` — safe editor dry run (uses the logged-in `claude` CLI; skips git push / Telegram).

## Constraints to respect

- **The site sells nothing.** It is a free publication and a public showcase of the autonomous editor. No contact form, no service pitch, no "work with us", no vendor voice ("we design", "our clients") in chrome or posts. Corrections go through GitHub Issues. The writer enforces this in code (`pipeline/src/solicitation.ts`, fail-closed); keep the rule there, not only in prompts.
- **Telegram is outbound-only and purely informational** (owner's explicit choice): plain notifications, no inline buttons, no webhook, no bot commands. Undoing an editor action = reverting its commit.
- Deploys: Cloudflare Pages auto-builds on push to `main`; the editor workflow pushes with `GITHUB_TOKEN` (this does trigger Pages, which uses its own GitHub App).
- Posts are never deleted — retire with `archived: true` frontmatter (filtered from listing/RSS).
- `pubDate`/`updatedDate` format: `'Jun 20 2026'` (see `pubDateString` in `pipeline/src/writer.ts`).
