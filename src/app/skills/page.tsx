
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Article from "../_components/pages/Article";
import Section from "../_components/pages/Section";

import { faBolt, faPeopleGroup, faPerson, faSliders } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Slider, { Slide } from "../_components/utils/ui/Slider";
import { Language } from "../_components/utils/ui/Language";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

const LANGUAGES = ["Java", "JavaScript", "TypeScript", "Python", "C", "C++", "HTML", "CSS", "Sass"];
const FRAMEWORKS = ["Node", "React", "NextJS", "Tailwind CSS", "Redis"];
const TOOLS = ["Git", "GitHub", "GitLab", "Linux", "Bash", "Powershell", "MySQL", "MongoDB" ];

export async function generateMetadata({params: { locale }} : { params: {locale: string} }): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: "skills"});

  return {
    title: t("title"),
    description: t("description")
  }
}

export default function Skills() {
    const t = useTranslations("skills");

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
        <Article title={t("title")} description={t("description")}>
            <Section title={t("it_skills.title")} description={t("it_skills.description")} position={0}>
                <div className="block w-full max-w-[600px]">
                    <Slider>
                        {[...LANGUAGES, ...FRAMEWORKS, ...TOOLS].map(skill => {
                            return (
                                <Slide key={skill}>
                                    <Language name={skill} />
                                </Slide>
                            )
                        })}
                    </Slider> 
                </div>
                
                <ul className="flex flex-row flex-wrap gap-x-24 gap-y-12">
                    <ITSkill title={t("it_skills.languages")} languages={LANGUAGES} />
                    <ITSkill title={t("it_skills.frameworks")} languages={FRAMEWORKS} />
                    <ITSkill title={t("it_skills.tools")} languages={TOOLS} />
                </ul>
            </Section>

            <Section title={t("soft_skills.title")} description={t("soft_skills.description")} position={1}>
                <ul className="flex flex-col gap-16 max-w-screen-md">
                    <SoftSkill icon={faBolt} title={t("soft_skills.motivation.title")} description={t("soft_skills.motivation.description")} />
                    <SoftSkill icon={faSliders} title={t("soft_skills.adaptation.title")}  description={t("soft_skills.adaptation.description")} />
                    <SoftSkill icon={faPerson} title={t("soft_skills.autonomy.title")} description={t("soft_skills.autonomy.description")} />
                    <SoftSkill icon={faPeopleGroup} title={t("soft_skills.team_work.title")} description={t("soft_skills.team_work.description")} />
                </ul>
            </Section>
        </Article>
    );
}