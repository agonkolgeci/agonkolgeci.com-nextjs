import { getDefaultLocale } from "@/i18n/config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export type MetadataProps = {
  params?: {
    locale: string
  }
}

export type PageMetadataProps = {
  namespace: string,
} & MetadataProps

export async function getPageTranslations(metadata: PageMetadataProps) {
  const locale = await Promise.resolve(metadata.params?.locale || getDefaultLocale());
  return await getTranslations({ locale, namespace: metadata.namespace });
}

export async function getPageMetadata(metadata: PageMetadataProps): Promise<Metadata> {
  const t = await getPageTranslations(metadata);

  return {
    title: t("title"),
    description: t("description")
  }
}