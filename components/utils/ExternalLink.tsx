"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link"
import { usePathname } from "next/navigation";

export const CONTACT_URL: ExternalURL = { name: "contact@agonkolgeci.com", href: "mailto:contact@agonkolgeci" };

export type ExternalURL = {
    name: string,
    icon?: IconDefinition,
    href: string
}

export default function ExternalLink({ url, colored = true, blank = true, className }: { url: ExternalURL, colored?: boolean, blank?: boolean, className?: string }) {
    const pathname = usePathname();

    const isActive = pathname === url.href;

    return (
        <Link className={className || `hover:underline ${isActive ? "underline" : ""} ${colored ? "text-accent-blue hover:opacity-80 transition-all font-semibold" : "text-inherit" }`} href={url.href} target={blank ? "_blank" : undefined}>
            {url.name}
        </Link>
    )
}