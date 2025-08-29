import exp from "constants";
import Teams, { Team } from "../_components/utils/Team";
import { ExternalURL } from "../_components/utils/ExternalLink";
import { Card, CardContainer, CardImage, Cards } from "../_components/utils/ui/Card";
import HyperLinks from "../_components/utils/ui/HyperLink";
import Languages from "../_components/utils/ui/Language";
import { Orientation } from "../_components/utils/ui/Render";
import Tags from "../_components/utils/ui/Tag";

export type AbstractExperience = {
    key: string,
    image: string,
    links?: ExternalURL[],
    tags?: string[],
    languages?: string[],
    tasks?: string[],
    team?: Team[]
}

export function Experience({ image, links, tags, team, languages, tasks, title, date, description }: { title: string, date: string, description: string } & AbstractExperience) {
    return (
        <Card orientation={Orientation.VERTICAL}>
            <CardImage src={image} alt={title} className="w-full h-[200px]" border="rounded-t-2xl"/>

            <CardContainer orientation={Orientation.VERTICAL}>
                <div className="flex justify-between gap-10">
                    <div className="flex flex-col">
                        <h3>{title}</h3>
                        <span>{date}</span>
                    </div>

                    {links && 
                        <div className="block min-w-fit">
                            <HyperLinks links={links} />
                        </div>
                    }
                </div>

                {(tags || languages) &&
                    <div className="flex flex-col gap-4">
                        {tags && <Tags tags={tags} />}
                        {languages && <Languages languages={languages} />}
                    </div>
                }

                <div className="flex flex-col gap-2">
                    <p>{description}</p>
                </div>

                { tasks &&
                    <ul className="flex flex-col gap-2 p-[revert] list-disc">
                        {tasks.map(task => (<li key={task}>{task}</li>))}
                    </ul>
                }

                { team && <Teams team={team} />}
            </CardContainer>
        </Card>
    )
}

export default function Experiences({ t, experiences } : { t: any, experiences: AbstractExperience[] }) {
    return (
        <Cards className="grid-cols-[repeat(auto-fit,minmax(0,500px))]">
            {experiences.map(experience => {
                const experience_path = (`contents.${experience.key}`);

                return (
                    <Experience 
                        {...experience}
                        key={experience.key}

                        tags={experience.tags}
                        team={experience.team}
                        
                        tasks={experience.tasks?.map(task => t(`${experience_path}.tasks.${task}`))}

                        title={t(`${experience_path}.title`)}
                        date={t(`${experience_path}.date`)}
                        description={t(`${experience_path}.description`)}
                    />
                )
            })}
        </Cards>
    )
}