import { useTranslations } from "next-intl";
import Section from "../_components/pages/Section";
import { Cards } from "../_components/utils/ui/Card";
import Experiences from "./Experiences";
import Experience, { AbstractExperience } from "./Experiences";

export function useProfessionalExperiences(): AbstractExperience[] {
    return [
        {
            key: "world-heberg",
            image: "/experiences/world-heberg.png",

            options: {
                tags: 1,
                tasks: 2
            }
        },

        {
            key: "buro_plus",
            image: "/experiences/buroplus.webp",
            links: [
                { name: "Website", href: "https://www.buroplus.com/" }
            ],

            options: {
                tags: 1,
                tasks: 4
            }
        }
    ]
}

export default function ProfessionalExperiences() {
    const t = useTranslations("experiences.professional_experiences");
    const personal_experiences = useProfessionalExperiences();


    return (
        <Section title={t("title")} description={t("description")} position={1}>
            <Experiences t={t} experiences={personal_experiences} />
        </Section>
    )
}