import type { Metadata, Viewport } from "next";
import { Syne, Poppins } from "next/font/google";

import "@/styles/globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { getDefaultLocale } from "@/i18n/config";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { MetadataProps, getPageTranslations, siteUrl } from "@/lib/metadata";

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
  const locale = params?.locale || await getDefaultLocale();

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: `${devPrefix} ${t("title")}`,
      template: `${devPrefix} ${t("title")} — %s`
    },
    description: t("description"),

    keywords: t("keywords"),
    authors: { name: t("title"), url: siteUrl },
    creator: t("title"),
    publisher: t("title"),

    // Single-page site: everything canonicalises to the root URL.
    alternates: {
      canonical: "/"
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },

    openGraph: {
      type: "website",
      url: "/",
      siteName: t("title"),
      title: t("title"),
      description: t("description"),
      images: "/banner_full.webp",
      locale
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: "/banner_full.webp"
    }
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("global");

  // Person structured data — helps search engines build a rich knowledge panel
  // for a personal portfolio. Serialized into a single <script type="application/ld+json">.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t("title"),
    url: siteUrl,
    image: `${siteUrl}/logo_full.webp`,
    jobTitle: "Software Developer",
    description: t("description"),
    email: "contact@agonkolgeci.com",
    sameAs: [
      "https://github.com/agonkolgeci",
      "https://linkedin.com/in/agon-kolgeci-193aa2266/"
    ]
  };

  return (
    <html lang={locale} className={`${syne.variable} ${poppins.variable}`}>
      <body className="bg-primary text-white selection:bg-accent-blue selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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