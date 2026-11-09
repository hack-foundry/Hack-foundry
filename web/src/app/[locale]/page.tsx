import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Pricing, regionName } from "@/components/Pricing";
import { WaitlistForm } from "@/components/WaitlistForm";
import { getCountry } from "@/lib/geo";
import { getDictionary } from "@/lib/i18n";
import { PROGRAMS, defaultCurrencyForCountry, formatMoney, isCurrency, priceFor } from "@/lib/pricing";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ currency?: string }>;
};

export default async function Home({ params, searchParams }: Props) {
  const { locale } = await params;
  const { currency: requested } = await searchParams;
  const t = getDictionary(locale);
  const country = await getCountry();
  const currency = isCurrency(requested) ? requested : defaultCurrencyForCountry(country);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="lead">{t.hero.subtitle}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#programs">{t.hero.ctaPrimary}</a>
            <a className="btn btn-secondary" href="#pricing">{t.hero.ctaSecondary}</a>
          </div>
          <p className="muted small">
            {t.hero.pricedFor} {regionName(country, locale)} · {currency}
          </p>
        </div>
      </section>

      <section id="how" className="section section-alt">
        <div className="container">
          <h2>{t.how.title}</h2>
          <p className="lead">{t.how.subtitle}</p>
          <ol className="grid grid-4 steps">
            {t.how.steps.map((s) => (
              <li key={s.title} className="card">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="programs" className="section">
        <div className="container">
          <h2>{t.programs.title}</h2>
          <p className="lead">{t.programs.subtitle}</p>
          <div className="grid grid-3">
            {PROGRAMS.map((id) => {
              const p = t.programs.items[id as keyof typeof t.programs.items];
              return (
                <article key={id} className="card program">
                  <p className="eyebrow">{p.weeks} {t.programs.weeks}</p>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <p className="price">{formatMoney(priceFor(id, currency, country), currency, locale)}</p>
                  <div className="card-actions">
                    <CheckoutButton
                      itemId={id}
                      currency={currency}
                      locale={locale}
                      label={t.programs.buy}
                      loadingLabel={t.checkout.loading}
                      errorLabel={t.checkout.error}
                    />
                    <Link className="text-link" href={`/${locale}/programs/${id}?currency=${currency}`}>
                      {t.programs.learnMore} →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Pricing t={t} locale={locale} country={country} currency={currency} />

      <section id="faq" className="section section-alt">
        <div className="container narrow">
          <h2>{t.faq.title}</h2>
          {t.faq.items.map((f) => (
            <details key={f.q} className="faq">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="waitlist" className="section">
        <div className="container narrow">
          <h2>{t.waitlist.title}</h2>
          <p className="lead">{t.waitlist.subtitle}</p>
          <WaitlistForm t={t.waitlist} locale={locale} country={country} />
        </div>
      </section>
    </>
  );
}
