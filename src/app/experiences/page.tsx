import Article from "../_components/pages/Article";
import { MetadataProps, usePageMetadata } from "../metadata";
import { useTranslations } from "next-intl";
import PersonalExperiences from "./PersonalExperiences";
import ProfessionalExperiences from "./ProfessionalExperiences";

export async function generateMetadata(props: MetadataProps) {
    return usePageMetadata({namespace: "experiences", ...props});
}

export default function Experiences() {
    const t = useTranslations("experiences");

    return (
        <Article title={t("title")} description={t("description")}>
            <PersonalExperiences />
            <ProfessionalExperiences />
        </Article>
    );
}