import type { Metadata, Viewport } from "next";
import { Syne, Poppins } from "next/font/google";

import "@/styles/globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { getDefaultLocale } from "@/i18n/config";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { MetadataProps, getPageTranslations } from "@/lib/metadata";

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap'
});

export const isDev = process.env.NODE_ENV === 'development';

export const viewport: Viewport = {
  themeColor: "#000000",
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const t = await getPageTranslations({ namespace: "global", params });
  const devPrefix = isDev ? "[DEV]" : ""

  return {
    title: {
      default: `${devPrefix} ${t("title")}`,
      template: `${devPrefix} ${t("title")} — %s`
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
    <html lang={locale} className={`${syne.variable} ${poppins.variable}`}>
      <body className="bg-primary text-white selection:bg-accent-blue selection:text-white">
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