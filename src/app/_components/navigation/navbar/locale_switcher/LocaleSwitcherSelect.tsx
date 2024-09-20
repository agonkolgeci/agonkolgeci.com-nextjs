"use client";

import { Button, ButtonStyle } from "@/app/_components/utils/ui/Button";
import { Locale } from "@/i18n/locales";
import { setUserLocale } from "@/services/locale";
import { faCheckCircle, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useCallback, useEffect, useState, useTransition } from "react";

export default function LocaleSwitcherSelect() {
    const [isPending, startTransition] = useTransition();

    const [opened, setOpened] = useState(false);

    const toggleMenu = useCallback(() => setOpened(curr => !curr), []);
    const closeMenu = useCallback(() => setOpened(false), []);


    useEffect(() => {
        const handleMove = () => { 
            if(opened) closeMenu();
        }

        window.addEventListener("scroll", handleMove);

        return () => {
            window.removeEventListener("scroll", handleMove);
        };
    });

    const handleChange = (event: any) => {
        event.preventDefault();

        startTransition(() => {
            setUserLocale(event.target.value);
        });
    }

    return (
        <div className="flex flex-row relative">
            <button className="block text-2xl">
                <FontAwesomeIcon className="hover:cursor-pointer" icon={faGlobe} fixedWidth onClick={toggleMenu} />
            </button>

            {opened ? (
                <ul className="flex flex-col gap-2 absolute top-full right-0 bg-primary my-4 py-2 rounded-lg">
                    <li className="bg-white text-black hover:text-black hover:bg-white w-full py-1 px-6 hover:cursor-pointer flex flex-row items-center gap-4">
                        <figure className="size-6 relative">
                            <Image className="rounded-full" src="/locales/en.svg" fill={true} alt="EN" />
                        </figure>

                        <p>English</p>
                    </li>

                    <li className=" hover:text-black hover:bg-white w-full py-1 px-6 hover:cursor-pointer flex flex-row items-center gap-4">
                        <figure className="size-6 relative">
                            <Image className="rounded-full" src="/locales/fr.svg" fill={true} alt="EN" />
                        </figure>

                        <p>French</p>
                    </li>
                </ul>
            ): null}

            {/* {items.map(item => {
                return (
                    <option key={item.label} className="text-black bg-transparent p-0" value={item.value}>{item.label}</option>
                )
            })} */}
        </div>

        // <Select icon={faGlobe} items={items} onChange={handleChange} />
    )
}