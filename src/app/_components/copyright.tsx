import ExternalLink from "./utils/ExternalLink";

export default function Copyright() {
    return (
        <div className="flex flex-col">
            <p>Copyright © 2024 Agon KOLGECI • All Rights Reserved</p>

            <span>Build with <ExternalLink url={{ name: "Next.js", href: "https://nextjs.org/" }} /> and <ExternalLink url={{ name: "Tailwind CSS", href: "https://tailwindcss.com/" }} />, deployed with <ExternalLink url={{ name: "Vercel", href: "https://nextjs.org/" }} /> from <ExternalLink url={{ name: "GitHub", href: "https://github.com/agonkolgeci/agonkolgeci.com-nextjs" }} />.</span>
        </div>
    )
}