"use client";

import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCallback, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenu } from "../../../utils/links/menu";

export default function NavMenu() {
    const pathname = usePathname();

    const [opened, setOpened] = useState(false);

    const toggleMenu = useCallback(() => setOpened(curr => !curr), []);
    const closeMenu = useCallback(() => setOpened(false), []);

    const NavLinks = () => {
        return (
            useMenu().map(link => {
                return (
                    <li key={link.name} onClick={closeMenu}>
                        <Link href={link.href} className={pathname === link.href ? "border-white border-b-2 pb-[2px]" : "hover:underline"}>{link.name}</Link>
                    </li>
                )
            })
        )
    }

    return (
        <div className="flex flex-row">
            {/* DESKTOP VIEW */}
            <ul className="hidden lg:flex flex-row font-semibold gap-8">
                <NavLinks/>
            </ul>

            {/* TABLET VIEW */}
            <div className="flex flex-row">
                <FontAwesomeIcon className="lg:hidden text-3xl hover:cursor-pointer" icon={opened ? faClose : faBars} fixedWidth onClick={toggleMenu} />

                { opened && (<ul className="flex lg:hidden flex-col absolute top-full right-0 w-full h-max p-10 gap-8 text-xl font-semibold border-t-[1px] border-t-white bg-primary overflow-y-scroll">
                    <NavLinks/>
                </ul>) }
            </div>
        </div>
    );
}