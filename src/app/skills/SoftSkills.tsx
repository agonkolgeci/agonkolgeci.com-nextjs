import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBolt, faPeopleGroup, faPerson, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Section from "../_components/pages/Section";

export function useSoftSkills(): AbstractSoftSkill[] {
    return [
        { key: "motivation", icon: faBolt },
        { key: "adaptation", icon: faSliders },
        { key: "autonomy", icon: faPerson },
        { key: "team_work", icon: faPeopleGroup }
    ]
}

export type AbstractSoftSkill = {
    key: string,
    icon: IconProp
}

export default function SoftSkills() {
    const t = useTranslations("skills.soft_skills");
    const soft_skills = useSoftSkills();
    
    const SoftSkill = ({ icon, title, description }: { icon: IconProp, title: string, description: string }) => {
        return (
            <li className="flex flex-row items-center gap-8">
                <div className="text-primary text-5xl">
                    <FontAwesomeIcon fixedWidth={true} icon={icon} />
                </div>
                
                <div className="flex flex-col">
                    <h2 className="text-primary">{title}</h2>
                    <p className="text-lg">{description}</p>
                </div>
            </li>
        )
    }

    return (
        <Section title={t("title")} description={t("description")} position={1}>
            <ul className="flex flex-col gap-16 max-w-screen-md">
                {soft_skills.map(soft_skill => {
                    const soft_skill_path = (`contents.${soft_skill.key}`);

                    return (
                        <SoftSkill 
                            {...soft_skill}
                            key={soft_skill.key} 
                            
                            title={t(`${soft_skill_path}.title`)}
                            description={t(`${soft_skill_path}.description`)}
                        />
                    )
                })}
            </ul>
        </Section>
    )
}