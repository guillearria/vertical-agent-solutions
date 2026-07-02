# Backlog

Status: **fully automated and verified end-to-end** (Jul 2 2026). The daily editor (`editor.yml` → `pipeline/src/editor.ts`, cron 13:17 UTC) reviews the catalog daily and autonomously publishes / improves / archives / skips, reporting to Telegram with an Undo button; failed runs also ping Telegram. All AI runs go through headless Claude Code (`pipeline/src/claude.ts`) on the owner's **Claude Max subscription** (`CLAUDE_CODE_OAUTH_TOKEN` secret) — never metered API billing. The manual phone → `/draft` → Approve flow works alongside it. The contact form on `/about` forwards to Telegram (Turnstile + honeypot + rate limit). See `SETUP.md` for architecture.

## Next iteration — de-template the catalog (planned, detailed)

Analysis (Jul 2 2026): the catalog has converged on templates — 3 of 8 titles use the "AI Agents for X: Where They (Actually) Help (and Where They Don't/Bite)" formula (realtors, law firms, dental), 6 of 8 descriptions open with "A plain-English guide…", three vertical posts re-explain "what an agent is" even though the agentic-wave post exists as the canonical explainer, and both Claude Code posts contain a "What Claude Code actually is" section. The root causes are in the pipeline, so the problem compounds with every new post:

- the decider prompt says "prefer breadth", so cleanup is structurally undervalued;
- the writer prompt has no anti-template rules, and the internal-link catalog shows it the existing titles, which it pattern-matches (the HVAC post — since undone — copied the formula verbatim);
- `improve_post` **cannot change a title at all**: `execute()` in `editor.ts` force-keeps `target.title`, so the pipeline can never fix a redundant title on its own.

Context: the HVAC post (`e0edbf8`) was reverted via Undo testing (`dfea7a5`) — the vertical is uncovered again; let the editor redo it *after* the rules below land. `pipeline/editor-log.json` still holds its cooldown entry (harmless — the slug no longer exists).

Implementation order:

1. **Writer prompt (`pipeline/src/writer.ts` — `SYSTEM` + `catalogNote()`)**
   - [ ] Anti-template rules: vary headline structure against the catalog shown; never reuse another post's title formula; vary description openers (no third "A plain-English guide…").
   - [ ] Never re-explain "what an agent is" — link `/blog/the-agentic-wave-is-not-just-for-tech/` instead (explicit instruction in `catalogNote`).
   - [ ] Vary the closing-section header (currently converges on "One concrete first step" variants).
2. **Allow retitling on improve (`pipeline/src/editor.ts`)**
   - [ ] In the improve_post branch of `execute()`, drop the forced `title: target.title` — accept the writer's revised title. The slug/URL never changes (title and slug are independent), so this is SEO-safe; undo already stores full `prevContent`.
   - [ ] In `DECIDER_SYSTEM`, widen improve_post: thin/stale/weak **or style-redundant** (templated title, boilerplate sections); say explicitly that retitling is allowed and the URL stays.
3. **Computed redundancy signal (`pipeline/src/editor.ts` — `decide()`)**
   - [ ] In code (not prompt trust), count title-formula collisions (e.g., "Where They … Help" pattern / shared long prefixes) and description-opener collisions; append a `Catalog health:` block to the decider's user prompt so redundancy is a fact in front of it, not an inference it must make.
4. **One-time manual cleanup pass (content only — keep every slug/URL)**
   - [ ] Retitle the dental post (youngest formula post, least indexed) with a different structure; optionally one of realtor/law too, keeping one instance of the formula is fine.
   - [ ] Retitle "Why solo and small firms are the right target" — meaningless standalone (no "AI", no "law" in the title).
   - [ ] Replace the "what an agent is" boilerplate in the realtor/law/dental bodies with a one-line link to the agentic-wave post.
   - [ ] Diversify the "A plain-English guide…" descriptions (each should read like a distinct search snippet).
5. **Verification**
   - [ ] `cd pipeline && npx tsc --noEmit`; root `npm run build`; `EDITOR_DRY_RUN=1 npx tsx src/editor.ts` and confirm the decider input contains the catalog-health block; watch the next 2–3 real runs for varied titles.
6. **Later, data-driven:** once Search Console has impression data, ground improve-vs-new decisions in real queries (feed top/zero-impression pages to the decider).

## Open items

- [ ] Submit the site to **Google Search Console** (verification meta/DNS) — robots.txt, sitemap, and JSON-LD are ready.
- [ ] **Connect custom domain** `verticalagentsolutions.com` (Pages → Custom domains), then flip `site` in `astro.config.mjs`, `DEFAULT_SITE` in `functions/api/telegram.ts`, `SITE_URL` vars, and the Turnstile hostname.
- [ ] Delete the now-unused `ANTHROPIC_API_KEY` GitHub Actions secret (nothing reads it; `claude.ts` strips it defensively anyway).
- [ ] **~Jul 2027:** `CLAUDE_CODE_OAUTH_TOKEN` expires — re-run `claude setup-token` and update the secret.

## Done (Jul 2 2026)

- [x] Turnstile widget + Pages env keys — live and enforced (token-less POSTs rejected; browser submits arrive in Telegram).
- [x] `CLAUDE_CODE_OAUTH_TOKEN` secret added; pipeline migrated off API billing to Max subscription auth.
- [x] First-run verification: CI dry run ✓; real run published the HVAC post ✓; Pages rebuild ✓; Telegram summary ✓; **Undo reverted the post ✓**; contact form → Telegram ✓.

## Ideas (not started)

- [ ] Per-post `heroImage` (would also fix social cards being the generic placeholder).
- [ ] Analytics (Plausible/Fathom or Cloudflare Web Analytics).
- [ ] Voice / image fragments in the Telegram capture flow (text-only today).
- [ ] Conversational multi-turn authoring; draft versioning/revisions.
- [ ] Editor: a periodic "re-verify claims / broken-link" pass on old posts.
