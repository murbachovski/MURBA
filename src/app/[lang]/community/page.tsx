import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { pageAlternates } from "@/lib/i18n";
import { discordUrl } from "@/lib/money";

export async function generateMetadata({ params }: PageProps<"/[lang]/community">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.community.title,
    description: dict.community.lead,
    alternates: pageAlternates(lang, "/community"),
  };
}

export default async function CommunityPage({ params }: PageProps<"/[lang]/community">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.community;

  return (
    <div className="mx-auto max-w-3xl px-5 pt-16 sm:px-8">
      <h1 className="font-serif text-4xl font-bold sm:text-5xl">{t.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{t.lead}</p>

      <div className="mt-8">
        {discordUrl ? (
          <a href={discordUrl} target="_blank" rel="noopener" className="inline-block bg-ink px-6 py-3 text-paper hover:bg-accent">
            {t.join} →
          </a>
        ) : (
          <p className="border-l-2 border-accent pl-4">{t.soon}</p>
        )}
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-3xl">{t.channelsTitle}</h2>
        <dl className="mt-6 divide-y divide-rule border-y border-rule">
          {t.channels.map((c) => (
            <div key={c.name} className="grid gap-1 py-5 sm:grid-cols-[13rem_1fr] sm:items-baseline">
              <dt className="font-mono text-pine">{c.name}</dt>
              <dd className="leading-relaxed text-ink-soft">{c.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 bg-paper-deep p-7 sm:p-9">
        <h2 className="font-serif text-2xl">{t.rulesTitle}</h2>
        <ol className="mt-4 space-y-2">
          {t.rules.map((rule, i) => (
            <li key={rule} className="flex gap-3">
              <span className="font-serif text-accent">{i + 1}.</span>
              {rule}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
