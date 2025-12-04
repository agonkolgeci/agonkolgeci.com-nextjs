import Link from "next/link"
import { ExternalURL } from "../ExternalLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

export function HyperLink({ link }: { link: ExternalURL }) {
    return (
        <Link href={link.href} target="_blank" className="relative group inline-flex items-center">
            <FontAwesomeIcon icon={link.icon || faArrowUpRightFromSquare} className="hover:scale-125 transition-all duration-300"/>

            <p className="pointer-events-none absolute left-1/2 -top-8 -translate-x-1/2 scale-95 opacity-0 rounded bg-gray-900 px-2 py-1 text-xs text-white transition-all duration-200 group-hover:scale-110 group-hover:opacity-100">
                {link.name}
            </p>
        </Link>
    )
}

export default function HyperLinks({ links }: { links?: ExternalURL[] }): React.ReactNode {
    return (
        <ul className="flex flex-row flex-wrap gap-4">
            {links?.map(link => {
                return (
                    <li key={link.name} className="text-2xl z-10">
                        <HyperLink link={link} />
                    </li>
                )
            })}
        </ul>
    )
}