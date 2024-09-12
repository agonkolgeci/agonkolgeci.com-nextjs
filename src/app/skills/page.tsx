
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Article from "../_components/pages/article";
import Section from "../_components/pages/section";

import { faBolt, faPeopleGroup, faPerson, faSliders } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Slider, { Slide } from "../_components/utils/ui/slider";
import { Language } from "../_components/utils/ui/languages";
import { Metadata } from "next";

const LANGUAGES = ["Java", "JavaScript", "TypeScript", "Python", "C", "C++", "HTML", "CSS", "Sass", "MySQL", "Redis"];
const FRAMEWORKS = ["MySQL", "MongoDB", "Node", "React", "NextJS", "Tailwind CSS" ];
const TOOLS = ["Git", "GitHub", "GitLab", "Linux", "Bash", "Powershell" ];

export const metadata: Metadata = {
  title: "Skills",
  description: "Over the years, I've been able to develop and gain experience in a variety of skills."
};

export default function Skills() {
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
        <Article title="Skills" description="Over the years, I've been able to develop and gain experience in a variety of skills.">
            <Section title="IT Skills" description="Programming languages and tools I master." position={0}>
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
                    <ITSkill title="Languages" languages={LANGUAGES} />
                    <ITSkill title="Frameworks" languages={FRAMEWORKS} />
                    <ITSkill title="Tools" languages={TOOLS} />
                </ul>
            </Section>

            <Section title="Soft Skills" description="Various soft skills acquired during the different projects I've worked on." position={1}>
                <ul className="flex flex-col gap-16 max-w-screen-md">
                    <SoftSkill icon={faBolt} title="Motivation" description="I am highly motivated in everything I undertake and love exploring various topics." />
                    <SoftSkill icon={faSliders} title="Adaptation" description="I easily adapt to different situations and always strive to do my best." />
                    <SoftSkill icon={faPerson} title="Autonomy" description="I'm mainly self-taught, I know how to be autonomous to reach my goal." />
                    <SoftSkill icon={faPeopleGroup} title="Team Work" description="I am able to collaborate and respect different points of view in order to actively contribute to the group's objectives." />
                </ul>
            </Section>
        </Article>
    );
}