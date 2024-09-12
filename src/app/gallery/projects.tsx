import Image from "next/image";
import { Card, CardContainer, CardImage, Cards } from "../_components/utils/ui/cards";
import { Orientation } from "../_components/utils/ui/render";
import HyperLinks from "../_components/utils/ui/hyperlinks";
import Tags from "../_components/utils/ui/tags";
import Link from "next/link";
import { ExternalURL } from "../_components/utils/links";
import { FABIEN_GRAYSSAGUEL, LEO_RIVIERES } from "../_components/utils/collaborators";

export function Projects() {
    const Project = ({ image, title, date, links, tags, description, team} : { image: string, title: string, date: string, links?: ExternalURL[], tags?: string[], description: string, team?: { role: string, authors: { name: string, href: string }[] }[] }) => {
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
        <Cards className="grid-cols-1 max-w-screen-xl">
            <Project 
                image="/gallery/project-family.webp"
                title="Project Family"
                date="2022 - present"
                links={[
                    { name: "Website", href: "https://playze.org/project-family/" }
                ]}
                tags={["Lead Developer"]}
                description="Project Family is a vanilla survival Minecraft server in the newest Java Edition which brought together a large number of people. Latest version: the 1.20, 'Trails and Tales' update."
                team={[
                    { role: "Founders", authors: [FABIEN_GRAYSSAGUEL] }
                ]}
            />

            <Project 
                image="/gallery/nexus.webp"
                title="Nexus"
                date="2024"
                links={[
                    { name: "GitHub", href: "https://github.com/agonkolgeci/Nexus" }
                ]}
                tags={["Founder", "Lead Developer"]}
                description="Nexus is my Minecraft mini-games server. The main purpose of this server is to list all the creations I've made over the years on Minecraft."
                team={[
                    { role: "Thanks", authors: [FABIEN_GRAYSSAGUEL]}
                ]}
            />

            <Project 
                image="/gallery/strangerhide.webp"
                title="Stranger Hide"
                date="2021 - present"
                links={[
                    { name: "GitHub", href: "https://github.com/StrangerHide/" }
                ]}
                tags={["Lead Developer"]}
                description="Stranger Hide is a hide-and-seek server in the theme of the Stranger Things series."
                team={[
                    { role: "Founders", authors: [LEO_RIVIERES, FABIEN_GRAYSSAGUEL] }
                ]}
            />

            <Project 
                image="/gallery/playze-family-bot.webp"
                title="Playze Family Bot"
                date="2020 - present"
                links={[
                    { name: "Discord", href: "https://discord.com/application-directory/1112083786130280488" }
                ]}
                tags={["Lead Developer"]}
                description="Playze Family is a Discord bot with a multitude of features such as the addition of an XP and level system with a ranking by chatting or interacting with other server members, the creation of Giveaways contests, the possible edition of the best rank obtainable for free from the server: the Custom Grade, the choice of notifications you wish to receive, the addition of the GPT Chat API (if you talk to it, it will answer you), etc. ..."
                team={[
                    { role: "Collaborators", authors: [FABIEN_GRAYSSAGUEL]}
                ]}
            />

            <Project 
                image="/gallery/berkasia.webp"
                title="Berkasia"
                date="2017 - 2021"
                links={[
                    { name: "GitHub", href: "https://github.com/Berkasia/" }
                ]}
                tags={["Founder", "Lead Developer"]}
                description="Minecraft PVP/Faction server featuring new events, a carefully thought-out economy and advanced systems to help you achieve your goals. Berkasia featured a completely Farm2Win system."
            />
        </Cards>
    )
}