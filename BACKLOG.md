# Backlog

Status: **fully automated.** The daily editor (`editor.yml` → `pipeline/src/editor.ts`) reviews the catalog every day and autonomously publishes / improves / archives / skips, reporting to Telegram with an Undo button. The manual phone → `/draft` → Approve flow still works alongside it. Contact form on `/about` forwards to Telegram. See `SETUP.md` for architecture.

## Needs a one-time manual step (Cloudflare dashboard)
- [ ] **Turnstile keys** — create the widget and set `PUBLIC_TURNSTILE_SITE_KEY` (build-time) + `TURNSTILE_SECRET_KEY` in the Pages env (SETUP.md § Cloudflare step 5). Until then the contact form relies on honeypot + rate limit only.
- [ ] **Update Pages env `SITE_URL`** to `https://vertical-agent-solutions.pages.dev` (it may still point at the unconnected custom domain).
- [ ] **Connect custom domain** `verticalagentsolutions.com` (Pages → Custom domains), then flip `site` in `astro.config.mjs`, `DEFAULT_SITE` in `functions/api/telegram.ts`, `SITE_URL` vars, and the Turnstile hostname.

## First-run verification (once pushed)
- [ ] Run **Daily editor** via `workflow_dispatch` with `dry_run: true`, then for real; confirm the commit, the Pages rebuild, the Telegram summary, and that **Undo** reverts.
- [ ] Submit the contact form on `/about` and confirm the Telegram message.
- [ ] Submit the site to **Google Search Console** (verification meta/DNS) now that robots.txt, sitemap, and JSON-LD are in place.

## Ideas (not started)
- [ ] Per-post `heroImage` (would also fix social cards being the generic placeholder).
- [ ] Analytics (Plausible/Fathom or Cloudflare Web Analytics).
- [ ] Voice / image fragments in the Telegram capture flow (text-only today).
- [ ] Conversational multi-turn authoring; draft versioning/revisions.
- [ ] Editor: a periodic "re-verify claims / broken-link" pass on old posts.
