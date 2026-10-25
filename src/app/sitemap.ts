import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { phraseNotes } from "@/content/phrases";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/tutor", "/play", "/play/daily", "/play/hangul", "/phrases", "/community", "/pricing", "/privacy"].flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])) },
    })),
  );
  const notes = phraseNotes.map((note) => ({ url: `${siteUrl}/en/phrases/${note.slug}` }));
  return [...pages, ...notes];
}
