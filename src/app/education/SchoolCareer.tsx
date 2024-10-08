import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Section from "../_components/pages/Section";

export function useSchools(): AbstractSchool[] {
    return [
        { key: "unige",  url: "https://unige.ch/", image: "/education/unige.svg" },
        { key: "stael", url: "https://madame-de-stael.ent.auvergnerhonealpes.fr/" },
        { key: "jjr", url: "https://jeanjacquesrousseau-stjulien.ent.auvergnerhonealpes.fr/" }
    ]
}

export type AbstractSchool = {
    key: string,
    url: string,
    image?: string
}

export default function SchoolCareer() {
    const t = useTranslations("education.school_career");
    const schools = useSchools();

    const School = ({ title, date, description, url, image }: { title: string, date: string, description: string } & AbstractSchool) => {
        return (
            <li className="flex flex-col ms-8 gap-4 before:absolute before:bg-gradient-primary before:size-4 before:rounded-full before:mt-1.5 before:-start-2">
                <div className="flex flex-col">
                    <Link href={url} target="_blank">
                        <h3 className="text-primary">{title}</h3>
                    </Link>

                    <time className="text-gray-600">{date}</time>
                </div>
                
                <p>{description}</p>

                { image &&
                    <Link href={url} target="_blank">
                        <Image src={image} width={200} height={300} alt={title} />
                    </Link>
                }
            </li>
        );
    }

    return (
        <Section title={t("title")} description={t("description")} position={0}>
            <ul className="flex flex-col gap-16 relative border-s border-primary max-w-screen-md">
                {schools.map(school => {
                    const school_path = (`schools.${school.key}`);

                    return (
                        <School 
                            {...school}
                            key={school.key} 
                            
                            title={t(`${school_path}.title`)} 
                            date={t(`${school_path}.date`)} 
                            description={t(`${school_path}.description`)} 
                        />
                    )
                })}
            </ul>
        </Section>
    )
}