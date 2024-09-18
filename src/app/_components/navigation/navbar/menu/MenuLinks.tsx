"use client";

import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenu } from "../../../utils/links/menu";

export default function NavLinks() {
    const pathname = usePathname();

    const [opened, setOpened] = useState(false);

    const toggleMenu = useCallback(() => setOpened(curr => !curr), []);
    const closeMenu = useCallback(() => setOpened(false), []);

    useEffect(() => {
        const handleMove = () => { 
            if(opened) closeMenu();
        }

        window.addEventListener("resize", handleMove);
        window.addEventListener("scroll", handleMove);

        return () => {
            window.removeEventListener("resize", handleMove);
            window.removeEventListener("scroll", handleMove);
        };
    });

    return (
        <div className="flex flex-row font-semibold">
            <FontAwesomeIcon className="md:hidden size-8 hover:cursor-pointer" icon={opened ? faClose : faBars} onClick={toggleMenu} />

            <ul className={opened ? "flex flex-col absolute overflow-hidden top-full left-0 w-full h-screen p-10 gap-10 text-2xl bg-primary z-50" : "hidden md:flex flex-row gap-8"} onClick={closeMenu}>
                {useMenu().map(link => {
                    return (
                        <li key={link.name}>
                            <Link href={link.href} className={pathname === link.href ? "border-white border-b-2 pb-[2px]" : "hover:underline"}>{link.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}