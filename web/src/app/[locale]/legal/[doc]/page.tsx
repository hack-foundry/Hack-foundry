import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { LEGAL_DOCS, isLegalDoc } from "@/lib/legal";

type Props = { params: Promise<{ locale: string; doc: string }> };

export function generateStaticParams() {
  return Object.keys(LEGAL_DOCS.en).map((doc) => ({ doc }));
}

export default async function LegalPage({ params }: Props) {
  const { locale, doc } = await params;
  if (!isLegalDoc(doc)) notFound();
  const t = getDictionary(locale);
  const content = (LEGAL_DOCS[locale as keyof typeof LEGAL_DOCS] ?? LEGAL_DOCS.en)[doc];
  return (
    <section className="section">
      <article className="container narrow prose">
        <p className="notice">{t.legal.draftBanner}</p>
        <h1>{content.title}</h1>
        {content.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="h3">{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </article>
    </section>
  );
}
