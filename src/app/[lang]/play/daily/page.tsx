import type { Metadata } from "next";
import { getDictionary } from "../../dictionaries";
import { pageAlternates } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { adSlots } from "@/lib/ads";
import { AdSlot } from "@/components/ad-slot";
import { SupportNote } from "@/components/support-note";
import { DailyFive } from "@/components/games/daily-five";

export async function generateMetadata({ params }: PageProps<"/[lang]/play/daily">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.play.daily.name,
    description: dict.play.daily.blurb,
    alternates: pageAlternates(lang, "/play/daily"),
  };
}

export default async function DailyPage({ params }: PageProps<"/[lang]/play/daily">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.play;

  return (
    <div className="mx-auto max-w-2xl px-5 pt-14 sm:px-8">
      <h1 className="font-serif text-4xl font-bold">{t.daily.name}</h1>
      <p className="mt-3 text-ink-soft">{t.daily.blurb}</p>
      <DailyFive lang={lang} t={t.daily} shareUrl={`${siteUrl}/${lang}/play/daily`} />
      <AdSlot slot={adSlots.play} label={dict.ads.label} />
      <SupportNote line={t.supportLine} label={dict.footer.support} />
    </div>
  );
}
