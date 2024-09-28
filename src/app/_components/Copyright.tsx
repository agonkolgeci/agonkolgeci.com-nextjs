import { useTranslations } from "next-intl";
import ExternalLink from "./utils/ExternalLink";

export default function Copyright() {
    const t = useTranslations("copyright");

    return (
        <div className="flex flex-col">
            <p>{t("content")}</p>

            <span>
                {t.rich("details", {
                    nextjs: ((chunks) => <ExternalLink url={{ name: chunks, href: "https://nextjs.org/" }} />),
                    tailwindcss: ((chunks) => <ExternalLink url={{ name: chunks, href: "https://vercel.com/" }} />),
                    vercel: ((chunks) => <ExternalLink url={{ name: chunks, href: "https://tailwindcss.com/" }} />),
                    github: ((chunks) => <ExternalLink url={{ name: chunks, href: "https://github.com/agonkolgeci/agonkolgeci.com-nextjs" }} />)
                })}
            </span>
        </div>
    )
}