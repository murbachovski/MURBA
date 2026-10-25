import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "../dictionaries";
import { pageAlternates } from "@/lib/i18n";
import { adSlots } from "@/lib/ads";
import { AdSlot } from "@/components/ad-slot";
import { SupportNote } from "@/components/support-note";

export async function generateMetadata({ params }: PageProps<"/[lang]/play">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return { title: dict.play.title, description: dict.play.lead, alternates: pageAlternates(lang, "/play") };
}

export default async function PlayPage({ params }: PageProps<"/[lang]/play">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.play;
  const games = [
    { href: `/${lang}/play/daily`, mark: "오늘", ...t.daily },
    { href: `/${lang}/play/hangul`, mark: "한글", ...t.hangul },
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 pt-16 sm:px-8">
      <h1 className="font-serif text-4xl font-bold sm:text-5xl">{t.title}</h1>
      <p className="mt-5 text-lg text-ink-soft">{t.lead}</p>

      <div className="mt-12 divide-y divide-rule border-y border-rule">
        {games.map((game) => (
          <Link key={game.href} href={game.href} className="group grid gap-3 py-8 sm:grid-cols-[7rem_1fr] sm:items-baseline">
            <span className="font-serif text-4xl text-accent">{game.mark}</span>
            <span>
              <span className="text-xl font-semibold group-hover:text-accent">{game.name}</span>
              <span className="mt-2 block leading-relaxed text-ink-soft">{game.blurb}</span>
              <span className="ink-link mt-3 inline-block">{game.cta} →</span>
            </span>
          </Link>
        ))}
      </div>

      <AdSlot slot={adSlots.play} label={dict.ads.label} />
      <SupportNote line={t.supportLine} label={dict.footer.support} />
    </div>
  );
}
