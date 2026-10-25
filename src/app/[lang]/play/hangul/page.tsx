import type { Metadata } from "next";
import { getDictionary } from "../../dictionaries";
import { pageAlternates } from "@/lib/i18n";
import { adSlots } from "@/lib/ads";
import { AdSlot } from "@/components/ad-slot";
import { SupportNote } from "@/components/support-note";
import { HangulBlocks } from "@/components/games/hangul-blocks";

export async function generateMetadata({ params }: PageProps<"/[lang]/play/hangul">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.play.hangul.name,
    description: dict.play.hangul.blurb,
    alternates: pageAlternates(lang, "/play/hangul"),
  };
}

export default async function HangulPage({ params }: PageProps<"/[lang]/play/hangul">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.play;

  return (
    <div className="mx-auto max-w-2xl px-5 pt-14 sm:px-8">
      <h1 className="font-serif text-4xl font-bold">{t.hangul.name}</h1>
      <p className="mt-3 text-ink-soft">{t.hangul.blurb}</p>
      <HangulBlocks lang={lang} t={t.hangul} />
      <AdSlot slot={adSlots.play} label={dict.ads.label} />
      <SupportNote line={t.supportLine} label={dict.footer.support} />
    </div>
  );
}
