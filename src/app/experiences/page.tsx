import Article from "../_components/pages/Article";
import Section from "../_components/pages/Section";
import Tags from "../_components/utils/ui/Tag";
import Languages from "../_components/utils/ui/Language";
import HyperLinks from "../_components/utils/ui/HyperLink";
import { Cards, Card, CardContainer, CardImage } from "../_components/utils/ui/Card";
import { Orientation } from "../_components/utils/ui/Render";
import { ExternalURL } from "../_components/utils/ExternalLink";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Discover my experiences in which I was able to solidify my knowledge and skills. These include both personal and professional experiences."
};


export default function Experiences() {
    const Experience = ({ image, title, date, links, languages, tags, description, tasks }: { image: string, title: string, date: string, links?: ExternalURL[], languages?: string[], tags?: string[], description: string, tasks: string[] }) => {
        return (
            <Card orientation={Orientation.VERTICAL}>
                <CardImage src={image} alt={title} className="w-full h-[200px]" border="rounded-t-2xl"/>

                <CardContainer orientation={Orientation.VERTICAL}>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <h3>{title}</h3>
                            <span>{date}</span>
                        </div>

                        <HyperLinks links={links} />
                    </div>

                    <div className="flex flex-row">
                        <Tags tags={tags} />
                        <Languages languages={languages} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p>{description}</p>
                    </div>

                    <ul className="flex flex-col gap-2 p-[revert] list-disc">
                        {tasks.map(task => (<li key={task}>{task}</li>))}
                    </ul>
                </CardContainer>
            </Card>
        );
    }

    return (
        <Article title={String(metadata.title)} description={String(metadata.description)}>
            <Section title="Personal Experiences" description="Thanks to my personal experiences, I've been able to solidify my skills in certain areas and acquire a real grasp of the environment." position={0}>
                <Cards className="grid-cols-[repeat(auto-fit,minmax(0,400px))] max-w-screen-2xl">
                    <Experience 
                        image="/experiences/web.webp"
                        title="Web Development"
                        date="started in 2022"
                        links={[
                            { name: "GitHub", href: "https://github.com/agonkolgeci/agonkolgeci.com-nextjs" },
                            { name: "V1", href: "https://v1.agonkolgeci.com/" }
                        ]}
                        languages={["React", "NextJS", "Tailwind CSS", "Sass", "TypeScript"]}
                        description="Execution of various projects related to web development, including the creation of responsive and dynamic websites. Projects include the design and implementation of front-end features using modern technologies."
                        tasks={[
                            "Creating interactive websites with familiar frameworks like React, NextJS", 
                            "Using CSS preprocessors like Sass for advanced styling",
                            "Optimizing website performance and accessibility"
                        ]}
                    />

                    <Experience 
                        image="/experiences/discord.webp"
                        title="Discord Development"
                        date="started in 2021"
                        links={[
                            { name: "GitHub", href: "https://github.com/agonkolgeci?tab=repositories&q=&type=source&language=javascript" }
                        ]}
                        languages={["Java", "JavaScript"]}
                        description="Realization of various projects related to the development of Discord bots and server management tools, particularly focused on enhancing user engagement and community automation."
                        tasks={[
                            "Designing and implementing new features using Java and JavaScript", 
                            "Integrating APIs and managing data flow between Discord and external services",
                            "Developing and maintaining custom bot commands to streamline server operations"
                        ]}
                    />

                    <Experience 
                        image="/experiences/minecraft.webp"
                        title="Minecraft Development"
                        date="started in 2018"
                        links={[
                            { name: "GitHub", href: "https://github.com/agonkolgeci?tab=repositories&q=&type=source&language=java" }
                        ]}
                        languages={["Java", "Redis", "MySQL", "Linux", "Bash"]}
                        description="Realization of various projects related to the operation of Minecraft servers, particularly in the development of Spigot/Bukkit plugins, management of servers and communications between them."
                        tasks={[
                            "Optimizing and implementing existing Java code or writing new systems (some available on GitHub)", 
                            "Deployment and commissioning of infrastructure in Linux environments",
                            "Discord bots development using the Discord API for community server automation"
                        ]}
                    />
                </Cards>
            </Section>

            <Section title="Professional Experiences" description="During my career, I was able to collaborate with diverse teams, and develop innovative solutions that supported operational success." position={1}>
                <Cards className="grid-cols-[repeat(auto-fit,minmax(0,400px))] max-w-screen-2xl">
                    <Experience 
                        image="/experiences/world-heberg.png"
                        title="World Heberg"
                        date="sept. 2020 - apr. 2021"
                        tags={["Volunteering"]}
                        description="Association providing free hosting services including web solutions, nodejs instances, cloud offerings and Sinus instances."
                        tasks={[
                            "Member of the administration team as Moderation team leader", 
                            "Development of Discord moderation tools necessary for the proper functioning of the moderation"
                        ]}
                    />

                    <Experience 
                        image="/experiences/buroplus.webp"
                        title="Buro +"
                        date="dec 2019"
                        links={[
                            { name: "Website", href: "https://www.buroplus.com/" }
                        ]}
                        tags={["Internship"]}
                        description="No.1 network for office/computer supplies in France."
                        tasks={[
                            "Verification of the authenticity of the material", 
                            "Order management and shelving",
                            "Registration of items using the software",
                            "Customer relationship / payment"
                        ]}
                    />
                </Cards>
            </Section>
        </Article>
    );
}