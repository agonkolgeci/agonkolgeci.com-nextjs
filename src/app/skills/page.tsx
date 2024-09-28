
import Article from "../_components/pages/Article";

import { useTranslations } from "next-intl";
import { MetadataProps, getPageMetadata  } from "../metadata";
import SoftSkills from "./SoftSkills";
import ITSkills from "./ITSkills";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({namespace: "skills", params});
}

export default function Skills() {
    const t = useTranslations("skills");

    return (
        <Article title={t("title")} description={t("description")}>
            <ITSkills />
            <SoftSkills />
        </Article>
    );
}