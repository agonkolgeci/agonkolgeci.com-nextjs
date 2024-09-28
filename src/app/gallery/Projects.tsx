import { Card, CardContainer, CardImage, Cards } from "../_components/utils/ui/Card";
import { Orientation } from "../_components/utils/ui/Render";
import HyperLinks from "../_components/utils/ui/HyperLink";
import Tags from "../_components/utils/ui/Tag";
import Link from "next/link";
import { ExternalURL } from "../_components/utils/ExternalLink";
import { Collaborators, FABIEN_GRAYSSAGUEL, LEO_RIVIERES } from "../_components/utils/Collaborators";
import Section from "../_components/pages/Section";
import { useTranslations } from "next-intl";

export type AbstractProject = {
    key: string,
    image: string,
    links?: ExternalURL[],
    tags?: string[],
    team?: Collaborators[]
}

export function useProjects(): AbstractProject[] {
    return [
        {
            key: "project-family",
            image: "/gallery/project-family.webp",
            links: [
                { name: "Website", href: "https://playze.org/project-family/" }
            ],
            tags: [ "lead-developer" ],
            team: [
                { role: "founders", authors: [FABIEN_GRAYSSAGUEL] }
            ],
        },

        {
            key: "nexus",
            image: "/gallery/nexus.webp",
            links: [
                { name: "GitHub", href: "https://github.com/agonkolgeci/Nexus" }
            ],
            tags: [ "founder", "lead-developer" ],
            team: [
                { role: "thanks", authors: [FABIEN_GRAYSSAGUEL] }
            ]
        },

        {
            key: "stranger-hide",
            image: "/gallery/strangerhide.webp",
            links: [
                { name: "GitHub", href: "https://github.com/StrangerHide/" }
            ],
            tags: [ "lead-developer" ],
            team: [
                { role: "founders", authors: [LEO_RIVIERES, FABIEN_GRAYSSAGUEL] }
            ]
        },

        {
            key: "playze-family-bot",
            image: "/gallery/playze-family-bot.webp",
            links: [
                { name: "Discord", href: "https://discord.com/application-directory/1112083786130280488" }
            ],
            tags: [ "lead-developer" ],
            team: [
                { role: "collaborators", authors: [FABIEN_GRAYSSAGUEL]}
            ]
        },

        {
            key: "berkasia",
            image: "/gallery/berkasia.webp",
            links: [
                { name: "GitHub", href: "https://github.com/Berkasia/" }
            ],
            tags: [ "founder", "lead-developer" ]
        }
    ]
}

export default function Projects() {
    const t = useTranslations("gallery.projects");
    const projects = useProjects();

    const Project = ({ image, links, team, title, date, description, tags} : { title: string, date: string, description: string } & AbstractProject) => {
        return (
            <Card orientation={Orientation.HORIZONTAL}>
                <CardImage src={image} alt={title} className="w-full h-[200px] lg:w-[400px] lg:h-full" border="rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none"/>

                <CardContainer orientation={Orientation.VERTICAL}>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <h2>{title}</h2>
                            <span>{date}</span>
                        </div>

                        <HyperLinks links={links} />
                    </div>

                    <Tags tags={tags} />

                    <div className="flex flex-col gap-2">
                        <p>{description}</p>
                    </div>

                    <ul className="flex flex-col gap-2 p-[revert] list-disc">
                        {team?.map(team => {
                            return (
                                <li key={team.role}>
                                    <ul className="flex flex-row flex-wrap gap-2">
                                        <p>{team.role}:</p>

                                        <li className="flex flex-[inherit] gap-[inherit]">
                                            {team.authors.map(author => {
                                                return (
                                                    <Link key={author.name} href={author.href} target="_blank" className="underline">{author.name}</Link>
                                                )
                                            })}
                                        </li>
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>
                </CardContainer>
            </Card>
        )
    }

    return (
        <Section title={t("title")} description={t("description")} position={0}>
            <Cards className="grid-cols-1 max-w-screen-xl">
                {projects.map(project => {
                    const project_path = (`contents.${project.key}`);

                    return (
                        <Project
                            {...project}

                            key={project.key}

                            tags={project.tags?.map(tag => t(`tags.${tag}`))}
                            team={project.team?.map(team => ({ role: t(`team.${team.role}`), authors: team.authors }))}

                            title={t(`${project_path}.title`)}
                            date={t(`${project_path}.date`)}
                            description={t(`${project_path}.description`)}
                        />
                    )
                })}
            </Cards>
        </Section>
    )
}