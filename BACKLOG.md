# Backlog

Status: **fully automated and verified end-to-end** (Jul 2 2026; Telegram made informational-only Jul 12 2026). The daily editor (`editor.yml` → `pipeline/src/editor.ts`, cron 13:17 UTC) reviews the catalog daily and autonomously publishes / improves / archives / skips, reporting to Telegram as a plain notification; failed runs also ping Telegram. All Telegram traffic is outbound-only — no webhook, no bot commands, no inline buttons; undoing an editor action = reverting its commit. All AI runs go through headless Claude Code (`pipeline/src/claude.ts`) on the owner's **Claude Max subscription** (`CLAUDE_CODE_OAUTH_TOKEN` secret) — never metered API billing. The contact form on `/contact` forwards to Telegram (Turnstile + honeypot + rate limit). See `SETUP.md` for architecture.

## Open items

- [x] **Design floor: the footer needs a repo link** — **done 2026-09-13**: `.fine` now reads `… Built and supervised by [author] · Project code on [GitHub]` via a new `REPO_URL` in `src/consts.ts`. *Original note:* A
  deterministic floor checker now grades the three public sites in this portfolio on the same
  fifteen required elements. This site scores **one must-fail**, and it is the only one:
  **F8 — the footer must carry a link to the project's own source repo.** The ruled floor is a
  one-line footer `Project code on [GitHub] · Built by [Guillermo Arria-Devoe]`; a **richer
  footer like this site's is an explicitly permitted superset — but only if the repo link is
  present**, and today `Footer.astro`'s `.fine` line carries the author link and no repo link.
  Fix: add one `<a>` to the repo in `src/components/Footer.astro` (either in `.fine` beside the
  author link or as a `footer-links` entry). Nothing else about this footer changes — it was
  reviewed and is the reference for the rest of the portfolio. This site is otherwise at 14/15
  and was the donor the standard was extracted from.
- [x] **Three source comments point at a file in a different, private repo** — **done 2026-09-13**: the path is gone from all three comments; the bare `TODO: add LinkedIn URL once live` stays. *Original note: found by a
  portfolio sweep 2026-09-11, low severity, three-line fix.* `src/components/Footer.astro:25`,
  `src/pages/about.astro:59`, and `src/pages/how-this-site-writes-itself.astro:79` each carry
  `{/* TODO: add LinkedIn URL once live — see <path in a private repo> */}`. They are
  compile-time JSX comments, so **nothing reaches the rendered HTML and no visitor ever sees
  them** (verified against the deployed page). Two reasons to clean them up anyway: this is a
  **public** repo and the comment names an internal path in a **private** one, and the house
  rule across this portfolio is that a document may name another repo but must never depend on
  a file path inside one — paths break silently when the other repo reorganises. Fix: keep the
  TODO, drop the path — `{/* TODO: add LinkedIn URL once live */}`. Present since 2026-08-05.
- [x] ~~**One-line cutover, later.** When the portfolio's front-door site goes live, the footer's
  author link (`AUTHOR_URL` in `src/consts.ts`) changes from the GitHub profile to the front
  door.~~ **Retired 2026-09-13** — there will be no front-door site; the GitHub profile is the
  hub and `AUTHOR_URL` stays exactly where it is. Nothing to do.

