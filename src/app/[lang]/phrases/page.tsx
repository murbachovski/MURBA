import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "../dictionaries";
import { pageAlternates } from "@/lib/i18n";
import { phraseNotes } from "@/content/phrases";
import { PhrasebookOffer } from "@/components/phrasebook-offer";

export async function generateMetadata({ params }: PageProps<"/[lang]/phrases">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.phrases.title,
    description: dict.phrases.lead,
    alternates: pageAlternates(lang, "/phrases"),
  };
}

export default async function PhrasesPage({ params }: PageProps<"/[lang]/phrases">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-5 pt-16 sm:px-8">
      <h1 className="font-serif text-4xl font-bold sm:text-5xl">{dict.phrases.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">{dict.phrases.lead}</p>
      {lang !== "en" && <p className="mt-3 text-sm text-ink-soft">{dict.phrases.languageNote}</p>}

      <ol className="mt-12 divide-y divide-rule border-y border-rule">
        {phraseNotes.map((note, i) => (
          <li key={note.slug}>
            <Link
              href={`/${lang}/phrases/${note.slug}`}
              className="group grid gap-1 py-6 sm:grid-cols-[3rem_1fr] sm:items-baseline"
            >
              <span className="font-serif text-sm text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="font-serif text-3xl group-hover:text-accent">{note.ko}</span>
                <span className="ml-3 text-sm text-ink-soft italic">{note.roman}</span>
                <span className="mt-1 block text-ink-soft">{note.gist}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <PhrasebookOffer t={dict.shop} />
    </div>
  );
}
