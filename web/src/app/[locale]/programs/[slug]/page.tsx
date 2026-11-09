import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutButton } from "@/components/CheckoutButton";
import { CurrencySwitcher } from "@/components/Pricing";
import { getCountry } from "@/lib/geo";
import { getDictionary } from "@/lib/i18n";
import { PROGRAMS, defaultCurrencyForCountry, formatMoney, isCurrency, priceFor, type ItemId } from "@/lib/pricing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ currency?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getDictionary(locale);
  const p = t.programs.items[slug as keyof typeof t.programs.items];
  return p ? { title: `${p.name} — Rootwell Health`, description: p.summary } : {};
}

export default async function ProgramPage({ params, searchParams }: Props) {
  const { locale, slug } = await params;
  if (!PROGRAMS.includes(slug as ItemId)) notFound();
  const id = slug as ItemId;
  const { currency: requested } = await searchParams;
  const t = getDictionary(locale);
  const p = t.programs.items[id as keyof typeof t.programs.items];
  const country = await getCountry();
  const currency = isCurrency(requested) ? requested : defaultCurrencyForCountry(country);

  return (
    <section className="section">
      <div className="container narrow">
        <p className="eyebrow">{p.weeks} {t.programs.weeks}</p>
        <h1>{p.name}</h1>
        <p className="lead">{p.summary}</p>
        <div className="card">
          <h2 className="h3">{t.programs.includes}</h2>
          <ul className="checklist">
            {p.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <p className="price">{formatMoney(priceFor(id, currency, country), currency, locale)}</p>
          <CheckoutButton
            itemId={id}
            currency={currency}
            locale={locale}
            label={t.programs.buy}
            loadingLabel={t.checkout.loading}
            errorLabel={t.checkout.error}
          />
        </div>
        <CurrencySwitcher label={t.pricing.currency} basePath={`/${locale}/programs/${id}`} currency={currency} />
        <p className="muted small">{t.footer.disclaimer}</p>
      </div>
    </section>
  );
}
