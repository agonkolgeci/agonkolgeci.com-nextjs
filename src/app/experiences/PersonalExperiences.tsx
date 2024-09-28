import { useTranslations } from "next-intl";
import Section from "../_components/pages/Section";
import Experiences, { AbstractExperience } from "./Experiences";

export function usePersonalExperiences(): AbstractExperience[] {
    return [
        { 
            key: "web",
            image: "/experiences/web.webp",
            links: [
                { name: "GitHub", href: "https://github.com/agonkolgeci/agonkolgeci.com-nextjs" },
                { name: "V1", href: "https://v1.agonkolgeci.com/" }
            ],
            languages: ["React", "NextJS", "Tailwind CSS", "Sass", "TypeScript"],

            options: {
                tasks: 3
            }
        },

        { 
            key: "discord",
            image: "/experiences/discord.webp",
            links: [
                { name: "GitHub", href: "https://github.com/agonkolgeci?tab=repositories&q=&type=source&language=javascript" }
            ],
            languages: ["Java", "JavaScript"],

            options: {
                tasks: 3
            }
        },

        {
            key: "minecraft",
            image: "/experiences/minecraft.webp",
            links: [
                { name: "GitHub", href: "https://github.com/agonkolgeci?tab=repositories&q=&type=source&language=java" }
            ],
            languages: ["Java", "Redis", "MySQL", "Linux", "Bash"],
        
            options: {
                tasks: 3
            }
        }
    ]
}

export default function PersonalExperiences() {
    const t = useTranslations("experiences.personal_experiences");
    const personal_experiences = usePersonalExperiences();

    return (
        <Section title={t("title")} description={t("description")} position={0}>
            <Experiences t={t} experiences={personal_experiences} />
        </Section>
    )
}