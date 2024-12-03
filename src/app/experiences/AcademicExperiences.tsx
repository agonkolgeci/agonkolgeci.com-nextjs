import { useTranslations } from "next-intl";
import Section from "../_components/pages/Section";
import Experiences, { AbstractExperience } from "./Experiences";

export function useAcademicExperiences(): AbstractExperience[] {
    return [
        {
            key: "swerc2024",
            image: "/experiences/swerc2024.webp",
            links: [
                { name: "Website", href: "https://swerc.eu/2024" },
                { name: "GitHub", href: "https://github.com/agonkolgeci/swerc2024" }
            ],
            languages: [ "C++" ],
            tasks: ["1", "2"]
        }
    ]
}

export default function AcademicExperiences() {
    const t = useTranslations("experiences.academic_experiences");
    const personal_experiences = useAcademicExperiences();

    return (
        <Section title={t("title")} description={t("description")} position={2}>
            <Experiences t={t} experiences={personal_experiences} />
        </Section>
    )
}