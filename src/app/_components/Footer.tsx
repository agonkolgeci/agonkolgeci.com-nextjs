import Image from "next/image";
import Link from "next/link";

import { useLegal } from "./utils/links/legal";
import { useMenu } from "./utils/links/menu";
import { useResources } from "./utils/links/resources";

import { useTranslations } from "next-intl";
import Copyright from "./Copyright";
import ExternalLink, { ExternalURL } from "./utils/ExternalLink";

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
                            <Bracket links={useResources()} blank={true} />
                        </Brackets>

                        {/* <Brackets title={t("location")}>
                            <Location/>
                        </Brackets> */}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 text-center">
                <Copyright />
            </div>
        </footer>
    );
}
