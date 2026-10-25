import type { Dictionary } from "@/app/[lang]/dictionaries";
import { phrasebookUrl } from "@/lib/money";

// The paid PDF. Hidden until its checkout link is set, so nothing points at a product that isn't on sale.
export function PhrasebookOffer({ t }: { t: Dictionary["shop"] }) {
  if (!phrasebookUrl) return null;
  return (
    <section className="mt-16 grid gap-6 border border-ink p-7 sm:grid-cols-[1fr_auto] sm:items-end sm:p-9">
      <div>
        <p className="label text-accent">{t.label}</p>
        <h2 className="mt-3 font-serif text-3xl">{t.title}</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{t.body}</p>
      </div>
      <div className="flex items-baseline gap-5 sm:flex-col sm:items-end sm:gap-3">
        <span className="font-serif text-4xl">{t.price}</span>
        <a href={phrasebookUrl} target="_blank" rel="noopener" className="bg-ink px-6 py-3 text-paper hover:bg-accent">
          {t.cta} →
        </a>
      </div>
    </section>
  );
}
