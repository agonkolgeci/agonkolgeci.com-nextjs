import type { Metadata, Viewport } from "next";

import "./globals.css";

import Footer from "./_components/Footer";
import Header from "./_components/Header";

import { getDefaultLocale } from "@/i18n/config";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { MetadataProps, getPageTranslations } from "./metadata";

export const viewport: Viewport = {
  themeColor: "#152238",
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const t = await getPageTranslations({ namespace: "global", params });

  return {
    title: {
      default: t("title"),
      template: `${t("title")} — %s`
    },
    description: t("description"),

    keywords: t("keywords"),
    authors: { name: t("title"), url: "https://github.com/agonkolgeci/agonkolgeci.com-nextjs" },
    
    robots: { index: true, follow: true },

    openGraph: {
      type: "website",
      images: "https://agonkolgeci.com/banner_full.webp",
      locale: params?.locale || await getDefaultLocale()
    },

    twitter: {
      card: "summary",
      images: "https://agonkolgeci.com/logo_full.webp"
    }
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-primary text-white">
        <NextIntlClientProvider messages={messages}>
          <Header/>

          <main className="w-full">
            {children}
          </main>

          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}