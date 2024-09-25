"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";

export type DropdownItem = {
    content: React.ReactNode,
    value: string
}

export type DropdownButton = {
    label?: string,
    icon?: IconProp
}

export type DropdownCallback = (newValue: string) => void;

export default function Dropdown({ button, items, defaultValue, disabled = false, onChange }: { button: DropdownButton, items: DropdownItem[], defaultValue: string, disabled?: boolean, onChange?: DropdownCallback }) {
    const [currentValue, setCurrentValue] = useState<string>(defaultValue);
    const handleChange: DropdownCallback = (newValue) => {
        if(onChange) onChange(newValue);

        setCurrentValue(newValue);
        closeMenu();
    }

    const [opened, setOpened] = useState(false);

    const trigger = useRef<HTMLButtonElement>(null);
    const dropdown = useRef<HTMLUListElement>(null);

    const toggleMenu = useCallback(() => setOpened(curr => !curr), []);
    const closeMenu = useCallback(() => setOpened(false), []);

    useEffect(() => {
        if (!opened) return;

        const handleClick = (event: any) => {
            if (!dropdown.current?.contains(event.target) && !trigger.current?.contains(event.target)) {
                closeMenu();
            }
        }

        window.addEventListener("scroll", closeMenu);
        window.addEventListener("mousedown", handleClick);

        return () => {
            window.removeEventListener("scroll", closeMenu);
            window.removeEventListener("mousedown", handleClick);
        };
    }, [opened, closeMenu]);

    return (
        <div className="flex flex-row relative">
            <button className="block text-2xl hover:cursor-pointer" onClick={toggleMenu} ref={trigger}>
                {button.label && <p>{button.label}</p>}
                {button.icon && <FontAwesomeIcon icon={button.icon} fixedWidth />}
            </button>

            {opened && (
                <ul className={`flex flex-col gap-2 absolute top-full right-0 bg-primary my-4 py-4 rounded-lg ${disabled ? "pointer-events-none opacity-50" : ""}`} ref={dropdown}>
                    {items.map(item => {
                        const isActive = item.value === currentValue;

                        return (
                            <li key={item.value} className={`${isActive ? "bg-white text-black" : ""} hover:text-black hover:bg-white w-full py-1 px-4 hover:cursor-pointer flex flex-row items-center gap-4`} onClick={() => !isActive && handleChange(item.value)}>
                                {item.content}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}