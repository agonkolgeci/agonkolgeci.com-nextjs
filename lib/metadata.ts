import { getDefaultLocale } from "@/i18n/config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// Canonical production origin — the single source of truth for absolute URLs
// used across metadata, the sitemap and robots.
export const siteUrl = "https://agonkolgeci.com";

export type MetadataProps = {
  params?: {
    locale: string
  }
}

export type PageMetadataProps = {
  namespace: string,
  // Canonical path for this page (e.g. "/terms"). Defaults to the site root.
  // Without it a page inherits the root layout's canonical/og:url and wrongly
  // reports the homepage as its canonical.
  path?: string,
} & MetadataProps

export async function getPageTranslations(metadata: PageMetadataProps) {
  const locale = await Promise.resolve(metadata.params?.locale || getDefaultLocale());
  return await getTranslations({ locale, namespace: metadata.namespace });
}

export async function getPageMetadata(metadata: PageMetadataProps): Promise<Metadata> {
  const t = await getPageTranslations(metadata);
  const locale = await Promise.resolve(metadata.params?.locale || getDefaultLocale());
  const global = await getTranslations({ locale, namespace: "global" });

  const title = t("title");
  const description = t("description");
  const path = metadata.path ?? "/";

  return {
    title,
    description,

    // Per-page canonical + Open Graph so this page is indexed on its own URL
    // instead of inheriting the root's homepage values. A nested openGraph
    // replaces (does not merge with) the root's, so type/siteName/locale are
    // repeated here to keep the tags complete.
    alternates: {
      canonical: path
    },
    openGraph: {
      type: "website",
      siteName: global("title"),
      locale,
      title,
      description,
      url: path,
      images: "/banner_full.webp"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: "/banner_full.webp"
    }
  }
}