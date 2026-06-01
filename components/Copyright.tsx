import { useTranslations } from "next-intl";
import ExternalLink from "./utils/ExternalLink";

export default function Copyright() {
    const t = useTranslations("copyright");

    const date = new Date();

    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full text-xs text-gray-500 border-t border-white/5 pt-8 select-none font-secondary">
            <p className="font-semibold text-gray-400">
                {t.rich("content", {
                    year: (() => date.getFullYear())
                })}
            </p>

            <span className="flex flex-wrap items-center justify-start lg:justify-center gap-1">
                {t.rich("details", {
                    nextjs: ((chunks) => <ExternalLink url={{ name: String(chunks), href: "https://nextjs.org/" }} />),
                    tailwindcss: ((chunks) => <ExternalLink url={{ name: String(chunks), href: "https://tailwindcss.com/" }} />),
                    vercel: ((chunks) => <ExternalLink url={{ name: String(chunks), href: "https://vercel.com/" }} />),
                    github: ((chunks) => <ExternalLink url={{ name: String(chunks), href: "https://github.com/agonkolgeci/agonkolgeci.com-nextjs" }} />)
                })}
            </span>
        </div>
    )
}