import Link from "next/link";
import { LOCALES, LOCALE_NAMES } from "@/lib/i18n";
import type { Dict } from "@/dictionaries/en";

export function Header({ t, locale }: { t: Dict["nav"]; locale: string }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={`/${locale}`} className="logo" aria-label="Rootwell Health home">
          <span className="logo-mark" aria-hidden="true">❦</span> Rootwell
        </Link>
        <nav className="nav" aria-label="Main">
          <a href={`/${locale}#how`}>{t.how}</a>
          <a href={`/${locale}#programs`}>{t.programs}</a>
          <a href={`/${locale}#pricing`}>{t.pricing}</a>
          <a href={`/${locale}#faq`}>{t.faq}</a>
        </nav>
        <div className="header-actions">
          <div className="lang" aria-label="Language">
            {LOCALES.map((l) => (
              <Link key={l} href={`/${l}`} hrefLang={l} aria-current={l === locale ? "true" : undefined} title={LOCALE_NAMES[l]}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <a className="btn btn-primary btn-sm" href={`/${locale}#waitlist`}>{t.join}</a>
        </div>
      </div>
    </header>
  );
}
