import Link from "next/link";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ demo?: string }>;
};

export const metadata = { robots: { index: false } };

export default async function SuccessPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { demo } = await searchParams;
  const t = getDictionary(locale);
  return (
    <section className="section">
      <div className="container narrow center">
        <h1>{t.checkout.successTitle}</h1>
        {demo ? <p className="notice">{t.checkout.demoNotice}</p> : <p className="lead">{t.checkout.successBody}</p>}
        <Link className="btn btn-primary" href={`/${locale}`}>{t.checkout.backHome}</Link>
      </div>
    </section>
  );
}
