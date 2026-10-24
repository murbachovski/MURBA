import "server-only";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import type en from "./dictionaries/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ko: () => import("./dictionaries/ko.json").then((m) => m.default),
  ja: () => import("./dictionaries/ja.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
};

export async function getDictionary(lang: string) {
  if (!isLocale(lang)) notFound();
  return dictionaries[lang]();
}
