import Link from "next/link";
import type { Dict } from "@/dictionaries/en";

export function Footer({ t, locale }: { t: Dict["footer"]; locale: string }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="disclaimer">{t.disclaimer}</p>
        <nav className="footer-links" aria-label="Legal">
          <Link href={`/${locale}/legal/disclaimer`}>{t.legal.disclaimer}</Link>
          <Link href={`/${locale}/legal/terms`}>{t.legal.terms}</Link>
          <Link href={`/${locale}/legal/privacy`}>{t.legal.privacy}</Link>
        </nav>
        <p className="copyright">© {new Date().getFullYear()} Rootwell Health. {t.rights}</p>
      </div>
    </footer>
  );
}
