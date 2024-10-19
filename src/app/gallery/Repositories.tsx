"use client";

import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import Section from "../_components/pages/Section";
import { Repository, retrieveRepositories } from "../_components/utils/api/github";
import { Button, ButtonStyle } from "../_components/utils/ui/Button";
import { Card, CardContainer, Cards } from "../_components/utils/ui/Card";
import HyperLinks from "../_components/utils/ui/HyperLink";
import Languages from "../_components/utils/ui/Language";
import { Animation, Orientation } from "../_components/utils/ui/Render";
import Tags from "../_components/utils/ui/Tag";

export default function Repositories() {
    const t = useTranslations("gallery.repositories");

    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [archives, setHide] = useState(false);

    useEffect(() => {
        const fetchRepositories = async() => {
            const repositories = await retrieveRepositories();
            setRepositories(repositories);
        };

        fetchRepositories();
    }, []);

    const Repository = ({ name, description, html_url, homepage, language, topics, archived, is_template }: Repository) => {
        const color = () => {
            if(archived) return "bg-orange-500";
            if(is_template) return "bg-blue-500";

            return "bg-gray-500";
        }

        return (
            <Card orientation={Orientation.VERTICAL} animation={Animation.CLIMB}>
                <span className={`${color()} text-white p-1 w-full rounded-t-2xl`}></span>

                <CardContainer orientation={Orientation.VERTICAL}>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <h2 className="font-bold">
                                <Link href={html_url} target="_blank" className="static before:content-[''] before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-0">
                                    {name}
                                </Link>
                            </h2>
                        </div>

                        {homepage && <HyperLinks links={[ { name: "Homepage", href: homepage} ]} />}
                    </div>


                    <Languages languages={[language]}/>

                    <div className="flex flex-col gap-2">
                        <p>{description}</p>
                    </div>

                    <Tags tags={topics.slice(0, 5)} />
                </CardContainer>
            </Card>
        )
    }

    return (
        <Section title={t("title")} description={t("description")} position={1}>
            <div className="flex flex-col gap-8">
                <Cards className="grid-cols-[repeat(auto-fit,minmax(0,350px))] lg:justify-between max-w-screen-xl">
                    {repositories.filter(repository => (!repository.fork) && (repository.name !== repository.owner.login && (archives ? true : !repository.archived))).sort((a, b) => ((Number(a.archived) - Number(b.archived))) || (b.stargazers_count - a.stargazers_count)).map((repository) => {
                        return (
                            <Repository key={repository["name"]} {...repository} />
                        )
                    })}
                </Cards>

                <div className="flex flex-col justify-center items-center text-center gap-2">
                    <Button type="button" onClick={() => setHide(!archives)} style={ButtonStyle.ACTION} animation={Animation.DEFAULT}>
                        <p>{archives ? t("view_archives.hide") : t("view_archives.show")}</p>
                        <FontAwesomeIcon icon={archives ? faAngleUp : faAngleDown} />
                    </Button>

                    <p className="text-center max-w-md">{t("view_archives.description")}</p>
                </div>
            </div>
        </Section>
    )
}