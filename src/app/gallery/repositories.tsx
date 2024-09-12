"use client";

import { useState } from "react";
import { retrieveColorByType, retrieveRepositories } from "../_components/utils/api/github";
import { Animation, Orientation } from "../_components/utils/ui/render";
import { Card, CardContainer, Cards } from "../_components/utils/ui/cards";
import Link from "next/link";
import Languages from "../_components/utils/ui/languages";
import Tags from "../_components/utils/ui/tags";
import { Button, ButtonStyle } from "../_components/utils/ui/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import HyperLinks from "../_components/utils/ui/hyperlinks";

export function Repositories({ repositories } : { repositories : any[] }) {
    const [archives, setHide] = useState(false);

    const Repository = ({ repository }: { repository: any }) => {
        return (
            <Card orientation={Orientation.VERTICAL} animation={Animation.CLIMB}>
                <span className={`${retrieveColorByType(repository)} text-white p-1 w-full rounded-t-2xl`}></span>

                <CardContainer orientation={Orientation.VERTICAL}>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <h2 className="font-bold">
                                <Link href={repository["html_url"]} target="_blank" className="static before:content-[''] before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-0">{repository["name"]}</Link>
                            </h2>
                        </div>

                        {repository["homepage"] ? <HyperLinks links={[ { name: "Homepage", href: repository["homepage"]} ]} /> : null}
                    </div>


                    <Languages languages={[repository["language"]]}/>

                    <div className="flex flex-col gap-2">
                        <p>{repository["description"]}</p>
                    </div>

                    <Tags tags={repository["topics"].slice(0, 5)} />
                </CardContainer>
            </Card>
        )
    }

    return (
        <div className="flex flex-col gap-8">
            <Cards className="grid-cols-[repeat(auto-fit,minmax(0,350px))] lg:justify-between max-w-screen-xl">
                {repositories.filter(repository => (!repository["fork"]) && (repository["name"] !== repository.owner["login"] && (archives ? true : !repository["archived"]))).sort((a, b) => ((a["archived"] - b["archived"])) || (b["stargazers_count"] - a["stargazers_count"])).map((repository) => {
                    return (
                        <Repository key={repository["name"]} repository={repository} />
                    )
                })}
            </Cards>

            <div className="flex flex-col justify-center items-center text-center gap-2">
                <Button type="button" onClick={() => setHide(!archives)} style={ButtonStyle.ACTION} animation={Animation.DEFAULT}>
                    <p>{archives ? "Hide archives" : "View archives"}</p>
                    <FontAwesomeIcon icon={archives ? faAngleUp : faAngleDown} />
                </Button>

                <p className="text-center max-w-md">Archived repositories are outdated and no longer representative of my current work.</p>
            </div>
        </div>
    )
}