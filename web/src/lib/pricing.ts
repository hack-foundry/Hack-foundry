/**
 * Pricing catalog + regional (purchasing-power) pricing.
 *
 * Prices are set explicitly per currency (not FX-converted) so they look clean
 * in each market. Countries that pay in USD outside the high-income tier get an
 * automatic discount based on their pricing tier.
 *
 * All amounts are in the currency's minor unit (cents, pence...).
 */

export const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"] as const;
export type Currency = (typeof CURRENCIES)[number];

export type ItemId =
  | "community"
  | "coaching"
  | "clinical"
  | "gut-reset"
  | "metabolic-balance"
  | "energy-foundations";

export type CatalogItem = {
  id: ItemId;
  kind: "membership" | "program";
  /** Clinical services are waitlist-only until licensed clinicians are onboarded per region. */
  waitlistOnly?: boolean;
  prices: Record<Currency, number>;
};

export const CATALOG: Record<ItemId, CatalogItem> = {
  community: {
    id: "community",
    kind: "membership",
    prices: { USD: 1900, EUR: 1900, GBP: 1600, CAD: 2500, AUD: 2900 },
  },
  coaching: {
    id: "coaching",
    kind: "membership",
    prices: { USD: 7900, EUR: 7500, GBP: 6500, CAD: 9900, AUD: 11900 },
  },
  clinical: {
    id: "clinical",
    kind: "membership",
    waitlistOnly: true,
    prices: { USD: 19900, EUR: 18900, GBP: 16500, CAD: 26900, AUD: 29900 },
  },
  "gut-reset": {
    id: "gut-reset",
    kind: "program",
    prices: { USD: 14900, EUR: 13900, GBP: 11900, CAD: 19900, AUD: 22900 },
  },
  "metabolic-balance": {
    id: "metabolic-balance",
    kind: "program",
    prices: { USD: 19900, EUR: 18900, GBP: 15900, CAD: 26900, AUD: 29900 },
  },
  "energy-foundations": {
    id: "energy-foundations",
    kind: "program",
    prices: { USD: 12900, EUR: 11900, GBP: 9900, CAD: 16900, AUD: 19900 },
  },
};

export const MEMBERSHIPS: ItemId[] = ["community", "coaching", "clinical"];
export const PROGRAMS: ItemId[] = ["gut-reset", "metabolic-balance", "energy-foundations"];

export function isItemId(v: unknown): v is ItemId {
  return typeof v === "string" && v in CATALOG;
}

export function isCurrency(v: unknown): v is Currency {
  return typeof v === "string" && (CURRENCIES as readonly string[]).includes(v);
}

/* ---------------- Regional tiers ---------------- */

export type Tier = "A" | "B" | "C";

/** Discount multiplier applied to USD prices by tier. Tune these to your margins. */
export const TIER_MULTIPLIER: Record<Tier, number> = { A: 1, B: 0.6, C: 0.35 };

// High-income markets (full price).
const TIER_A = new Set([
  "US", "CA", "GB", "IE", "AU", "NZ", "DE", "FR", "NL", "BE", "LU", "AT", "CH",
  "DK", "SE", "NO", "FI", "IS", "IT", "ES", "PT", "JP", "KR", "SG", "HK", "TW",
  "IL", "AE", "QA", "KW", "SA", "BH",
]);

// Upper-middle-income markets.
const TIER_B = new Set([
  "PL", "CZ", "SK", "HU", "SI", "HR", "EE", "LV", "LT", "GR", "CY", "MT", "RO",
  "BG", "CL", "UY", "CR", "PA", "MX", "BR", "AR", "MY", "TH", "TR", "ZA", "CN",
  "OM", "RS",
]);

/** Everything else (lower and lower-middle income) is tier C. */
export function tierForCountry(country: string | null | undefined): Tier {
  if (!country) return "A";
  const c = country.toUpperCase();
  if (TIER_A.has(c)) return "A";
  if (TIER_B.has(c)) return "B";
  return "C";
}

const EUROZONE = new Set([
  "AT", "BE", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "LV", "LT",
  "LU", "MT", "NL", "PT", "SK", "SI", "ES",
]);

export function defaultCurrencyForCountry(country: string | null | undefined): Currency {
  const c = (country ?? "").toUpperCase();
  if (c === "GB") return "GBP";
  if (c === "CA") return "CAD";
  if (c === "AU") return "AUD";
  if (EUROZONE.has(c)) return "EUR";
  return "USD";
}

/**
 * The single source of truth for what a customer pays. Used both to display
 * prices and (server-side) to build the Stripe checkout, so the client can never
 * choose its own price.
 */
export function priceFor(itemId: ItemId, currency: Currency, country: string | null): number {
  const base = CATALOG[itemId].prices[currency];
  if (currency !== "USD") return base;
  const mult = TIER_MULTIPLIER[tierForCountry(country)];
  if (mult === 1) return base;
  // Round to a whole dollar, minimum $5.
  return Math.max(500, Math.round((base * mult) / 100) * 100);
}

export function formatMoney(amountMinor: number, currency: Currency, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: amountMinor % 100 === 0 ? 0 : 2,
  }).format(amountMinor / 100);
}
