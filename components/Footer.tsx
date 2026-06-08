import Image from "next/image";
import Link from "next/link";

import { useLegal } from "./utils/links/legal";
import { useMenu } from "./utils/links/menu";
import { useResources } from "./utils/links/resources";

import { useTranslations } from "next-intl";
import Copyright from "./Copyright";
import ExternalLink, { ExternalURL } from "./utils/ExternalLink";

function Brackets({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-3 min-w-[140px]">
            <h4 className="uppercase tracking-widest text-[10px] text-gray-500 font-extrabold font-secondary border-b border-white/5 pb-2">{title}</h4>
            {children}
        </div>
    );
}

function Bracket({ links, blank }: { links: ExternalURL[], blank?: boolean }) {
    return (
        <ul className="flex flex-col gap-2">
            {links.map(link => {
                return (
                    <li key={link.name} className="py-0.5">
                        <ExternalLink url={link} colored={false} blank={blank} className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-medium cursor-pointer" />
                    </li>
                )
            })}
        </ul>
    );
}

export default function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="w-full z-40 bg-primary">
            <div className="w-full bg-[#030303] border-t border-white/5">
                <div className="flex flex-col justify-between max-w-screen-2xl mx-auto px-10 py-16 gap-16">
                    <div className="flex flex-col xl:flex-row justify-between gap-12">
                        <div className="flex flex-col gap-6">
                            <figure className="flex w-36 h-12 opacity-60 hover:opacity-100 transition-all duration-300">
                                <Link href="/" className="relative block w-full h-full">
                                    <Image className="object-contain object-left" src="/banner.png" fill={true} sizes="144px" alt={t("banner")} />
                                </Link>
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
                        </div>
                    </div>

                    <Copyright />
                </div>
            </div>
        </footer>
    );
}
