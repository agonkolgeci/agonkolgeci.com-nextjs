import { useTranslations } from "next-intl";
import Section from "../_components/pages/Section";
import Teams, { Team, FABIEN_GRAYSSAGUEL, LEO_RIVIERES } from "../_components/utils/Team";
import { ExternalURL } from "../_components/utils/ExternalLink";
import { Card, CardContainer, CardImage, Cards } from "../_components/utils/ui/Card";
import HyperLinks from "../_components/utils/ui/HyperLink";
import { Orientation } from "../_components/utils/ui/Render";
import Tags from "../_components/utils/ui/Tag";

export type AbstractProject = {
    key: string,
    image: string,
    links?: ExternalURL[],
    tags?: string[],
    team?: Team[]
}

export function useProjects(): AbstractProject[] {
    return [
        {
            key: "project-family",
            image: "/gallery/project-family.webp",
            links: [
                { name: "website", href: "https://playze.org/project-family/" }
            ],
            tags: [ "lead-developer" ],
            team: [
                { role: "founders", members: [FABIEN_GRAYSSAGUEL] }
            ],
        },

        {
            key: "nexus",
            image: "/gallery/nexus.webp",
            links: [
                { name: "github", href: "https://github.com/agonkolgeci/Nexus" }
            ],
            tags: [ "founder", "lead-developer" ],
            team: [
                { role: "thanks", members: [FABIEN_GRAYSSAGUEL] }
            ]
        },

        {
            key: "stranger-hide",
            image: "/gallery/strangerhide.webp",
            links: [
                { name: "github", href: "https://github.com/StrangerHide/" }
            ],
            tags: [ "lead-developer" ],
            team: [
                { role: "founders", members: [LEO_RIVIERES, FABIEN_GRAYSSAGUEL] }
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
                { role: "collaborators", members: [FABIEN_GRAYSSAGUEL]}
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
                    <div className="flex justify-between gap-28">
                        <div className="flex flex-col">
                            <h2>{title}</h2>
                            <span>{date}</span>
                        </div>

                        <div className="block min-w-fit">
                            <HyperLinks links={links} />
                        </div>
                    </div>

                    {tags && <Tags tags={tags} />}

                    <div className="flex flex-col gap-2">
                        <p>{description}</p>
                    </div>

                    {team && <Teams team={team} />}
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

                            tags={project.tags}
                            team={project.team}

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