# MODIT Ecommerce Store

Static MODIT construction-material ecommerce storefront with a lightweight Node backend for:

- `GET /api/market-signals` - sponsored material market signals.
- `POST /api/chat` - Modit AI demo assistant replies.
- `GET /api/config` - public runtime config for WhatsApp and lead capture.
- `POST /api/leads` - RFQ, contact, checkout and WhatsApp handoff lead capture.

The site still works as static HTML, but the API-backed mode should be used for customer demos.

## Run

```bash
cd "R:\Modit Admin\ecommerce-store"
npm start
```

Open:

```text
http://127.0.0.1:8765
```

No npm install is required because the backend uses Node built-in modules only.

## Deploy On Vercel

This repo is ready for a static Vercel deploy:

- Root pages are static HTML/CSS/JS.
- `api/market-signals.js` serves the market feed.
- `api/chat.js` serves the Modit AI demo reply endpoint.
- `api/leads.js` forwards website leads to the configured webhook.

Deploy with the Vercel CLI or import the repo in the Vercel dashboard. No build step is required.

## Production Lead Setup

Create these Vercel environment variables before relying on live lead capture:

```text
MODIT_WHATSAPP_PHONE=91XXXXXXXXXX
LEADS_WEBHOOK_URL=https://your-crm-or-automation-webhook
LEADS_WEBHOOK_SECRET=optional-shared-secret
LEADS_WEBHOOK_LABEL=Google Sheet / CRM / Make / Zapier
```

`/api/leads` sends one JSON object per request with `id`, `createdAt`, `type`, `source`, `customer`, `message`, `fields`, `cart`, `totals`, and `meta`. In local development, when no webhook is configured, leads are written to `.tmp/leads.jsonl`.

## Test

```bash
npm run check
```

## Structure

```text
index.html              Home page
shop.html               Product listing and filters
product-detail.html     Product detail page
cart.html               LocalStorage cart
checkout.html           Demo checkout form
about.html              Company page
contact.html            Contact page
cement-delivery-noida.html Local cement supply landing page
electrical-materials-noida.html Local electrical supply landing page
plumbing-materials-noida.html Local plumbing supply landing page
contractor-bulk-material-supply-bihar.html Bihar bulk supply waitlist page
robots.txt              Basic crawl rules for public static deployment
css/style.css           Shared styling
js/app.js               Product/cart/market/chat frontend logic
api/data/market-signals.json API-backed market data feed
api/data/ai-knowledge-bank.json AI procurement and estimator knowledge bank
api/config.js           Public runtime config endpoint
api/leads.js            Lead forwarding endpoint
server.js               Static server and API endpoints
```

## Notes

- Product data is still embedded in `js/app.js`.
- Cart state is browser `localStorage` under `modit_cart`.
- Market signals are demo procurement-planning estimates, not guaranteed final selling prices.
- The homepage now includes pincode coverage checks, a BOQ estimator, bulk RFQ handoff and local supply landing pages for SEO-driven demand capture.
- Production lead persistence requires `LEADS_WEBHOOK_URL`; otherwise local development writes `.tmp/leads.jsonl` and Vercel returns an accepted but undelivered lead response.
- The AI knowledge bank is packaged with the API functions and is not intended to be served directly as public static JSON.
- Modit AI is currently deterministic backend logic. Production AI should connect this endpoint to a secure LLM backend with catalog retrieval and human handoff.
