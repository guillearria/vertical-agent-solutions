# Backlog

Status: **fully automated.** The daily editor (`editor.yml` → `pipeline/src/editor.ts`) reviews the catalog every day and autonomously publishes / improves / archives / skips, reporting to Telegram with an Undo button. The manual phone → `/draft` → Approve flow still works alongside it. Contact form on `/about` forwards to Telegram. See `SETUP.md` for architecture.

## Needs a one-time manual step (Cloudflare dashboard)
- [ ] **Turnstile keys** — create the widget and set `PUBLIC_TURNSTILE_SITE_KEY` (build-time) + `TURNSTILE_SECRET_KEY` in the Pages env (SETUP.md § Cloudflare step 5). Dashboard gotcha: after typing `vertical-agent-solutions.pages.dev` in the hostname field you must confirm it (press Enter / pick the suggestion) so it appears as a list entry below the field — otherwise Create fails with "At least 1 hostname must be added". `pages.dev` subdomains are supported. Until the keys are set the contact form relies on honeypot + rate limit only.
- [ ] **Connect custom domain** `verticalagentsolutions.com` (Pages → Custom domains), then flip `site` in `astro.config.mjs`, `DEFAULT_SITE` in `functions/api/telegram.ts`, `SITE_URL` vars, and the Turnstile hostname.

## First-run verification
- [x] **Dry run passed** (Jul 2 2026): decision call chose `new_post` (dental vertical), full draft produced in the runner, nothing pushed.
- [ ] **Real editor run** — blocked on Anthropic API credits (console.anthropic.com → Plans & Billing). Once topped up: `gh workflow run editor.yml` (or Actions → Daily editor → Run), then confirm the commit, the Pages rebuild, the Telegram summary, and that **Undo** reverts. Failures now ping Telegram.
- [ ] Submit the contact form on `/about` **from a browser** (Turnstile challenge required — curl without a token is correctly rejected) and confirm the Telegram message.
- [ ] Submit the site to **Google Search Console** (verification meta/DNS) now that robots.txt, sitemap, and JSON-LD are in place.

## Ideas (not started)
- [ ] Per-post `heroImage` (would also fix social cards being the generic placeholder).
- [ ] Analytics (Plausible/Fathom or Cloudflare Web Analytics).
- [ ] Voice / image fragments in the Telegram capture flow (text-only today).
- [ ] Conversational multi-turn authoring; draft versioning/revisions.
- [ ] Editor: a periodic "re-verify claims / broken-link" pass on old posts.
