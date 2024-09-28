import Article from "../_components/pages/Article";
import { MetadataProps, getPageMetadata } from "../metadata";
import { useTranslations } from "next-intl";
import SchoolCareer from "./SchoolCareer";

export async function generateMetadata(props: MetadataProps) {
    return getPageMetadata({namespace: "education", ...props});
}

export default function Education() {
    const t = useTranslations("education");

    return (
        <Article title={t("title")} description={t("description")}>
            <SchoolCareer />
        </Article>
    );
}