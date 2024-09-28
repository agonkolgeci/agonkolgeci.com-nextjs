
import Article from "../_components/pages/Article";

import { useTranslations } from "next-intl";
import { MetadataProps, usePageMetadata  } from "../metadata";
import SoftSkills from "./SoftSkills";
import ITSkills from "./ITSkills";

export async function generateMetadata(props: MetadataProps) {
    return usePageMetadata({namespace: "skills", ...props});
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