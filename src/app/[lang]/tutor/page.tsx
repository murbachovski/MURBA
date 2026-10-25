import type { Metadata } from "next";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import { pageAlternates } from "@/lib/i18n";
import { adSlots } from "@/lib/ads";
import { AdSlot } from "@/components/ad-slot";
import { TutorChat, TutorChatWithAsk } from "@/components/tutor-chat";

export async function generateMetadata({ params }: PageProps<"/[lang]/tutor">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.tutor.title,
    description: dict.tutor.lead,
    alternates: pageAlternates(lang, "/tutor"),
  };
}

export default async function TutorPage({ params }: PageProps<"/[lang]/tutor">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-5 pt-12 sm:px-8">
      <h1 className="font-serif text-4xl font-bold">{dict.tutor.title}</h1>
      <p className="mt-3 text-ink-soft">{dict.tutor.lead}</p>
      {/* The static shell renders an empty chat; the ?ask= version replaces it in the browser. */}
      <Suspense fallback={<TutorChat lang={lang} t={dict.tutor} pricingHref={`/${lang}/pricing`} />}>
        <TutorChatWithAsk lang={lang} t={dict.tutor} pricingHref={`/${lang}/pricing`} />
      </Suspense>
      {/* Ads sit below the conversation, never inside it. */}
      <AdSlot slot={adSlots.tutor} label={dict.ads.label} />
    </div>
  );
}
