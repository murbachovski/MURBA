import Link from "next/link";
import { getDictionary } from "./dictionaries";
import { pageAlternates } from "@/lib/i18n";
import { adSlots } from "@/lib/ads";
import { AdSlot } from "@/components/ad-slot";
import { phraseNotes } from "@/content/phrases";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  return { alternates: pageAlternates(lang, "") };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.home;

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {/* Opening: words first, one big Hangul syllable as the only "illustration". */}
      <section className="grid gap-10 pt-16 pb-20 md:grid-cols-[1fr_auto] md:items-end md:pt-24">
        <div>
          <p className="label">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.15] font-bold sm:text-6xl">{t.title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{t.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={`/${lang}/tutor`}
              className="bg-ink px-6 py-3 text-paper transition-colors hover:bg-accent"
            >
              {t.cta} →
            </Link>
            <span className="text-sm text-ink-soft">{t.ctaNote}</span>
          </div>
        </div>
        <p
          aria-hidden
          className="hidden select-none font-serif text-[11rem] leading-none text-accent/90 md:block"
        >
          말
        </p>
      </section>

      {/* Phrase of the day, set like an index card pinned to the page. */}
      <section className="relative -rotate-[0.6deg] border border-rule bg-[#fffdf8] p-7 shadow-[3px_4px_0_var(--rule)] sm:p-10">
        <p className="label text-accent">{t.phraseLabel}</p>
        <p className="mt-4 font-serif text-4xl sm:text-5xl">{t.phrase.ko}</p>
        <p className="mt-2 text-ink-soft italic">{t.phrase.roman}</p>
        <div className="mt-6 grid gap-2 border-t border-dashed border-rule pt-5 sm:grid-cols-2">
          <p>{t.phrase.literal}</p>
          <p>
            <span className="marker">{t.phrase.meaning}</span>
          </p>
        </div>
        <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">{t.phrase.note}</p>
      </section>

      {/* The daily habit: one dark band so today's game is the next thing the eye lands on. */}
      <section className="mt-20 grid gap-8 bg-ink p-8 text-paper sm:p-12 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="label text-[#e9a58f]">{dict.play.title}</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{dict.play.daily.name}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-[#d8d0c2]">{dict.play.daily.blurb}</p>
          <p className="mt-6 font-serif text-2xl tracking-[0.5em] text-[#e9a58f]" aria-hidden>
            ●●●●○
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <Link
            href={`/${lang}/play/daily`}
            className="bg-paper px-6 py-3 text-ink transition-colors hover:bg-accent hover:text-paper"
          >
            {dict.play.daily.cta} →
          </Link>
          <Link href={`/${lang}/play/hangul`} className="text-sm text-[#d8d0c2] underline underline-offset-4 hover:text-paper">
            {dict.play.hangul.name} →
          </Link>
        </div>
      </section>

      <section className="mt-24">
        <h2 className="font-serif text-3xl">{t.howTitle}</h2>
        <ol className="mt-8 grid gap-10 md:grid-cols-3">
          {t.how.map((step, i) => (
            <li key={step.title} className="border-t border-ink pt-4">
              <span className="font-serif text-accent">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-24">
        <h2 className="font-serif text-3xl">{t.modesTitle}</h2>
        <div className="mt-8 divide-y divide-rule border-y border-rule">
          {t.modes.map((mode) => (
            <div key={mode.ko} className="grid gap-2 py-6 sm:grid-cols-[8rem_12rem_1fr] sm:items-baseline">
              <span className="font-serif text-3xl text-pine">{mode.ko}</span>
              <span className="font-semibold">{mode.name}</span>
              <span className="leading-relaxed text-ink-soft">{mode.body}</span>
            </div>
          ))}
        </div>
      </section>

      <AdSlot slot={adSlots.home} label={dict.ads.label} />

      <section className="mt-24 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">{dict.phrases.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{dict.phrases.lead}</p>
          <Link href={`/${lang}/phrases`} className="ink-link mt-6 inline-block">
            {dict.phrases.back} →
          </Link>
        </div>
        <ul className="space-y-4">
          {phraseNotes.slice(1, 5).map((note) => (
            <li key={note.slug}>
              <Link
                href={`/${lang}/phrases/${note.slug}`}
                className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span className="shrink-0 font-serif text-2xl whitespace-nowrap group-hover:text-accent">
                  {note.ko}
                </span>
                <span className="text-sm text-ink-soft">{note.gist}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 grid gap-6 bg-paper-deep p-8 sm:p-12 md:grid-cols-[1fr_2fr]">
        <h2 className="font-serif text-2xl">{t.noteTitle}</h2>
        <p className="leading-relaxed">{t.noteBody}</p>
      </section>

      <section className="mt-24 flex flex-wrap items-baseline justify-between gap-6 border-t border-ink pt-8">
        <p className="font-serif text-3xl">{t.closingTitle}</p>
        <span className="flex flex-wrap gap-x-8 gap-y-3 text-lg">
          <Link href={`/${lang}/tutor`} className="ink-link">
            {t.closingCta} →
          </Link>
          <Link href={`/${lang}/community`} className="ink-link">
            {dict.community.title} →
          </Link>
        </span>
      </section>
    </div>
  );
}
