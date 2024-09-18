import Link from "next/link";
import Article from "../_components/pages/article";
import Section from "../_components/pages/section";
import { CONTENTS } from "./contents";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Latest Updated: September 18, 2024"
};

export default function Terms() {
    return (
        <Article title={String(metadata.title)} description={String(metadata.description)}>
            <Section id="summary" title="Table of contents" description="Quick access to the sections." position={0}>
                <ul className="flex flex-col list-decimal p-[revert]">
                    {CONTENTS.map(content => {
                        return (
                            <li key={content.id}>
                                <Link className="text-blue-700" href={`#${content.id}`}>{content.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </Section>

            {CONTENTS.map(content => {
                const position = CONTENTS.indexOf(content) + 1;

                return (
                    <Section key={content.id} id={content.id} title={`${position}. ${content.title}`} position={position}>
                        {content.material}
                    </Section>
                )
            })}
        </Article>
    )
}