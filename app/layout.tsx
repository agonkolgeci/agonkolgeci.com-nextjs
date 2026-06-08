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

          <main className="w-full relative min-h-screen">
            {/* Global full-bleed ambient background pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {/* Tech dot-grid (edges faded horizontally so it never cuts net) */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                  maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)"
                }}
              />
              {/* Accent blobs distributed down the full height of the page */}
              <div className="absolute top-[3%] left-[4%] w-[520px] h-[520px] bg-accent-blue/[0.16] rounded-full blur-[120px]" />
              <div className="absolute top-[24%] right-[2%] w-[480px] h-[480px] bg-accent-teal/[0.14] rounded-full blur-[120px]" />
              <div className="absolute top-[46%] left-[1%] w-[500px] h-[500px] bg-accent-blue/[0.13] rounded-full blur-[125px]" />
              <div className="absolute top-[68%] right-[4%] w-[480px] h-[480px] bg-accent-teal/[0.15] rounded-full blur-[120px]" />
              <div className="absolute top-[88%] left-[8%] w-[460px] h-[460px] bg-accent-blue/[0.13] rounded-full blur-[120px]" />
            </div>

            <div className="relative w-full">
              {children}
            </div>
          </main>

          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}