- [x] **Sort `rss.xml` newest-first** — **done Aug 5 2026**: feed now sorts by `pubDate` (descending) after the `archived` filter. Remaining quirk: `pubDate`s are date-only (midnight GMT), so same-day ordering is undefined — harmless at one post/day.
- [x] ~~**Watch the next 2–3 editor runs** for varied titles/formats now that the de-templating rules are live.~~ **Closed 2026-09-13** by the full-catalog sweep below: the decider's format rotation is even (all seven formats, four times each, in the last 30 runs) and the four title clusters the detector still reported were topic-noun phrases, not formulas.
- [ ] **Improve overall site styling** — broader visual polish beyond the Jul 6 fixes (About-page date removal, mobile-header declutter, article column centering). Candidate areas: typography & vertical rhythm, the default Astro `--accent` blue (`#2337ff` in `src/styles/global.css`) → a real brand palette, the homepage/hero, blog-list cards, and spacing consistency across pages. Owner to iterate later.
- [ ] **Link the custom domain** `verticalagentsolutions.com` — Pages → Custom domains, then flip in one commit: `site` in `astro.config.mjs`, `SITE_URL` Pages/Actions vars, and the Turnstile hostname allowlist. **No longer gates analytics** (2026-09-14): that ordering held Search Console back for two months. When the domain lands, add it as a second Search Console property; a 301 from `pages.dev` carries the equity.
- [ ] **Owner actions — analytics: two switches, both dashboard-only** (re-ordered 2026-09-14; the site has had **zero measurement** since launch, and two web-search probes on Sep 13 found no page of the site indexed):
  1. **Cloudflare Web Analytics**: Pages project → Metrics → **Enable Web Analytics**. One click; Cloudflare injects its beacon on the next deploy (the manual `PUBLIC_CF_BEACON_TOKEN` path was removed from `BaseHead.astro`).
  2. **Google Search Console**: add a **URL-prefix** property for `https://vertical-agent-solutions.pages.dev/`, choose the **HTML tag** method, set `PUBLIC_GSC_VERIFICATION` in the Pages build env to the tag's `content` value, redeploy, Verify, then submit `sitemap-index.xml`. This answers "are we indexed" within days.
  3. **Bing Webmaster Tools**: one-click import from Search Console (Bing/DuckDuckGo matter for older small-business demographics).
  4. The Pages project's **Metrics** tab already shows raw request counts today, bots included; a crude signal until 1 and 2 are on.
