import { useTranslations } from "next-intl";
import Article from "../_components/pages/Article";
import { MetadataProps, getPageMetadata } from "../metadata";
import PersonalExperiences from "./PersonalExperiences";
import ProfessionalExperiences from "./ProfessionalExperiences";

export async function generateMetadata({ params }: MetadataProps) {
    return getPageMetadata({namespace: "experiences", params});
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