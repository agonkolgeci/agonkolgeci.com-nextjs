"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

export const CONTACT_URL: ExternalURL = { name: "contact@agonkolgeci.com", href: "mailto:contact@agonkolgeci" };

export type ExternalURL = {
    name: string,
    href: string
}

export default function ExternalLink({ url, colored = true, blank = true }: { url: ExternalURL, colored?: boolean, blank?: boolean }) {
    const pathname = usePathname();

    return (
        <Link className={`${pathname === url.href ? "underline": null} hover:underline ${colored ? "text-blue-700" : "text-[inherit]" }`} href={url.href} target={blank ? "_blank" : undefined}>
            {url.name}
        </Link>
    )
}