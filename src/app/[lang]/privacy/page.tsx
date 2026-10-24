import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { pageAlternates } from "@/lib/i18n";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return { title: dict.privacy.title, alternates: pageAlternates(lang, "/privacy") };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.privacy;

  return (
    <article className="mx-auto max-w-2xl px-5 pt-16 sm:px-8">
      <h1 className="font-serif text-4xl font-bold">{t.title}</h1>
      <p className="mt-3 text-sm text-ink-soft">{t.updated}</p>
      <div className="mt-10 space-y-8">
        {t.sections.map((section) => (
          <section key={section.h}>
            <h2 className="text-lg font-semibold">{section.h}</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{section.p}</p>
          </section>
        ))}
        {contactEmail && (
          <p>
            <a href={`mailto:${contactEmail}`} className="ink-link">
              {contactEmail}
            </a>
          </p>
        )}
      </div>
    </article>
  );
}
