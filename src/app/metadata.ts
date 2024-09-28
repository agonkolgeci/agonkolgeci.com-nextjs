import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export type MetadataProps = {
  locale: string
}

export type PageMetadataProps = {
  namespace: string,
} & MetadataProps

export async function getPageTranslations(metadata: PageMetadataProps) {
  return await getTranslations({ locale: metadata.locale, namespace: metadata.namespace });
}

export async function getPageMetadata(metadata: PageMetadataProps): Promise<Metadata> {
  const t = await getTranslations({ locale: metadata.locale, namespace: metadata.namespace });

  return {
    title: t("title"),
    description: t("description")
  }
}