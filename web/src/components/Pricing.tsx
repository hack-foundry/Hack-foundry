import Link from "next/link";
import { CheckoutButton } from "./CheckoutButton";
import { CATALOG, CURRENCIES, MEMBERSHIPS, formatMoney, priceFor, tierForCountry, type Currency } from "@/lib/pricing";
import type { Dict } from "@/dictionaries/en";

type Props = { t: Dict; locale: string; country: string; currency: Currency };

export function CurrencySwitcher({ label, basePath, currency, hash = "" }: { label: string; basePath: string; currency: Currency; hash?: string }) {
  return (
    <div className="currency-switch" role="group" aria-label={label}>
      <span>{label}:</span>
      {CURRENCIES.map((c) => (
        <Link key={c} href={`${basePath}?currency=${c}${hash}`} scroll={false} aria-current={c === currency ? "true" : undefined}>
          {c}
        </Link>
      ))}
    </div>
  );
}

export function Pricing({ t, locale, country, currency }: Props) {
  const regional = currency === "USD" && tierForCountry(country) !== "A";
  return (
    <section id="pricing" className="section">
      <div className="container">
        <h2>{t.pricing.title}</h2>
        <p className="lead">{t.pricing.subtitle}</p>
        <CurrencySwitcher label={t.pricing.currency} basePath={`/${locale}`} currency={currency} hash="#pricing" />
        {regional && (
          <p className="regional-note">
            {t.pricing.regional} <strong>{regionName(country, locale)}</strong>
          </p>
        )}
        <div className="grid grid-3">
          {MEMBERSHIPS.map((id) => {
            const plan = t.pricing.plans[id as keyof typeof t.pricing.plans];
            const item = CATALOG[id];
            const featured = id === "coaching";
            return (
              <article key={id} className={`card plan ${featured ? "plan-featured" : ""}`}>
                {featured && <span className="badge">{t.pricing.popular}</span>}
                {item.waitlistOnly && <span className="badge badge-muted">{t.pricing.comingSoon}</span>}
                <h3>{plan.name}</h3>
                <p className="muted">{plan.description}</p>
                <p className="price">
                  {formatMoney(priceFor(id, currency, country), currency, locale)}
                  <span>{t.pricing.perMonth}</span>
                </p>
                <ul className="checklist">
                  {plan.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                {item.waitlistOnly ? (
                  <a className="btn btn-secondary btn-block" href={`/${locale}#waitlist`}>{t.pricing.waitlist}</a>
                ) : (
                  <CheckoutButton
                    itemId={id}
                    currency={currency}
                    locale={locale}
                    label={t.pricing.subscribe}
                    loadingLabel={t.checkout.loading}
                    errorLabel={t.checkout.error}
                    variant={featured ? "primary" : "secondary"}
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function regionName(country: string, locale: string): string {
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(country) ?? country;
  } catch {
    return country;
  }
}
