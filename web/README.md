# Rootwell Health — website (Phase 0–1)

A global, low-cost wellness site: group programs, membership plans, regional pricing,
multi-language support, Stripe checkout and a waitlist for clinical care.
"Rootwell Health" is a placeholder brand — search the code for `Rootwell` to rename.

## What's included

| Feature | Where |
|---|---|
| English + Spanish (auto-detected from the browser) | `src/dictionaries/`, `src/proxy.ts` |
| 5 currencies (USD, EUR, GBP, CAD, AUD) picked by country | `src/lib/pricing.ts` |
| Regional pricing: tier B countries pay 60%, tier C 35% (USD) | `src/lib/pricing.ts` (`TIER_MULTIPLIER`) |
| Group programs (one-time) + memberships (monthly) | `src/lib/pricing.ts`, `src/app/[locale]/page.tsx` |
| Stripe Checkout (price always computed on the server) | `src/app/api/checkout/route.ts` |
| Stripe webhook → saves orders | `src/app/api/stripe/webhook/route.ts` |
| Waitlist with consent + spam honeypot → Supabase | `src/app/api/waitlist/route.ts` |
| Clinical tier shown as "coming soon" / waitlist only | `CATALOG.clinical.waitlistOnly` |
| Medical disclaimer, terms, privacy **templates** | `src/lib/legal.ts` (**needs a lawyer**) |
| Mobile-friendly, dark mode, security headers | `src/app/globals.css`, `next.config.ts` |

## Run it locally

```bash
cd web
npm install
npm run dev        # http://localhost:3000
```

Preview another country's pricing: `http://localhost:3000/en?country=BR` (or `IN`, `DE`, `GB`…).

With no environment variables set it runs in **demo mode**: checkout buttons go
straight to a "demo" success page and waitlist sign-ups are only logged.

## Go live (about an hour of setup)

1. **Vercel** — sign up at vercel.com with GitHub → *Add New Project* → pick this repo →
   set **Root Directory** to `web` → Deploy. You now have a live URL. Every push redeploys.
2. **Domain** — Vercel → Project → Settings → Domains → add your domain and follow the DNS steps.
3. **Supabase** — create a project → SQL Editor → paste and run `supabase/schema.sql`.
   Copy the project URL and the `service_role` key into Vercel env vars.
4. **Stripe** — create an account, copy the secret key (start with the *test* key).
   Add a webhook endpoint `https://YOUR-DOMAIN/api/stripe/webhook` for events
   `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   and copy its signing secret. Turn on Stripe Tax and set `STRIPE_AUTOMATIC_TAX=true`.
5. Add all env vars from `.env.example` in Vercel → Settings → Environment Variables → redeploy.
6. Test a purchase with Stripe's test card `4242 4242 4242 4242`, then switch to live keys.

## Before taking real customers

- [ ] Replace the legal templates in `src/lib/legal.ts` with lawyer-reviewed documents.
- [ ] Decide a refund policy (EU/UK customers have a 14-day cooling-off right for many digital services).
- [ ] Choose where members actually get content (course/community platform) and fill in the
      `TODO`s in the Stripe webhook to grant/revoke access and send welcome emails.
- [ ] Review the country tiers and prices in `src/lib/pricing.ts` against your costs.
- [ ] Keep the clinical plan waitlist-only until you have licensed clinicians and a
      HIPAA/GDPR-compliant practice platform (with signed BAAs/DPAs) for that region.

## Common edits

- **Change prices / add a program:** `src/lib/pricing.ts`, then add its text to both files in `src/dictionaries/`.
- **Add a language:** copy `src/dictionaries/es.ts`, translate it, and register it in `src/lib/i18n.ts`.
- **Add a currency:** add it to `CURRENCIES` and give every item a price in it.
