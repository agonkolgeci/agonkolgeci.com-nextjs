import { useTranslations } from "next-intl";
import Section from "../_components/pages/Section";
import Experiences, { AbstractExperience } from "./Experiences";
import { ALEXANDRE_RIEDO, ANTOINE_MAENDLY, CHRISTOPHE_CHARPILLOZ, DELPHINE_COURVOISIER, ELIE_BUSSOD, JEAN_LUC_FALCONE } from "../_components/utils/Team";
import { faBook,  } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function useAcademicExperiences(): AbstractExperience[] {
    return [
        {
            key: "redcap-swisscom-module",
            image: "/experiences/redcap.webp",
            links: [
                { name: "REDCap Documentation", icon: faBook, href: "https://github.com/vanderbilt-redcap/external-module-framework-docs" },
                { name: "LinkedIn", icon: faBook, href: "https://www.linkedin.com/in/agon-kolgeci-193aa2266/details/projects/1845300922/multiple-media-viewer?profileId=ACoAAEFNEH8B107RMPVu2EN12QzgvvXhLXPSbys&treasuryMediaId=1756339441754&type=LINK&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_media_list_details_modal%3BLxQTEceQRvC07TFJz606LA%3D%3D" }
            ],
            tags: [ "unige" ],
            languages: [ "php", "docker", "mysql" ],
            tasks: ["1", "2", "3", "4"],
            team: [
                { role: "collaborators", members: [ANTOINE_MAENDLY, ELIE_BUSSOD]},
                { role: "supervisors", members: [JEAN_LUC_FALCONE, CHRISTOPHE_CHARPILLOZ]},
                { role: "clients", members: [DELPHINE_COURVOISIER]}
            ]
        },

        {
            key: "swerc2024",
            image: "/experiences/swerc2024.webp",
            links: [
                { name: "Website", href: "https://swerc.eu/2024" },
                { name: "GitHub", icon: faGithub, href: "https://github.com/agonkolgeci/swerc2024" }
            ],
            tags: [ "unige" ],
            languages: [ "C++" ],
            tasks: ["1", "2"],
            team: [
                { role: "collaborators", members: [ANTOINE_MAENDLY, ALEXANDRE_RIEDO]}
            ]
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