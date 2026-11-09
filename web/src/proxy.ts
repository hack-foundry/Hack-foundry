import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";

const LOCALE_COOKIE = "NEXT_LOCALE";
const COUNTRY_OVERRIDE_COOKIE = "rw_country_override";

function preferredLocale(req: NextRequest): string {
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && (LOCALES as readonly string[]).includes(cookie)) return cookie;
  const accept = req.headers.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const lang = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if ((LOCALES as readonly string[]).includes(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const segment = pathname.split("/")[1];
  const hasLocale = (LOCALES as readonly string[]).includes(segment);

  // Preview/testing aid: ?country=BR shows Brazil's pricing. Disabled in production by default.
  const override = searchParams.get("country");
  const allowed = process.env.NODE_ENV !== "production" || process.env.ALLOW_COUNTRY_OVERRIDE === "true";
  const validOverride = allowed && !!override && /^[A-Za-z]{2}$/.test(override);
  const requestHeaders = new Headers(req.headers);
  requestHeaders.delete("x-rw-country-override"); // never trust a client-sent copy
  if (validOverride) requestHeaders.set("x-rw-country-override", override!.toUpperCase());

  let res: NextResponse;
  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${preferredLocale(req)}${pathname === "/" ? "" : pathname}`;
    res = NextResponse.redirect(url);
  } else {
    res = NextResponse.next({ request: { headers: requestHeaders } });
    res.cookies.set(LOCALE_COOKIE, segment, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }

  if (validOverride) {
    res.cookies.set(COUNTRY_OVERRIDE_COOKIE, override!.toUpperCase(), { path: "/", sameSite: "lax" });
  }
  return res;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
