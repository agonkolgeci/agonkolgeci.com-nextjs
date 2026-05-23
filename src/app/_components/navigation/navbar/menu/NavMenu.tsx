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

    const toggleMenu = useCallback(() => setOpened((curr) => !curr), []);
    const closeMenu = useCallback(() => setOpened(false), []);

    const NavLinks = () =>
        useMenu().map((link) => (
            <li key={link.name} onClick={closeMenu}>
                <Link
                    href={link.href}
                    className={
                        pathname === link.href
                            ? "text-white font-semibold border-b border-white/40 pb-0.5"
                            : "text-white/50 font-medium hover:text-white/90 transition-colors duration-200"
                    }
                >
                    {link.name}
                </Link>
            </li>
        ));

    return (
        <div className="flex flex-row">
            {/* Desktop */}
            <ul className="hidden lg:flex flex-row gap-8 text-sm">
                <NavLinks />
            </ul>

            {/* Mobile */}
            <div className="flex lg:hidden flex-row">
                <button
                    onClick={toggleMenu}
                    className="text-white/50 hover:text-white transition-colors"
                    aria-label="Toggle menu"
                >
                    <FontAwesomeIcon className="size-5" icon={opened ? faClose : faBars} />
                </button>

                {opened && (
                    <ul
                        className="flex lg:hidden flex-col absolute top-full right-0 w-full p-8 gap-6 text-lg font-medium border-t border-white/[0.06]"
                        style={{ background: "rgba(9,9,11,0.96)", backdropFilter: "blur(20px)" }}
                    >
                        <NavLinks />
                    </ul>
                )}
            </div>
        </div>
    );
}
