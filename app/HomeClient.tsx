"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import SocialsLinks from "@/components/navigation/socials/SocialsLinks";


import SkillsClient from "./skills/SkillsClient";
import EducationClient from "./education/EducationClient";
import ExperiencesClient from "./experiences/ExperiencesClient";
import GalleryClient from "./gallery/GalleryClient";
import ContactClient from "./contact/ContactClient";


// Key technologies surfaced under the About bio
const ABOUT_TECH = ["TypeScript", "React", "Next.js", "Node", "Tailwind"];

// Creative footer under the bio text: quick facts + tech stack + connect
const AboutExtras = () => {
    return (
        <div className="flex flex-col gap-6">
            {/* Quick facts */}
            <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 text-[11px] font-secondary font-bold text-gray-300 bg-white/[0.03] border border-white/8 rounded-full px-3.5 py-1.5">
                    <FontAwesomeIcon icon={faLocationDot} className="text-gray-400 text-xs" />
                    Geneva, CH
                </span>
                <span className="inline-flex items-center gap-2 text-[11px] font-secondary font-bold text-gray-300 bg-white/[0.03] border border-white/8 rounded-full px-3.5 py-1.5">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-gray-400 text-xs" />
                    BSc Computer Science
                </span>
            </div>

            {/* Connect */}
            <div className="flex flex-row items-center gap-4 pt-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-extrabold select-none">Connect</span>
                <SocialsLinks className="flex flex-row gap-6 text-lg text-gray-400 hover:text-white transition-colors" />
            </div>
        </div>
    );
};

// Mobile / tablet About — simple stacked layout (no scroll-jacking)
const AboutMobile = () => {
    const t = useTranslations("home");
    const sentences = t("about.presentation").match(/[^.!?]+[.!?]+/g) ?? [t("about.presentation")];
    const intro = sentences.slice(0, 2).join(" ").trim();

    return (
        <div className="relative w-full bg-primary">
            <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col gap-12">
                <div className="relative w-full h-[75vh] rounded-[28px] overflow-hidden border border-white/8">
                    <Image src="/home/portrait.png" fill sizes="100vw" alt={t("about.title")} className="object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
                </div>
                <div className="flex flex-col gap-6">
                    <h2 className="font-primary text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        {t("about.title")}
                    </h2>
                    <p className="font-secondary text-base text-gray-400 leading-relaxed">
                        {intro}
                    </p>
                    <AboutExtras />
                </div>
            </div>
        </div>
    );
};

// Desktop About — pinned; portrait starts full then shrinks to the right while text slides in.
// Kept as its own component so the useScroll target ref is always attached to a mounted
// element (fixes the "Target ref is defined but not hydrated" error).
const AboutDesktop = () => {
    const t = useTranslations("home");
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Image starts full-width and shrinks to the right half as text slides in
    const imageWidth = useTransform(scrollYProgress, [0, 0.6, 1], ["100%", "55%", "55%"]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

    // Text panel slides in from the left and fades in
    const textOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);
    const textX = useTransform(scrollYProgress, [0.15, 0.55], [-80, 0]);

    const sentences = t("about.presentation").match(/[^.!?]+[.!?]+/g) ?? [t("about.presentation")];
    const intro = sentences.slice(0, 2).join(" ").trim();

    return (
        <div ref={sectionRef} className="relative h-[250vh] w-full bg-primary">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Image: starts full-screen, shrinks to the right side on scroll */}
                <motion.div
                    style={{ width: imageWidth }}
                    className="absolute right-0 top-0 h-full overflow-hidden z-0"
                >
                    <motion.div style={{ scale: imageScale }} className="absolute right-0 top-0 h-full w-screen">
                        <Image
                            src="/home/portrait.png"
                            fill
                            sizes="100vw"
                            priority
                            alt={t("about.title")}
                            className="object-cover object-center"
                        />
                    </motion.div>
                    {/* Left-edge gradient blends the image into the text column */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/20 to-transparent pointer-events-none" />
                </motion.div>

                {/* Text panel: hidden initially, slides in from the left on scroll */}
                <motion.div
                    style={{ opacity: textOpacity, x: textX }}
                    className="absolute left-0 top-0 h-full w-1/2 flex flex-col justify-center gap-7 pl-12 xl:pl-20 pr-12 z-10"
                >
                    <h2 className="font-primary text-5xl xl:text-6xl font-extrabold tracking-tighter text-white leading-[0.95]">
                        {t("about.title")}
                    </h2>
                    <p className="font-secondary text-base xl:text-lg text-gray-400 leading-relaxed max-w-xl">
                        {intro}
                    </p>
                    <AboutExtras />
                </motion.div>

            </div>
        </div>
    );
};

