import { cookies, headers } from "next/headers";

export const COUNTRY_OVERRIDE_COOKIE = "rw_country_override";

/** Allow `?country=XX` overrides for previews/testing only, never in production by default. */
export function countryOverrideAllowed(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.ALLOW_COUNTRY_OVERRIDE === "true";
}

/**
 * Visitor country, from the hosting provider's geo header:
 *  - Vercel:      x-vercel-ip-country
 *  - Cloudflare:  cf-ipcountry
 * Falls back to DEFAULT_COUNTRY (or US) when running locally.
 */
export async function getCountry(): Promise<string> {
  if (countryOverrideAllowed()) {
    const override =
      (await headers()).get("x-rw-country-override") ??
      (await cookies()).get(COUNTRY_OVERRIDE_COOKIE)?.value;
    if (override && /^[A-Z]{2}$/.test(override)) return override;
  }
  const h = await headers();
  const fromHeader = h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry");
  if (fromHeader && /^[A-Z]{2}$/i.test(fromHeader) && fromHeader.toUpperCase() !== "XX") {
    return fromHeader.toUpperCase();
  }
  return (process.env.DEFAULT_COUNTRY ?? "US").toUpperCase();
}
