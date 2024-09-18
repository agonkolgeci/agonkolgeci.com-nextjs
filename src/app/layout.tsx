import type { Metadata, Viewport } from "next";

import "./globals.css";

import Footer from "./_components/Footer";
import Header from "./_components/Header";

import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const viewport: Viewport = {
  themeColor: "#152238",
}

export async function generateMetadata({params: { locale }} : { params: {locale: string} }): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: "global"});

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
      locale: locale
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