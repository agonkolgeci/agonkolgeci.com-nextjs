"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type DropdownItem = {
    content: React.ReactNode;
    value: string;
};

export type DropdownCallback = (newValue: string) => void;

interface DropdownProps {
    button: React.ReactNode;
    items: DropdownItem[];
    defaultValue: string;
    disabled?: boolean;
    onChange?: DropdownCallback;
}

export default function Dropdown({ button, items, defaultValue, disabled = false, onChange }: DropdownProps) {
    const [currentValue, setCurrentValue] = useState<string>(defaultValue);
    const [opened, setOpened] = useState(false);

    const trigger = useRef<HTMLButtonElement>(null);
    const dropdown = useRef<HTMLUListElement>(null);

    const toggleMenu = useCallback(() => setOpened(curr => !curr), []);
    const closeMenu = useCallback(() => setOpened(false), []);

    const handleChange: DropdownCallback = (newValue) => {
        if (onChange) onChange(newValue);
        setCurrentValue(newValue);
        closeMenu();
    };

    useEffect(() => {
        if (!opened) return;

        const handleClick = (event: any) => {
            if (!dropdown.current?.contains(event.target) && !trigger.current?.contains(event.target)) {
                closeMenu();
            }
        };

        window.addEventListener("scroll", closeMenu);
        window.addEventListener("mousedown", handleClick);

        return () => {
            window.removeEventListener("scroll", closeMenu);
            window.removeEventListener("mousedown", handleClick);
        };
    }, [opened, closeMenu]);

    return (
        <div className="relative inline-block text-left select-none">
            <button 
                type="button" 
                className="focus:outline-none cursor-pointer block border-none bg-transparent p-0" 
                onClick={toggleMenu} 
                ref={trigger}
                aria-haspopup="true"
                aria-expanded={opened}
            >
                {button}
            </button>

            <AnimatePresence>
                {opened && (
                    <motion.ul 
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={`absolute right-0 mt-3 w-44 bg-[#0c0c0c] border border-white/8 rounded-2xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.75)] flex flex-col gap-1 z-[999] origin-top-right min-w-[150px] ${disabled ? "pointer-events-none opacity-50" : ""}`} 
                        ref={dropdown}
                        role="menu"
                    >
                        {items.map(item => {
                            const isActive = item.value === currentValue;

                            return (
                                <li 
                                    key={item.value} 
                                    role="menuitem"
                                    className={`flex flex-row items-center gap-3 w-full px-3.5 py-2.5 rounded-xl cursor-pointer text-xs font-semibold font-secondary tracking-wide border transition-all duration-200 ${isActive ? "bg-accent-blue/10 border-accent-blue/20 text-white font-extrabold" : "bg-transparent text-gray-400 border-transparent hover:bg-white/5 hover:text-white hover:border-white/5"}`} 
                                    onClick={() => !isActive && handleChange(item.value)}
                                >
                                    {item.content}
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}