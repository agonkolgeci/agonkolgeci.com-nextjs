import { useTranslations } from "next-intl";
import EducationClient from "./EducationClient";
import { MetadataProps, getPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({namespace: "education", params});
}

export default function Education() {
    return (
        <EducationClient />
    );
}