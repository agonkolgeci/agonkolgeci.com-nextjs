import { useTranslations } from "next-intl";
import GalleryClient from "./GalleryClient";
import { MetadataProps, getPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({namespace: "gallery", params});
}

export default function Gallery() {
    return (
        <GalleryClient />
    );
}