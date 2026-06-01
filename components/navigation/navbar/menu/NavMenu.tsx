"use client";

import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenu } from "../../../utils/links/menu";
import SocialsLinks from "../../socials/SocialsLinks";
import NavLogo from "../logo/NavLogo";

export default function NavMenu() {
    const pathname = usePathname();
    const links = useMenu();
    const [opened, setOpened] = useState(false);

    const toggleMenu = useCallback(() => setOpened(curr => !curr), []);
    const closeMenu = useCallback(() => setOpened(false), []);

    // Staggered Motion entries for mobile links
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring" as const, stiffness: 100, damping: 15 }
        }
    };

    return (
        <div className="flex flex-row items-center">
            {/* DESKTOP VIEW */}
            <ul className="hidden lg:flex flex-row gap-8 items-center font-semibold">
                {links.map(link => {
                    const isActive = pathname === link.href;
                    return (
                        <li key={link.name} className="relative py-2">
                            <Link
                                href={link.href}
                                className={`font-secondary text-[10px] tracking-[0.2em] font-extrabold uppercase transition-colors duration-300 block select-none cursor-pointer ${isActive ? "text-accent-blue" : "text-gray-400 hover:text-white"}`}
                            >
                                {link.name}
                            </Link>
                            {isActive && (
                                <motion.span
                                    layoutId="activeNavIndicator"
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-blue rounded-full shadow-[0_0_8px_rgba(78,168,255,0.8)]"
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                />
                            )}
                        </li>
                    )
                })}
            </ul>

            {/* TABLET/MOBILE TRIGGER BUTTON */}
            <div className="flex lg:hidden flex-row items-center relative">
                <button 
                    onClick={toggleMenu} 
                    aria-label="Toggle menu"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-white/20 bg-white/2 hover:bg-white/5 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
                >
                    <FontAwesomeIcon className="size-4" icon={opened ? faClose : faBars} />
                </button>

                {/* FULL SCREEN DOCK/DRAWER MENU */}
                <AnimatePresence>
                    {opened && (
                        <motion.div
                            initial={{ opacity: 0, y: "-100%" }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: "-100%" }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-0 w-screen h-screen bg-[#030303]/98 backdrop-blur-2xl z-[9999] flex flex-col justify-between p-6 sm:p-12 overflow-hidden"
                        >
                            {/* Drawer Header */}
                            <div className="flex flex-row items-center justify-between w-full border-b border-white/5 pb-6">
                                <div className="flex items-center w-[130px] h-[34px] relative shrink-0" onClick={closeMenu}>
                                    <NavLogo />
                                </div>
                                <button 
                                    onClick={closeMenu}
                                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-accent-blue/30 bg-white/3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                                >
                                    <FontAwesomeIcon className="size-4" icon={faClose} />
                                </button>
                            </div>

                            {/* Drawer Links Matrix */}
                            <div className="flex-1 flex flex-col justify-center py-12">
                                <motion.ul 
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="flex flex-col gap-5 sm:gap-8 items-start pl-2 sm:pl-6"
                                >
                                    {links.map(link => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <motion.li 
                                                variants={itemVariants} 
                                                key={link.name} 
                                                onClick={closeMenu}
                                                className="relative"
                                            >
                                                <Link 
                                                    href={link.href} 
                                                    className={`font-primary text-[clamp(1.5rem,8vw,3.5rem)] leading-[1.1] font-extrabold tracking-tight uppercase transition-all duration-300 block hover:translate-x-3 select-none hover:text-accent-blue ${isActive ? "text-accent-blue font-black" : "text-gray-500 hover:text-white"}`}
                                                >
                                                    {link.name}
                                                </Link>
                                            </motion.li>
                                        )
                                    })}
                                </motion.ul>
                            </div>

                            {/* Drawer Footer */}
                            <div className="flex flex-row items-center w-full border-t border-white/5 pt-6 gap-4">
                                <span className="text-[10px] font-secondary uppercase tracking-[0.2em] text-gray-500 font-extrabold select-none">Connect</span>
                                <SocialsLinks className="flex flex-row gap-6 text-lg text-gray-400 hover:text-white transition-colors" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}