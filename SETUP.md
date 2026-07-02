# Setup — hosting + automated publishing

This wires the repo into the **$0-compute serverless** setup:

- **Cloudflare Pages** — hosts the static Astro site, auto-deploys on every push to `main`.
- **Cloudflare Pages Functions** — `functions/api/telegram.ts` (Telegram webhook: capture, `/list`, `/draft`, Approve/Reject/Archive/Undo) and `functions/api/contact.ts` (contact form → Telegram, Turnstile-protected).
- **GitHub Actions** — the heavy AI work: manual drafting (`draft.yml`) and the **daily autonomous editor** (`editor.yml`).
- **Cloudflare KV** — captured ideas, pending draft candidates, editor undo tokens, contact-form rate limits.

Two publishing paths:

```
Manual (phone):  Telegram idea → /draft → repository_dispatch → Action (Claude + web_search)
                 → candidate in KV → Telegram preview [Approve][Reject]
                 → Approve → Function writes src/content/blog/<slug>.md via GitHub API → live

Autonomous:      editor.yml (daily cron) → editor.ts reviews the catalog → ONE action
                 (new post / improve post / archive / skip) → commit + push → live
                 → Telegram summary with [↩️ Undo] (token in KV, 7-day TTL)
```

The manual path still requires your Approve tap. The daily editor publishes on its own and you supervise after the fact via the Undo button. Hard-coded guards keep it sane: one action per day, a 14-day per-slug cooldown (`pipeline/editor-log.json`), it never archives below 4 active posts nor anything touched in the last 30 days.

---

## One-time setup

### 1. GitHub
The repo is already pushed. Add **Actions secrets** (Settings → Secrets and variables → Actions):

| Secret | Value |
|---|---|
| `ANTHROPIC_API_KEY` | from console.anthropic.com |
| `TELEGRAM_BOT_TOKEN` | from @BotFather |
| `TELEGRAM_OWNER_ID` | your numeric id (from @userinfobot) |
| `CF_ACCOUNT_ID` | Cloudflare → account ID |
| `CF_KV_NAMESPACE_ID` | the KV namespace id from step 2 |
| `CF_API_TOKEN` | Cloudflare API token with **Workers KV Storage: Edit** |

Optionally add a repo **variable** (Settings → Secrets and variables → Actions → Variables): `SITE_URL` = the live base URL (defaults to `https://vertical-agent-solutions.pages.dev` in code).

### 2. Cloudflare — KV + Pages
1. **KV:** Workers & Pages → KV → Create namespace, e.g. `vas-inbox`. Note its **namespace ID** (→ `CF_KV_NAMESPACE_ID`).
2. **Pages:** Workers & Pages → Create → Pages → **Connect to Git** → this repo.
   - Framework preset **Astro**, build command `npm run build`, output dir `dist`.
   - Build var `NODE_VERSION = 22`.
3. **Bind KV to the Pages project:** Pages project → Settings → Functions → **KV namespace bindings** → variable name **`INBOX_KV`** → your namespace.
4. **Pages env vars** (Settings → Environment variables, Production):
   | Var | Value |
   |---|---|
   | `TELEGRAM_BOT_TOKEN` | same bot token |
   | `TELEGRAM_OWNER_ID` | your numeric id |
   | `TELEGRAM_SECRET_TOKEN` | a random string you invent (used in step 4) |
   | `GITHUB_REPO` | `guillearria/vertical-agent-solutions` |
   | `GITHUB_DISPATCH_TOKEN` | fine-grained PAT (step 3) |
   | `GITHUB_BRANCH` | `main` (optional) |
   | `SITE_URL` | `https://vertical-agent-solutions.pages.dev` (optional) |
   | `TURNSTILE_SECRET_KEY` | from step 5 (contact-form spam check; skipped if unset) |
   | `PUBLIC_TURNSTILE_SITE_KEY` | from step 5 — ⚠️ needed at **build** time (Astro inlines it), so set it for the build environment and redeploy |
5. **Turnstile (contact-form spam protection):** Cloudflare dashboard → **Turnstile** → Add widget → hostname `vertical-agent-solutions.pages.dev` (add `verticalagentsolutions.com` later), mode **Managed**. Copy the **Site Key** → `PUBLIC_TURNSTILE_SITE_KEY` and **Secret Key** → `TURNSTILE_SECRET_KEY` (both in the Pages env vars above). Until these are set, the form still works behind the honeypot + rate limit only.
6. **Custom domain (pending):** Pages project → Custom domains → add `verticalagentsolutions.com`. Then flip `site` in `astro.config.mjs`, `DEFAULT_SITE` in `functions/api/telegram.ts`, the `SITE_URL` vars, and the Turnstile hostname.
7. **Avoid wasted builds (optional):** Settings → Builds → Build watch paths → include `src/*` so non-`src` commits don't rebuild.

### 3. GitHub fine-grained PAT (for the Function)
GitHub → Settings → Developer settings → Fine-grained tokens → only this repo →
**Repository permissions: Contents = Read and write** (this also authorizes `repository_dispatch`).
Put it in the Pages `GITHUB_DISPATCH_TOKEN` env var.

### 4. Point Telegram at the webhook
After the first Pages deploy, register the webhook (run locally, substituting values):

```sh
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -d "url=https://vertical-agent-solutions.pages.dev/api/telegram" \
  -d "secret_token=<TELEGRAM_SECRET_TOKEN>"
```

(Switch to the custom-domain URL once it's live.)

---

## Verify end-to-end

1. **Hosting:** push any change → Pages build succeeds → the site, `/blog`, and `/rss.xml` are live.
2. **Capture:** Telegram → send text → `Saved ✓ <id>`. From a different account → `This inbox is private.` `/list` shows recent ideas.
3. **Draft:** `/draft` → "Drafting…" → a preview with title/description/source count + **Approve/Reject** arrives (the `draft` Action run shows web_search calls).
4. **Publish:** tap **Approve** → new file in `src/content/blog/`, Pages redeploys, `Published ✓ <url>`, post is live + in RSS.
5. **Reject:** tap **Reject** on another → `Discarded`, nothing committed.
6. **Daily editor:** Actions tab → run **Daily editor** with `dry_run: true` → check the run log for the decision JSON (nothing pushed). Then run it for real → a commit lands, Pages rebuilds, and a Telegram summary with **↩️ Undo** arrives. Tap Undo → a revert commit lands via the GitHub API.
7. **Contact form:** submit the form on `/about` → a `📬 Contact form` message arrives in Telegram. Fill the hidden "Company" field (or submit 6× in an hour) → silently dropped / rate-limited.

## Local development
- `npm run dev` — site at localhost:4321.
- **Editor dry run:** `cd pipeline && EDITOR_DRY_RUN=1 npx tsx src/editor.ts` with `ANTHROPIC_API_KEY` set (see `pipeline/.env.example`). Prints the decision and writes any draft into the working tree — no push, no KV writes, no Telegram.
- **Functions:** `npm run build && npx wrangler pages dev dist --kv INBOX_KV` serves the site + Functions locally (use Turnstile test keys: site `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`).
