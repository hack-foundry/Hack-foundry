import { NextResponse } from "next/server";
import { getCountry } from "@/lib/geo";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getStripe } from "@/lib/stripe";
import { CATALOG, defaultCurrencyForCountry, isCurrency, isItemId, priceFor, tierForCountry } from "@/lib/pricing";

export async function POST(req: Request) {
  let body: { itemId?: unknown; currency?: unknown; locale?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isItemId(body.itemId)) return NextResponse.json({ error: "Unknown item" }, { status: 400 });
  const item = CATALOG[body.itemId];
  if (item.waitlistOnly) return NextResponse.json({ error: "Not yet available" }, { status: 400 });

  const locale = typeof body.locale === "string" && isLocale(body.locale) ? body.locale : "en";
  // Country (and therefore regional discount) is always decided server-side.
  const country = await getCountry();
  const currency = isCurrency(body.currency) ? body.currency : defaultCurrencyForCountry(country);
  const amount = priceFor(item.id, currency, country);

  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? (host ? `${proto}://${host}` : new URL(req.url).origin)).replace(/\/$/, "");
  const stripe = getStripe();
  if (!stripe) {
    // Demo mode: lets the whole flow be clicked through before Stripe is set up.
    return NextResponse.json({ url: `${base}/${locale}/checkout/success?demo=1`, demo: true });
  }

  const t = getDictionary(locale);
  const name =
    item.kind === "membership"
      ? `Rootwell ${t.pricing.plans[item.id as keyof typeof t.pricing.plans].name}`
      : t.programs.items[item.id as keyof typeof t.programs.items].name;

  const session = await stripe.checkout.sessions.create({
    mode: item.kind === "membership" ? "subscription" : "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount: amount,
          product_data: { name, metadata: { item_id: item.id } },
          ...(item.kind === "membership" ? { recurring: { interval: "month" as const } } : {}),
        },
      },
    ],
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "true" },
    locale: locale === "es" ? "es" : "en",
    metadata: { item_id: item.id, country, tier: tierForCountry(country) },
    success_url: `${base}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/${locale}#pricing`,
  });

  return NextResponse.json({ url: session.url });
}
