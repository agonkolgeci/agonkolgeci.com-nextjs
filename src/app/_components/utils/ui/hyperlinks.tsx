import Link from "next/link"
import Icon from "./icons"
import { ExternalURL } from "../links"

export function HyperLink({ link }: { link: ExternalURL }) {
    return (
        <Link href={link.href} target="_blank">
            <Icon {...link}/>
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