// About dispatcher — pinned expand on desktop, stacked on mobile.
const AboutScrollSection = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return isDesktop ? <AboutDesktop /> : <AboutMobile />;
};


// Client-side module-level memory state to bypass preloader on client-side routing
let preloaderHasPlayed = false;

interface HomeClientProps {
    target_mail: string;
    recaptchaKey: string;
}

export default function HomeClient({ target_mail, recaptchaKey }: HomeClientProps) {
    const t = useTranslations("home");
    const [showPreloader, setShowPreloader] = useState(() => !preloaderHasPlayed);
    const [isLogoLoaded, setIsLogoLoaded] = useState(false);

    useEffect(() => {
        if (preloaderHasPlayed) return;

        const timer = setTimeout(() => {
            setShowPreloader(false);
            preloaderHasPlayed = true;
        }, 3000); // 3s homepage entry preloader on absolute first landing
        return () => clearTimeout(timer);
    }, []);

    // Smooth scroll to hash anchor on mount once the preloader fades out
    useEffect(() => {
        if (!showPreloader && typeof window !== "undefined" && window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                const timer = setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [showPreloader]);

    const nameText = t("title");
    const descText = t("description");

    return (
        <div className="w-full bg-primary relative overflow-visible">
            
            {/* Preloader Overlay (ciaoenergy.com inspired) */}
            <AnimatePresence>
                {showPreloader && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ 
                            opacity: 0, 
                            scale: 1.01,
                            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } 
                        }}
                        className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none"
                    >
                        {/* Centered Massive Masked Logo System */}
                        <div className="relative w-[360px] sm:w-[560px] md:w-[720px] lg:w-[840px] h-[110px] sm:h-[160px] md:h-[200px] lg:h-[240px] flex items-center justify-center">
                            
                            {/* Layer 1: Dark Gray Silhouette Background */}
                            <div 
                                className="absolute inset-0 bg-[#1a1a1a]"
                                style={{
                                    WebkitMaskImage: 'url(/logo.png)',
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                    maskImage: 'url(/logo.png)',
                                    maskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center'
                                }}
                            />

                            {/* Layer 2: Glowing Liquid Sweep (Runs infinitely bottom to top once the mask image is fully loaded) */}
                            <div 
                                className="absolute inset-0 overflow-hidden"
                                style={{
                                    WebkitMaskImage: 'url(/logo.png)',
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                    maskImage: 'url(/logo.png)',
                                    maskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center'
                                }}
                            >
                                {isLogoLoaded && (
                                    <motion.div 
                                        initial={{ y: "115%" }}
                                        animate={{ y: "-115%" }}
                                        transition={{
                                            duration: 3.0,
                                            ease: "linear",
                                            repeat: Infinity
                                        }}
                                        className="absolute inset-0"
                                        style={{
                                            background: 'linear-gradient(to top, transparent 0%, rgba(255, 255, 255, 0.95) 50%, transparent 100%)',
                                        }}
                                    />
                                )}
                            </div>

                            {/* Invisible Next.js image layer to preload and guarantee onLoad state triggers perfectly */}
                            <Image 
                                src="/logo.png" 
                                alt="Preloader Logo Hook"
                                width={1}
                                height={1}
                                className="opacity-0 absolute pointer-events-none"
                                priority
                                onLoad={() => setIsLogoLoaded(true)}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* HERO SECTION */}
            <div id="home" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden scroll-mt-[var(--navbar-height)]">
                {/* Atmospheric grid lines with traveling neon glows */}
                <div className="absolute top-0 left-[20%] w-px h-full bg-white/4 pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-full h-24 bg-gradient-to-b from-transparent via-accent-blue to-transparent"
                    />
                </div>
                <div className="absolute top-0 left-1/2 w-px h-full bg-white/4 pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 6.5, delay: 1, repeat: Infinity, ease: "linear" }}
                        className="w-full h-32 bg-gradient-to-b from-transparent via-accent-blue/60 to-transparent"
                    />
                </div>
                <div className="absolute top-0 right-[20%] w-px h-full bg-white/4 pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-24 bg-gradient-to-b from-transparent via-accent-teal to-transparent"
                    />
                </div>
                <div className="absolute top-[30%] left-0 w-full h-px bg-white/4 pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 7, delay: 1.5, repeat: Infinity, ease: "linear" }}
                        className="h-full w-40 bg-gradient-to-r from-transparent via-accent-teal/50 to-transparent"
                    />
                </div>
                <div className="absolute bottom-[30%] left-0 w-full h-px bg-white/4 pointer-events-none" />

                {/* Soft breathing background lighting */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[480px] h-[340px] md:h-[480px] bg-accent-blue/6 rounded-full blur-[100px] md:blur-[135px] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />

                <div className="flex flex-col items-center justify-center gap-8 max-w-6xl px-6 text-center z-10 select-none">
                    
                    {/* Name — white first word + animated gradient last word */}
                    <div className="relative">
                        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                            <div className="w-[85%] h-[55%] bg-accent-blue/20 blur-[120px] rounded-full" />
                        </div>

                        <h1 className="font-primary text-[clamp(3rem,13vw,9.5rem)] tracking-tighter font-extrabold leading-[0.9] flex flex-wrap justify-center gap-x-3 sm:gap-x-5">
                            {nameText.split(" ").map((word, wordIdx, arr) => {
                                const isLast = wordIdx === arr.length - 1;
                                return (
                                    <motion.span
                                        key={wordIdx}
                                        initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
                                        animate={showPreloader ? { opacity: 0, y: 50, filter: "blur(12px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                                        transition={{ duration: 0.9, delay: 0.15 + wordIdx * 0.18, ease: [0.16, 1, 0.3, 1] }}
                                        className={isLast
                                            ? "inline-block text-gradient drop-shadow-[0_0_45px_rgba(121,157,255,0.35)]"
                                            : "inline-block text-white"}
                                    >
                                        {word}
                                    </motion.span>
                                );
                            })}
                        </h1>
                    </div>

                    {/* Role — framed by accent gradient lines */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={showPreloader ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                        className="flex items-center gap-3 sm:gap-6"
                    >
                        <span className="h-px w-8 sm:w-16 md:w-20 bg-gradient-to-r from-transparent to-accent-blue/70" />
                        <p className="font-secondary text-xs sm:text-lg md:text-xl tracking-[0.2em] sm:tracking-[0.35em] font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 whitespace-nowrap">
                            {descText}
                        </p>
                        <span className="h-px w-8 sm:w-16 md:w-20 bg-gradient-to-l from-transparent to-accent-teal/70" />
                    </motion.div>
                </div>

                {/* Subtle Scroll Down Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={showPreloader ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 select-none group"
                    onClick={() => {
                        const aboutEl = document.getElementById("about");
                        if (aboutEl) aboutEl.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-extrabold group-hover:text-white transition-colors duration-300">
                        {t("scroll_down")}
                    </span>
                    <div className="w-5 h-9 rounded-full border border-white/20 group-hover:border-accent-blue/50 flex justify-center p-1.5 bg-white/2 transition-colors duration-300">
                        <motion.div 
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-1 rounded-full bg-accent-blue"
                        />
                    </div>
                </motion.div>
            </div>

            {/* VIEWPORT-LOCKING STORYTELLING ABOUT Me SECTION */}
            <div id="about" className="w-full">
                <AboutScrollSection />
            </div>

            {/* SKILLS SECTION */}
            <div id="skills" className="w-full scroll-mt-[var(--navbar-height)]">
                <SkillsClient />
            </div>

            {/* EDUCATION SECTION */}
            <div id="education" className="w-full scroll-mt-[var(--navbar-height)]">
                <EducationClient />
            </div>

            {/* EXPERIENCES SECTION */}
            <div id="experiences" className="w-full scroll-mt-[var(--navbar-height)]">
                <ExperiencesClient />
            </div>

            {/* GALLERY / CREATIONS SECTION */}
            <div id="gallery" className="w-full scroll-mt-[var(--navbar-height)]">
                <GalleryClient />
            </div>

            {/* CONTACT SECTION */}
            <div id="contact" className="w-full scroll-mt-[var(--navbar-height)]">
                <ContactClient target_mail={target_mail} recaptchaKey={recaptchaKey} />
            </div>

        </div>
    );
}
