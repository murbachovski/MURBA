import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { supportUrl } from "@/lib/money";

export function SiteFooter({ lang, footer }: { lang: string; footer: Dictionary["footer"] }) {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-4 px-5 py-8 text-sm text-ink-soft sm:px-8">
        <p>
          <span className="font-serif text-ink">MURBA</span> — {footer.line}
        </p>
        <span className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href={`/${lang}/pricing`} className="ink-link">
            {footer.pricing}
          </Link>
          {supportUrl && (
            <a href={supportUrl} target="_blank" rel="noopener" className="ink-link">
              {footer.support}
            </a>
          )}
          <Link href={`/${lang}/privacy`} className="ink-link">
            {footer.privacy}
          </Link>
        </span>
      </div>
    </footer>
  );
}
