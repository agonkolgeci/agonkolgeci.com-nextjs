import Link from "next/link";
import Article from "../_components/pages/Article";
import Section from "../_components/pages/Section";
import useContents, { Content } from "./TermsContents";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Latest Updated: September 18, 2024"
};

export default function Terms() {
    const contents: Content[] = useContents();

    return (
        <Article title={String(metadata.title)} description={String(metadata.description)}>
            <Section id="summary" title="Table of contents" description="Quick access to the sections." position={0}>
                <ul className="flex flex-col list-decimal p-[revert]">
                    {contents.map(content => {
                        return (
                            <li key={content.id}>
                                <Link className="text-blue-700" href={`#${content.id}`}>{content.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </Section>

            {contents.map(content => {
                const position = contents.indexOf(content) + 1;

                return (
                    <Section key={content.id} id={content.id} title={`${position}. ${content.title}`} position={position}>
                        {content.material}
                    </Section>
                )
            })}
        </Article>
    )
}