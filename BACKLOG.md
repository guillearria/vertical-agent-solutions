# Backlog

Status: **MVP live and working** at `https://vertical-agent-solutions.pages.dev` — phone → Telegram → AI draft (Opus + web-search verification) → preview → Approve → published → deployed. See `SETUP.md` for the architecture.

## Polish (quick wins)
- [ ] **Drop leftover `status: draft`** from published frontmatter (it's cosmetic — Astro/zod ignores it). Fix in `buildFrontmatter` (`pipeline/src/writer.ts`) or flip it during publish in `functions/api/telegram.ts` (`publishCandidate`).
- [ ] **Slug cuts mid-word** (e.g. `...actually-help-an`). Trim to the last whole word. ⚠️ The 50-char cap exists so `archive:<slug>` stays within Telegram's 64-byte `callback_data` — keep that constraint (or switch archive to a short KV token instead of the raw slug). Touches `slugify` in `functions/api/telegram.ts` (+ the unused copy in `pipeline/src/writer.ts`).
- [ ] **Silence Node 20 deprecation warning** in Actions — bump `actions/checkout` / `actions/setup-node` (`.github/workflows/*.yml`).

## Mobile / UI (site looks cramped on mobile)
- [ ] Responsive audit + fixes for narrow viewports. Likely culprits:
  - `main { width: 960px }` (fixed, no max-width) in `src/pages/blog/index.astro`
  - `.prose { width: 720px }` in `src/layouts/BlogPost.astro`
  - `src/components/Header.astro`, `src/styles/global.css`
  - Goal: full, comfortable readability on a phone.

## Bigger feature (speculative): conversational authoring
- [ ] Build a post through a **back-and-forth conversation** with the bot, not one-shot draft→post.
- [ ] **Versioning / revisions** — keep multiple drafts of a post and iterate on them.
- [ ] **Full draft read on mobile** — read the entire draft (not just the ~400-char preview), e.g. a web preview page or paginated Telegram messages.

## Also pending (from the original plan)
- [ ] Connect custom domain `verticalagentsolutions.com` (Pages → Custom domains).
- [ ] Exercise the **weekly maintenance cron** (dedup/overlap + prune/archive) — wired in `.github/workflows/maintenance.yml`, not yet run for real.
- [ ] Voice / image fragments (`bot.ts` currently text-only).
- [ ] Not built (deferred earlier): "re-verify & refresh claims" and "broken-link / stale-stat" maintenance jobs.
