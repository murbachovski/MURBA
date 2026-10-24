import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "../../dictionaries";
import { getPhraseNote, phraseNotes } from "@/content/phrases";
import { adSlots } from "@/lib/ads";
import { AdSlot } from "@/components/ad-slot";

export function generateStaticParams() {
  return phraseNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/phrases/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = getPhraseNote(slug);
  if (!note) return {};
  return {
    title: `${note.ko} (${note.roman})`,
    description: note.gist,
    // The notes are written in English, so every locale points search engines at the English copy.
    alternates: { canonical: `/en/phrases/${note.slug}` },
  };
}

export default async function PhraseNotePage({ params }: PageProps<"/[lang]/phrases/[slug]">) {
  const { lang, slug } = await params;
  const note = getPhraseNote(slug);
  if (!note) notFound();
  const dict = await getDictionary(lang);
  const t = dict.phrases;

  const index = phraseNotes.indexOf(note);
  const next = phraseNotes[(index + 1) % phraseNotes.length];

  return (
    <article className="mx-auto max-w-2xl px-5 pt-14 sm:px-8">
      <Link href={`/${lang}/phrases`} className="text-sm text-ink-soft hover:text-accent">
        ← {t.back}
      </Link>

      <header className="mt-8 border-b border-ink pb-8">
        <h1 className="font-serif text-5xl font-bold sm:text-6xl">{note.ko}</h1>
        <p className="mt-3 text-lg text-ink-soft italic">{note.roman}</p>
        <p className="mt-5 text-xl">{note.gist}</p>
      </header>

      <div className="mt-8 space-y-5 text-[17px] leading-[1.8]">
        {note.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="label">{t.examplesTitle}</h2>
        <ul className="mt-4 space-y-5 border-l-2 border-accent pl-5">
          {note.examples.map((ex) => (
            <li key={ex.ko}>
              <p className="font-serif text-xl">{ex.ko}</p>
              <p className="text-sm text-ink-soft italic">{ex.roman}</p>
              <p className="mt-1">{ex.en}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 bg-paper-deep p-6">
        <h2 className="label text-pine">{t.tipTitle}</h2>
        <p className="mt-2 text-lg">{note.tip}</p>
        <Link href={`/${lang}/tutor`} className="ink-link mt-4 inline-block">
          {t.tryIt} →
        </Link>
      </section>

      <AdSlot slot={adSlots.phrases} label={dict.ads.label} />

      <Link href={`/${lang}/phrases/${next.slug}`} className="group mt-4 block border-t border-rule pt-6">
        <span className="label">→</span>
        <span className="ml-3 font-serif text-2xl group-hover:text-accent">{next.ko}</span>
        <span className="ml-3 text-ink-soft">{next.gist}</span>
      </Link>
    </article>
  );
}
