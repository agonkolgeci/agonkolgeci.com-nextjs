import Image from "next/image";
import Link from "next/link";

import { useResources } from "./utils/links/resources";
import { useMenu } from "./utils/links/menu";
import { useLegal } from "./utils/links/legal";

import ExternalLink, { ExternalURL } from "./utils/ExternalLink";
import Copyright from "./Copyright";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("footer");

    const Brackets = ({ title, children }: { title: string, children: React.ReactNode }) => {
        return (
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg">{title}</h3>

                {children}
            </div>
        );
    }

    const Bracket = ({ links, blank }: { links: ExternalURL[], blank?: boolean }) => {
        return (
            <ul className="flex flex-col gap-2">
                {links.map(link => {
                    return (
                        <li key={link.name}>
                            <ExternalLink url={link} colored={false} blank={blank} />
                        </li>
                    )
                })}
            </ul>
        );
    }


    return (
        <footer className="w-full z-50 bg-primary">
            <div className="w-full bg-secondary">
                <div className="flex flex-col xl:flex-row justify-between gap-12 max-w-screen-2xl mx-auto px-10 py-20">
                    <div className="flex flex-col gap-8">
                        <figure className="flex w-52 h-28 relative">
                            <Link href="/"><Image className="object-contain object-center" src="/banner.png" fill={true} alt={t("banner")} /></Link>
                        </figure>

                        <Brackets title={t("legal")}>
                            <Bracket links={useLegal()} blank={false} />
                        </Brackets>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                        <Brackets title={t("navigation")}>
                            <Bracket links={useMenu()} blank={false} />
                        </Brackets>

                        <Brackets title={t("resources")}>
                            <Bracket links={useResources()} blank={false} />
                        </Brackets>

                        <Brackets title={t("location")}>
                            <div className="flex flex-col gap-[inherit]">
                                <ul className="flex flex-col">
                                    <li>Uni-Mail</li>
                                    <li>Bd du Pont-d'Arve 40</li>
                                    <li>1205 Geneva, Switzerland</li>
                                </ul>

                                <iframe className="w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.7808719277073!2d6.137296077427251!3d46.194919084386626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c7ad59a95c06f%3A0x405b734617bdd72c!2sUni%20Mail%2C%20Bd%20du%20Pont-d&#39;Arve%2040%2C%201205%20Gen%C3%A8ve%2C%20Suisse!5e0!3m2!1sfr!2sfr!4v1720084813406!5m2!1sfr!2sfr" />
                            </div>
                        </Brackets>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 text-center">
                <Copyright />
            </div>
        </footer>
    );
}
