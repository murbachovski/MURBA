import Link from "next/link";
import { Suspense } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader({ lang, nav }: { lang: string; nav: Dictionary["nav"] }) {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4 sm:px-8">
        <Link href={`/${lang}`} className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight">MURBA</span>
          <span className="font-serif text-sm text-accent">머르바</span>
        </Link>
        <nav className="flex flex-1 items-center gap-5 text-[15px]">
          <Link href={`/${lang}/tutor`} className="hover:text-accent">
            {nav.tutor}
          </Link>
          <Link href={`/${lang}/phrases`} className="hover:text-accent">
            {nav.phrases}
          </Link>
          <Link href={`/${lang}/pricing`} className="hover:text-accent">
            {nav.pricing}
          </Link>
        </nav>
        <Suspense fallback={null}>
          <LanguageSwitcher lang={lang} />
        </Suspense>
      </div>
    </header>
  );
}
