"use client";

import Image from "next/image";

import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import NavLinks from "./navlinks";

export default function Navbar() {
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
        <nav className={`flex flex-row items-center justify-between h-[50px] max-w-screen-2xl mx-auto px-10`}>
            <figure className="flex items-center w-24 h-full relative">
                <Link href="/">
                    <Image className="object-cover object-center" src="/logo.png" fill={true} alt="Logo" />
                    </Link>
            </figure>

            <div className="flex flex-row font-semibold">
                <FontAwesomeIcon className="md:hidden w-10 h-10 hover:cursor-pointer" icon={opened ? faClose : faBars} onClick={toggleMenu} />
                <NavLinks className={opened ? "flex flex-col absolute overflow-hidden top-full left-0 w-full h-screen p-10 gap-10 text-2xl bg-primary z-50" : "hidden md:flex flex-row gap-8"} onClick={closeMenu} />
            </div>
        </nav>
    );
}