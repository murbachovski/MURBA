"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales } from "@/lib/i18n";

export function LanguageSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <div className="flex gap-3 text-sm text-ink-soft">
      {locales.map((l) =>
        l === lang ? (
          <span key={l} className="text-ink" aria-current="true">
            {localeNames[l]}
          </span>
        ) : (
          <Link key={l} href={`/${l}${rest}`} hrefLang={l} className="hover:text-accent">
            {localeNames[l]}
          </Link>
        ),
      )}
    </div>
  );
}
