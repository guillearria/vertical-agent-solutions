# Backlog

Status: **fully automated and verified end-to-end** (Jul 2 2026; Telegram made informational-only Jul 12 2026). The daily editor (`editor.yml` → `pipeline/src/editor.ts`, cron 13:17 UTC) reviews the catalog daily and autonomously publishes / improves / archives / skips, reporting to Telegram as a plain notification; failed runs also ping Telegram. All Telegram traffic is outbound-only — no webhook, no bot commands, no inline buttons; undoing an editor action = reverting its commit. All AI runs go through headless Claude Code (`pipeline/src/claude.ts`) on the owner's **Claude Max subscription** (`CLAUDE_CODE_OAUTH_TOKEN` secret) — never metered API billing. The contact form on `/contact` forwards to Telegram (Turnstile + honeypot + rate limit). See `SETUP.md` for architecture.

## Open items

- [ ] **Watch the next 2–3 editor runs** (cron 13:17 UTC) for varied titles/formats now that the de-templating rules are live; the HVAC vertical is uncovered and fair game again.
- [ ] **Improve overall site styling** — broader visual polish beyond the Jul 6 fixes (About-page date removal, mobile-header declutter, article column centering). Candidate areas: typography & vertical rhythm, the default Astro `--accent` blue (`#2337ff` in `src/styles/global.css`) → a real brand palette, the homepage/hero, blog-list cards, and spacing consistency across pages. Owner to iterate later.
- [ ] **Link the custom domain** `verticalagentsolutions.com` — Pages → Custom domains, then flip in one commit: `site` in `astro.config.mjs`, `SITE_URL` Pages/Actions vars, and the Turnstile hostname allowlist. Do this before the SEO checklist below (don't spend link equity on `pages.dev`).
- [ ] **Owner actions — SEO go-live checklist** (in this order, after the domain is linked):
  1. **Google Search Console**: verify via DNS TXT record, submit `sitemap-index.xml`.
  2. **Bing Webmaster Tools**: one-click import from GSC (Bing/DuckDuckGo matter for older small-business demographics).
  3. **Cloudflare Web Analytics**: create the site in the CF dashboard, set `PUBLIC_CF_BEACON_TOKEN` in the Pages build env (the beacon in `BaseHead.astro` is a no-op until then).
- [ ] **Teach the pipeline to tag new posts with `industry:`** — the decider should pick a hub slug from `src/data/industries.ts` (or propose a new one) and the writer should emit an `INDUSTRY:` line that lands in frontmatter. Until then, new posts arrive untagged and get hand-tagged; the improve flow already preserves existing tags (`buildFrontmatter` `opts.industry`).
- [ ] Delete the now-unused `ANTHROPIC_API_KEY` GitHub Actions secret (nothing reads it; `claude.ts` strips it defensively anyway).
- [ ] **Owner actions — retire the interactive-Telegram leftovers** (Jul 12 2026: the webhook, `/draft` flow, and Undo were removed from the code; the cloud side still has their credentials):
  1. Unregister the bot webhook: `curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/deleteWebhook"` (the `/api/telegram` endpoint no longer exists; old inline buttons in chat history will simply do nothing).
  2. Delete GitHub **Actions secrets** `CF_ACCOUNT_ID`, `CF_KV_NAMESPACE_ID`, `CF_API_TOKEN` (the pipeline no longer touches KV).
  3. Delete **Pages env vars** `TELEGRAM_SECRET_TOKEN`, `GITHUB_REPO`, `GITHUB_DISPATCH_TOKEN`, `GITHUB_BRANCH`, and **revoke the fine-grained PAT** behind `GITHUB_DISPATCH_TOKEN` (nothing dispatches or writes via the GitHub API anymore).
  4. Keep the `INBOX_KV` binding + namespace (contact-form rate limiting uses it). Optionally purge stale `frag:` keys (`cand:`/`undo:` keys expire on their own TTLs).
- [ ] **~Jul 2027:** `CLAUDE_CODE_OAUTH_TOKEN` expires — re-run `claude setup-token` and update the secret.

## Done (Jul 3 2026) — de-template the catalog

The catalog had converged on templates (3 of 8 titles on one formula, 6 of 8 descriptions opening "A plain-English guide…", boilerplate "what an agent is" sections). Shipped the planned fix plus additions:

- [x] Writer (`pipeline/src/writer.ts`): anti-template rules in `SYSTEM` (headline structure, description openers, closing headers, format commitment); `catalogNote()` now says "link, don't imitate" and forbids re-explaining "what an agent is" (link the agentic-wave post instead).
- [x] **Variety gate** (addition): `runWriter()` checks every draft's title/description against the catalog in code and retries once with concrete feedback; still-colliding drafts are accepted with a warning rather than failing the run.
- [x] **Formula-agnostic detector** (addition): `pipeline/src/variety.ts` — shared title 4-grams + identical description first-4-words; powers the gate and a computed `Catalog health:` block in the decider prompt.
- [x] Editor (`pipeline/src/editor.ts`): improve_post widened to style-redundancy with retitling allowed (URL/slug never changes; only explicit `TITLE:` lines accepted, so a degenerate parse can't destroy a title); decider picks a `format` per new post (guide, cost/ROI, FAQ, case walkthrough, myth-busting, checklist, comparison) to vary deep structure.
- [x] **Manual `/draft` parity** (addition): `runDraft.ts` now passes the catalog — internal links + the variety gate apply there too.
- [x] One-time cleanup (slugs/URLs and pubDates kept, `updatedDate` set): retitled dental, law, and "why solo and small firms" (realtors keeps the one allowed formula instance); explainer boilerplate replaced with links (dental, realtor, tidy-up); descriptions diversified — detector now reports zero collisions. `manual_cleanup` entries in `editor-log.json` give the touched posts their 14-day cooldown.
- [x] The auto-repair post (published by the Jul 3 editor run, which still ran the pre-rules pipeline and copied the formula a fourth time) got the same treatment before these changes shipped — proof the fix was needed.
- Later, data-driven: once Search Console has impression data, ground improve-vs-new decisions in real queries (feed top/zero-impression pages to the decider).

## Done (Jul 2 2026)

- [x] Turnstile widget + Pages env keys — live and enforced (token-less POSTs rejected; browser submits arrive in Telegram).
- [x] `CLAUDE_CODE_OAUTH_TOKEN` secret added; pipeline migrated off API billing to Max subscription auth.
- [x] First-run verification: CI dry run ✓; real run published the HVAC post ✓; Pages rebuild ✓; Telegram summary ✓; **Undo reverted the post ✓**; contact form → Telegram ✓.

## Ideas (not started)

- [ ] Per-post `heroImage` (would also fix social cards being the generic placeholder).
- [ ] Editor: a periodic "re-verify claims / broken-link" pass on old posts.
