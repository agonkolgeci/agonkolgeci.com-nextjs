"use client";

import { faAngleDown, faAngleUp, faCodeFork, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
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
import Topics from "../_components/utils/ui/Topic";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

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

    const Property = ({id, count, icon}: {id: string, count: number, icon: IconProp}) => {
        return (
            <div className="flex flex-row gap-3 items-center repo">
                <FontAwesomeIcon className="property size-4" icon={icon} data-status={id}/>

                <div className="flex flex-row gap-1">
                    <p className="flex font-bold size-2 justify-center">{count}</p>
                    <p className="font-normal">{t(`properties.${id}`, {count})}</p>
                </div>
            </div>
        )
    }

    const Repository = (repo: Repository) => {
        const color = () => {
            if(repo.archived) return "bg-orange-500";
            if(repo.is_template) return "bg-blue-500";

            return "bg-gray-500";
        }

        return (
            <Card orientation={Orientation.VERTICAL} animation={Animation.CLIMB}>
                <span className={`${color()} text-white p-1 w-full rounded-t-2xl`}></span>

                <CardContainer orientation={Orientation.VERTICAL}>
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <h2 className="font-bold">
                                    <Link href={repo.html_url} target="_blank" className="static before:content-[''] before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-0">
                                        {repo.name}
                                    </Link>
                                </h2>
                            </div>

                            {repo.homepage && <HyperLinks links={[ { name: "Homepage", href: repo.homepage} ]} />}
                        </div>

                        {(repo.stargazers_count > 0 || repo.forks_count > 0) && 
                            <div className="flex flex-col">
                                {repo.stargazers_count > 0 && <Property id="stars" count={repo.stargazers_count} icon={faStar}/>}
                                {repo.forks_count > 0 && <Property id="forks" count={repo.forks_count} icon={faCodeFork}/>}
                            </div>
                        }
                    </div>

                    {repo.language && <Languages languages={[repo.language]}/>}
                    
                    {repo.description && 
                        <div className="flex flex-col gap-2">
                            <p>{repo.description}</p>
                        </div>
                    }

                    {repo.topics && <Topics tags={repo.topics.slice(0, 5)} /> }
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