- [x] ~~**Teach the pipeline to tag new posts with `industry:`**~~ **Done 2026-09-14**, differently from the original note: the twelve per-vertical hubs became **nine sector hubs** in `lib/industries.ts` (one post per vertical made every hub a one-post page, and 0 of 42 posts since August were tagged). All 74 on-vertical posts are backfilled, old hub URLs 301 via `public/_redirects`, and the decider sets `industry` on every `new_post` from the fixed list (unknown slugs are dropped, not skipped).
- [x] Delete the now-unused `ANTHROPIC_API_KEY` GitHub Actions secret (nothing reads it; `claude.ts` strips it defensively anyway). **Done Aug 5 2026.**
- [x] **Owner actions — retire the interactive-Telegram leftovers** — **completed Aug 5 2026** (Jul 12 2026: the webhook, `/draft` flow, and Undo were removed from the code; the cloud-side credentials are now all gone too):
  1. ~~Unregister the bot webhook~~ — **done Aug 5 2026**: `deleteWebhook` returned ok and `getWebhookInfo` now shows no URL. (Old inline buttons in chat history simply do nothing.)
  2. ~~Delete GitHub **Actions secrets** `CF_ACCOUNT_ID`, `CF_KV_NAMESPACE_ID`, `CF_API_TOKEN`~~ — **done Aug 5 2026** (only `CLAUDE_CODE_OAUTH_TOKEN`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_OWNER_ID` remain). The KV-scoped API token itself was found already gone (Aug 5 2026: no token in the account carries Workers KV Storage — nothing left to revoke; the remaining "vertical-agent-solutions build token" is Cloudflare's own Pages build token, leave it).
  3. ~~Delete **Pages env vars** `TELEGRAM_SECRET_TOKEN`, `GITHUB_REPO`, `GITHUB_DISPATCH_TOKEN`, `GITHUB_BRANCH`~~ — **done Aug 5 2026.** The fine-grained PAT behind `GITHUB_DISPATCH_TOKEN` — **revoked Aug 5 2026**.
  4. Keep the `INBOX_KV` binding + namespace (contact-form rate limiting uses it). Optionally purge stale `frag:` keys (`cand:`/`undo:` keys expire on their own TTLs).
- [ ] **Audience loop (designed 2026-09-14, not started; needs 4–8 weeks of analytics first).** A weekly zero-LLM Action pulls Cloudflare Web Analytics through the GraphQL API (`rumPageloadEventsAdaptiveGroups`, needs an API token plus the property's `siteTag`) and Search Console's Search Analytics API (service-account JSON), and commits a small `pipeline/audience.json`: per-post 28-day views, impressions, clicks, top queries. Two consumers: (1) the decider gets an `Audience:` block beside `Catalog health:` so improve-vs-new is grounded in real queries (the note under "Done Jul 3" already asks for this); (2) a monthly LLM "audience review" reads the file and posts five suggestions to Telegram, informational only. Gate: the decider only sees the block above a floor of a few hundred sessions, or it will optimize noise. One more routine against the portfolio budget; keep the weekly pull LLM-free.
- [ ] **~Jul 2027:** `CLAUDE_CODE_OAUTH_TOKEN` expires — re-run `claude setup-token` and update the secret.

## Done (Sep 13–14 2026) — full-catalog sweep

A 78-post sweep (statistical, plus two posts read in full) found zero broken internal links, no description over the snippet limit, the stock AI-slop tells essentially absent, and even format rotation. The problems were structural, and each got a fix:

- [x] **Em-dashes.** 464 of 475 body em-dashes sat in the 39 posts published before the Aug 5 rule; every post since Aug 15 had zero. Five titles carried one. A one-time targeted copy-edit through the same headless Claude Code (subscription auth; only sentences containing an em-dash could change, with code checks on em-dash count, word count within 8%, header count, identical link set, and the variety gate on retitles) cleaned **37 posts** and retitled **four (three keep their original wording with the dash swapped for a colon or comma, restored by hand after the model over-rotated; the small-law-firm post got a new question title)**; **0 skipped** after failing a check twice. The daily improve slot would never have drained this (28 new / 2 improve / 0 skip in the last 30 runs).
- [x] **Sector hubs + tagging** — see the open-items entry above.
- [x] **Primer-link boilerplate.** 68 of 78 posts linked the agentic-wave primer, mostly as a parenthetical in the opening paragraph and about 20 with the same "plain-English version of what an agent even is" sentence — invisible to the detector, which only reads titles and descriptions. The post layout now links the primer once ("New to AI agents?"); the pointer sentence was stripped from all 68 bodies (13 by hand); the writer no longer sees the primer in its link list and is told never to link it.
- [x] **Detector false positives.** Four title clusters were all topic-noun phrases ("an AI phone agent", "what does an AI"). `variety.ts` now ignores 4-grams made only of topic vocabulary; the real two-post "put an AI agent on" echo is still reported.
- [x] **Three June posts** (two on Claude Code, one on personal wealth) archived as off-vertical.
- [x] **Dead sources.** Of 667 cited URLs, six were truly dead (two more were probe false positives from a trimmed trailing period): four re-pointed to Wayback/PRWeb/CMS equivalents, two dropped. 128 URLs return 403 to curl from bot-blocking hosts (bls.gov, fcc.gov, hhs.gov…), so any future link checker needs a browser user-agent and a 403 allowlist.
- [x] **Description openers.** The one real opener collision ("Hour by hour through…", three posts) reworded.
- [x] **Latent pipeline bug, found by the cleanup:** `frontmatterValue` stripped outer quotes but not JSON escapes, so a title or description containing a double quote would be escaped twice on its next write. Fixed in `posts.ts`; one description repaired.
- Left alone, noted: the same legal facts recur in near-identical wording across posts (FCC's Feb 2024 AI-voice ruling in 7, HIPAA business-associate in 10); word counts drifted to ~1,030 in Aug/Sep against a 600–900 rule; "actually" appears 118 times across 60 posts, falling from 1.8/post in July to 0.9 in September.

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
- [ ] Editor: a periodic "re-verify claims / broken-link" pass on old posts. A one-off probe ran 2026-09-13 (see the sweep above): use a browser user-agent, treat 403 from government/legal hosts as alive, and check the exact URL string (a trimmed trailing period produced two false 404s).
