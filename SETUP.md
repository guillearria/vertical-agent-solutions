# Setup — hosting + automated publishing

This wires the repo into the **$0-compute serverless** setup:

- **Cloudflare Pages** — hosts the static Astro site, auto-deploys on every push to `main`.
- **Cloudflare Pages Functions** — `functions/api/contact.ts` (contact form → Telegram, Turnstile-protected).
- **GitHub Actions** — the heavy AI work: the **daily autonomous editor** (`editor.yml`). All model calls run through headless Claude Code on the owner's **Claude Max subscription** (`CLAUDE_CODE_OAUTH_TOKEN`), not metered API credits.
- **Cloudflare KV** — contact-form rate-limit counters only.

Telegram is **outbound-only and purely informational**: the editor reports what it did, the workflow alerts on failure, and the contact form forwards messages. There is no webhook, no bot commands, and no interactive buttons. Supervision happens in git — every editor action is a single commit, so undoing one is `git revert`.

One publishing path:

```
Autonomous:      editor.yml (daily cron) → editor.ts reviews the catalog → ONE action
                 (new post / improve post / archive / skip) → commit + push → live
                 → plain Telegram summary
```

The daily editor publishes on its own and you supervise after the fact. Hard-coded guards keep it sane: one action per day, a 14-day per-slug cooldown (`pipeline/editor-log.json`), it never archives below 4 active posts nor anything touched in the last 30 days.

Anti-template safeguards (`pipeline/src/variety.ts`): every draft is checked in code against the catalog for reused title phrasing and repeated description openers, and retried once with feedback if it collides; the decider is shown a computed `Catalog health:` block and picks a per-post article format; `improve_post` may retitle a templated post (the slug/URL never changes, and the Telegram summary shows the retitle).

---

## One-time setup

### 1. GitHub
The repo is already pushed. Add **Actions secrets** (Settings → Secrets and variables → Actions):

| Secret | Value |
|---|---|
| `CLAUDE_CODE_OAUTH_TOKEN` | run `claude setup-token` locally (needs the Claude Max/Pro subscription) and paste the token — AI runs bill the subscription, not API credits. Expires after ~1 year |
| `TELEGRAM_BOT_TOKEN` | from @BotFather |
| `TELEGRAM_OWNER_ID` | your numeric id (from @userinfobot) |

Optionally add a repo **variable** (Settings → Secrets and variables → Actions → Variables): `SITE_URL` = the live base URL (defaults to `https://vertical-agent-solutions.pages.dev` in code).

### 2. Cloudflare — Pages + KV
1. **Pages:** Workers & Pages → Create → Pages → **Connect to Git** → this repo.
   - Framework preset **Astro**, build command `npm run build`, output dir `dist`.
   - Build var `NODE_VERSION = 22`.
2. **KV (contact-form rate limiting):** Workers & Pages → KV → Create namespace, e.g. `vas-inbox`. Bind it to the Pages project: Settings → Functions → **KV namespace bindings** → variable name **`INBOX_KV`** → your namespace.
3. **Pages env vars** (Settings → Environment variables, Production):
   | Var | Value |
   |---|---|
   | `TELEGRAM_BOT_TOKEN` | same bot token |
   | `TELEGRAM_OWNER_ID` | your numeric id |
   | `TURNSTILE_SECRET_KEY` | from step 4 (contact-form spam check; skipped if unset) |
   | `PUBLIC_TURNSTILE_SITE_KEY` | from step 4 — ⚠️ needed at **build** time (Astro inlines it), so set it for the build environment and redeploy |
4. **Turnstile (contact-form spam protection):** Cloudflare dashboard → **Turnstile** → Add widget → hostname `vertical-agent-solutions.pages.dev` (add `verticalagentsolutions.com` later), mode **Managed**. ⚠️ Type the hostname, then **press Enter / pick the suggestion** so it becomes a list entry under the field — if the text isn't confirmed, Create fails with "At least 1 hostname must be added" (`pages.dev` subdomains are supported). Copy the **Site Key** → `PUBLIC_TURNSTILE_SITE_KEY` and **Secret Key** → `TURNSTILE_SECRET_KEY` (both in the Pages env vars above). Until these are set, the form still works behind the honeypot + rate limit only.
5. **Custom domain (pending):** Pages project → Custom domains → add `verticalagentsolutions.com`. Then flip `site` in `astro.config.mjs`, the `SITE_URL` vars, and the Turnstile hostname.
6. **Avoid wasted builds (optional):** Settings → Builds → Build watch paths → include `src/*` so non-`src` commits don't rebuild.

### 3. Telegram bot
Create the bot with @BotFather; the token is only ever used to **send** messages. The bot must have **no webhook registered** — if one exists from an earlier setup, remove it:

```sh
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/deleteWebhook"
```

---

## Verify end-to-end

1. **Hosting:** push any change → Pages build succeeds → the site, `/blog`, and `/rss.xml` are live.
2. **Daily editor:** Actions tab → run **Daily editor** with `dry_run: true` → check the run log for the decision JSON (nothing pushed). Then run it for real → a commit lands, Pages rebuilds, and a plain Telegram summary arrives (no buttons). To undo an action, revert its commit.
3. **Contact form:** submit the form on `/contact` → a `📬 Contact form` message arrives in Telegram. Fill the hidden "Company" field (or submit 6× in an hour) → silently dropped / rate-limited.

## Local development
- `npm run dev` — site at localhost:4321.
- **Editor dry run:** `cd pipeline && EDITOR_DRY_RUN=1 npx tsx src/editor.ts` — uses the logged-in `claude` CLI (subscription auth; no API key). Prints the decision and writes any draft into the working tree — no push, no Telegram.
- **Functions:** `npm run build && npx wrangler pages dev dist --kv INBOX_KV` serves the site + contact form locally (use Turnstile test keys: site `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`).
