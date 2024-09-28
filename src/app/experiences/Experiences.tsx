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
    languages?: string[],

    options?: {
        tags?: number
        tasks?: number
    }
}

export function Experience({ image, links, languages, title, date, description, tags, tasks }: { title: string, date: string, description: string, tags?: string[], tasks?: string[] } & AbstractExperience) {
    return (
        <Card orientation={Orientation.VERTICAL}>
            <CardImage src={image} alt={title} className="w-full h-[200px]" border="rounded-t-2xl"/>

            <CardContainer orientation={Orientation.VERTICAL}>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h3>{title}</h3>
                        <span>{date}</span>
                    </div>

                    {links && <HyperLinks links={links} />}
                </div>

                {(tags || languages) &&
                    <div className="flex flex-row">
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
            </CardContainer>
        </Card>
    )
}

export default function Experiences({ t, experiences } : { t: any, experiences: AbstractExperience[] }) {
    return (
        <Cards className="grid-cols-[repeat(auto-fit,minmax(0,400px))] max-w-screen-2xl">
            {experiences.map(experience => {
                return (
                    <Experience 
                        key={experience.key} 
                        image={experience.image}
                        links={experience.links}
                        languages={experience.languages}

                        title={t(`experiences.${experience.key}.title`)}
                        date={t(`experiences.${experience.key}.date`)}
                        description={t(`experiences.${experience.key}.description`)}
                        tags={Array.from({ length: experience.options?.tags || 0 }, (_, i) => t(`experiences.${experience.key}.tags.${i}`))}
                        tasks={Array.from({ length: experience.options?.tasks || 0 }, (_, i) => t(`experiences.${experience.key}.tasks.${i}`))}
                    />
                )
            })}
        </Cards>
    )
}