# Setup — hosting + phone publishing loop

This wires the repo into the **$0-compute serverless** setup:

- **Cloudflare Pages** — hosts the static Astro site, auto-deploys on every push to `main`.
- **Cloudflare Pages Function** (`functions/api/telegram.ts`) — the Telegram webhook (capture, `/list`, `/draft`, Approve/Reject/Archive).
- **GitHub Actions** — does the heavy AI drafting (`draft.yml`) and weekly catalog maintenance (`maintenance.yml`).
- **Cloudflare KV** — holds captured ideas + pending draft candidates (no git noise, no rebuild on capture).

```
Phone (Telegram) → /api/telegram (Pages Function)
   capture → KV ;  /draft → repository_dispatch → GitHub Action (Claude + web_search)
   → candidate in KV → Telegram preview [Approve][Reject]
   Approve → Function writes src/content/blog/<slug>.md via GitHub API → Pages rebuild → live
```

The flow is **draft → preview → you tap Approve → publish**. Nothing goes live without your tap.

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
   | `SITE_URL` | `https://verticalagentsolutions.com` (optional) |
5. **Custom domain:** Pages project → Custom domains → add `verticalagentsolutions.com` (Cloudflare handles DNS + TLS). Confirm `astro.config.mjs` `site` matches (it does).
6. **Avoid wasted builds (optional):** Settings → Builds → Build watch paths → include `src/*` so non-`src` commits don't rebuild.

### 3. GitHub fine-grained PAT (for the Function)
GitHub → Settings → Developer settings → Fine-grained tokens → only this repo →
**Repository permissions: Contents = Read and write** (this also authorizes `repository_dispatch`).
Put it in the Pages `GITHUB_DISPATCH_TOKEN` env var.

### 4. Point Telegram at the webhook
After the first Pages deploy, register the webhook (run locally, substituting values):

```sh
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -d "url=https://verticalagentsolutions.com/api/telegram" \
  -d "secret_token=<TELEGRAM_SECRET_TOKEN>"
```

(Use the `.pages.dev` URL instead until the custom domain is live.)

---

## Verify end-to-end

1. **Hosting:** push any change → Pages build succeeds → the site, `/blog`, and `/rss.xml` are live.
2. **Capture:** Telegram → send text → `Saved ✓ <id>`. From a different account → `This inbox is private.` `/list` shows recent ideas.
3. **Draft:** `/draft` → "Drafting…" → a preview with title/description/source count + **Approve/Reject** arrives (the `draft` Action run shows web_search calls).
4. **Publish:** tap **Approve** → new file in `src/content/blog/`, Pages redeploys, `Published ✓ <url>`, post is live + in RSS.
5. **Reject:** tap **Reject** on another → `Discarded`, nothing committed.
6. **Maintenance:** Actions tab → run **Catalog maintenance** → Telegram report; tap **Archive** on a suggestion → post gets `archived: true`, drops out of the index/RSS after rebuild (file kept).

## Local development
- `npm run dev` — site at localhost:4321.
- `pipeline`: `npm run bot` (long-polling, no webhook needed) and `npm run draft [id]` still work against the filesystem `inbox/`, using `pipeline/.env`.
