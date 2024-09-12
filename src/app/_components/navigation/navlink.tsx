"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink(props: React.ComponentPropsWithoutRef<typeof Link>) {
    const pathname = usePathname();

    return (
        <Link className={pathname === props.href ? "border-white border-b-2 pb-[2px]" : "hover:underline"} {...props} />
    );
}