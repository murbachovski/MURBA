import type { Metadata } from "next";
import { Gowun_Batang, IBM_Plex_Sans_KR } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { getDictionary } from "./dictionaries";
import { locales, pageAlternates } from "@/lib/i18n";
import { adsEnabled, adsenseClient } from "@/lib/ads";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl } from "@/lib/site";

const display = Gowun_Batang({
  variable: "--font-display",
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
});

const body = IBM_Plex_Sans_KR({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  preload: false,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: `%s · MURBA` },
    description: dict.meta.description,
    alternates: pageAlternates(lang, ""),
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: "MURBA",
      locale: lang,
      type: "website",
    },
    other: adsEnabled ? { "google-adsense-account": adsenseClient } : {},
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${display.variable} ${body.variable} h-full`}>
      <head>
        {adsEnabled && (
          // AdSense asks for a plain async script in <head>; next/script adds attributes it warns about.
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader lang={lang} nav={dict.nav} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} footer={dict.footer} />
        {/* Cookieless page-view counts; switch on under Analytics in the Vercel dashboard. */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
