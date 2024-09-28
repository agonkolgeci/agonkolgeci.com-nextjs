import { useTranslations } from "next-intl"
import Section from "../_components/pages/Section";
import Slider, { Slide } from "../_components/utils/ui/Slider";
import { Language } from "../_components/utils/ui/Language";

export function useITSkills(): AsbtractITSkill[] {
    return [
        { key: "languages", languages: ["Java", "JavaScript", "TypeScript", "Python", "C", "C++", "HTML", "CSS", "Sass"] },
        { key: "frameworks", languages: ["Node", "React", "NextJS", "Tailwind CSS", "Redis"] },
        { key: "tools", languages: ["Git", "GitHub", "GitLab", "Linux", "Bash", "Powershell", "MySQL", "MongoDB" ] }
    ]
}

export type AsbtractITSkill = {
    key: string,
    languages: string[]
}

export default function ITSkills() {
    const t = useTranslations("skills.it_skills");
    const it_skills = useITSkills();
    
    const ITSkill = ({ title, languages }: { title: string, languages: string[] }) => {
        return (
            <li className="flex flex-col gap-2">
                <h3 className="text-primary">{title}</h3>
                <ul className="flex flex-col">
                    {languages.map(language => {
                        return (
                            <li key={language}>{language}</li>
                        )
                    })}
                </ul>
            </li>
        );
    }

    return (
        <Section title={t("title")} description={t("description")} position={0}>
            <div className="block w-full max-w-[600px]">
                <Slider>
                    {it_skills.flatMap(it_skill => it_skill.languages).map(content => {
                        return (
                            <Slide key={content}>
                                <Language name={content} />
                            </Slide>
                        )
                    })}
                </Slider> 
            </div>
                
            <ul className="flex flex-row flex-wrap gap-x-24 gap-y-12">
                {it_skills.map(it_skill => {
                    const it_skill_path = (`contents.${it_skill.key}`);

                    return (
                        <ITSkill 
                            {...it_skill}
                            key={it_skill.key} 

                            title={t(`${it_skill_path}.title`)} 
                        />
                    )
                })}
            </ul>
        </Section>
    )
}