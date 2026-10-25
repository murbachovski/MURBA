import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "../dictionaries";
import { pageAlternates } from "@/lib/i18n";
import { PhrasebookOffer } from "@/components/phrasebook-offer";

export async function generateMetadata({ params }: PageProps<"/[lang]/pricing">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.pricing.title,
    description: dict.pricing.lead,
    alternates: pageAlternates(lang, "/pricing"),
  };
}

export default async function PricingPage({ params }: PageProps<"/[lang]/pricing">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.pricing;

  return (
    <div className="mx-auto max-w-4xl px-5 pt-16 sm:px-8">
      <h1 className="font-serif text-4xl font-bold sm:text-5xl">{t.title}</h1>
      <p className="mt-5 text-lg text-ink-soft">{t.lead}</p>

      <div className="mt-12 grid border border-ink md:grid-cols-2">
        <section className="p-8">
          <h2 className="font-serif text-2xl">{t.free.name}</h2>
          <p className="mt-4">
            <span className="font-serif text-5xl">{t.free.price}</span>
            <span className="ml-2 text-ink-soft">{t.free.per}</span>
          </p>
          <ul className="mt-6 space-y-2">
            {t.free.features.map((f) => (
              <li key={f} className="flex gap-3">
                <span className="text-pine">—</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href={`/${lang}/tutor`}
            className="mt-8 inline-block bg-ink px-6 py-3 text-paper transition-colors hover:bg-accent"
          >
            {t.free.cta}
          </Link>
        </section>

        <section className="border-t border-ink bg-paper-deep p-8 md:border-t-0 md:border-l">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl">{t.pro.name}</h2>
            <span className="label text-accent">{t.pro.badge}</span>
          </div>
          <p className="mt-4">
            <span className="font-serif text-5xl">{t.pro.price}</span>
            <span className="ml-2 text-ink-soft">{t.pro.per}</span>
          </p>
          <ul className="mt-6 space-y-2">
            {t.pro.features.map((f) => (
              <li key={f} className="flex gap-3">
                <span className="text-accent">—</span>
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            disabled
            className="mt-8 cursor-not-allowed border border-ink px-6 py-3 text-ink-soft"
          >
            {t.pro.cta}
          </button>
        </section>
      </div>

      <PhrasebookOffer t={dict.shop} />

      <section className="mt-20">
        <h2 className="font-serif text-3xl">{t.faqTitle}</h2>
        <dl className="mt-6 divide-y divide-rule border-y border-rule">
          {t.faq.map((item) => (
            <div key={item.q} className="grid gap-2 py-6 md:grid-cols-[16rem_1fr]">
              <dt className="font-semibold">{item.q}</dt>
              <dd className="leading-relaxed text-ink-soft">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
