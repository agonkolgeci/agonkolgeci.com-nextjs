import { useTranslations } from "next-intl";
import Link from "next/link";
import Copyright from "../_components/Copyright";
import Article from "../_components/pages/Article";
import Section from "../_components/pages/Section";
import { AGON_KOLGECI } from "../_components/utils/Collaborators";
import ExternalLink, { CONTACT_URL } from "../_components/utils/ExternalLink";
import { getPageMetadata, MetadataProps } from "../metadata";
import { AbstractContent, useContents } from "./TermsContents";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({ namespace: "terms", params });
}

export default function Terms() {
    const t = useTranslations("terms");
    const contents: AbstractContent[] = useContents();

    return (
        <Article title={t("title")} description={t("description")}>
            <Section id="summary" title="Table of contents" description="Quick access to the sections." position={0}>
                <ul className="flex flex-col list-decimal p-[revert]">
                    {contents.map(content => {
                        const content_path = (`contents.${content.key}`);

                        return (
                            <li key={content.key}>
                                <Link className="text-blue-700" href={`#${content.key}`}>{t(`${content_path}.title`)}</Link>
                            </li>
                        )
                    })}
                </ul>
            </Section>

            {contents.map(content => {
                const content_path = (`contents.${content.key}`);
                const position = contents.indexOf(content) + 1;

                return (
                    <Section key={content.key} id={content.key} title={`${position}. ${t(`${content_path}.title`)}`} position={position}>
                        <div className="flex flex-col max-w-screen-lg gap-8">
                            <div className="flex flex-col gap-4">
                                {content.texts.map(text => {
                                    return (
                                        <div key={text}>
                                            {t.rich(`${content_path}.texts.${text}`, {
                                                author: (() => <ExternalLink url={AGON_KOLGECI} />),
                                                terms: (() => <ExternalLink url={{name: "Terms of Service", href: "https://agonkolgeci.com/terms" }} />),
                                                contact: (() => <ExternalLink url={CONTACT_URL} />),
                                                copyright: (() => <Copyright/>),

                                                references: (() => {
                                                    return (
                                                        <ul className="list-disc p-[revert]">
                                                            <li><ExternalLink url={{name: "Google Images", href: "https://images.google.com/"}} /></li>
                                                            <li><ExternalLink url={{name: "Freepik Images", href: "https://freepik.com/"}} /></li>
                                                            <li><ExternalLink url={{name: "Devicon Icons", href: "https://devicon.dev/"}} /></li>
                                                            <li><ExternalLink url={{name: "FontAwesome Icons", href: "https://fontawesome.com/"}} /></li>
                                                        </ul>
                                                    )
                                                })
                                            })}
                                        </div>
                                    )
                                })}
                            </div>

                            <ExternalLink url={{name: "Back to top", href: "#summary"}} blank={false} />
                        </div>
                    </Section>
                )
            })}
        </Article>
    )
}