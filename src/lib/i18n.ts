export const locales = ["en", "ko", "ja", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  es: "Español",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Canonical + hreflang links for a page that exists in every locale.
// `path` is the part after the locale, e.g. "/tutor" or "" for the home page.
export function pageAlternates(lang: string, path: string) {
  return {
    canonical: `/${lang}${path}`,
    languages: Object.fromEntries([
      ...locales.map((l) => [l, `/${l}${path}`]),
      ["x-default", `/${defaultLocale}${path}`],
    ]),
  };
}
