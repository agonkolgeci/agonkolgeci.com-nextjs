"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface School {
    key: string;
    url: string;
    image?: string;
    glow: "lime" | "orange";
}

// Academic Milestones Data
const SCHOOLS: School[] = [
    { key: "unige", url: "https://unige.ch/", image: "/education/unige.svg", glow: "lime" },
    { key: "stael", url: "https://madame-de-stael.ent.auvergnerhonealpes.fr/", glow: "orange" },
    { key: "jjr", url: "https://jeanjacquesrousseau-stjulien.ent.auvergnerhonealpes.fr/", glow: "lime" }
];

export default function EducationClient() {
    const t = useTranslations("education");
    const t_career = useTranslations("education.school_career");
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [maxScroll, setMaxScroll] = useState(0);

    // Track vertical scrolling progression
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Measure the exact horizontal distance to travel: full track width minus the
    // visible viewport. This makes the slide stop right when the last card lands,
    // instead of overshooting with a hardcoded percentage.
    useEffect(() => {
        const compute = () => {
            const track = trackRef.current;
            if (!track) return;
            const viewport = (track.offsetParent as HTMLElement | null)?.clientWidth ?? window.innerWidth;
            setMaxScroll(Math.max(0, track.scrollWidth - viewport));
        };
        compute();
        window.addEventListener("resize", compute);
        return () => window.removeEventListener("resize", compute);
    }, []);

    // Translate vertical scroll (0 to 1) into the measured horizontal distance (px)
    const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

    // Calculate dynamic focal lens scaling and opacity for each card
    const scale1 = useTransform(scrollYProgress, [0, 0.22, 0.35], [1.03, 1.03, 0.92]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0.35]);

    const scale2 = useTransform(scrollYProgress, [0.18, 0.35, 0.5, 0.65, 0.78], [0.92, 1.03, 1.03, 1.03, 0.92]);
    const opacity2 = useTransform(scrollYProgress, [0.18, 0.35, 0.5, 0.65, 0.78], [0.35, 1, 1, 1, 0.35]);

    const scale3 = useTransform(scrollYProgress, [0.6, 0.78, 1], [0.92, 1.03, 1.03]);
    const opacity3 = useTransform(scrollYProgress, [0.6, 0.78, 1], [0.35, 1, 1]);

    // Border activates by growing its width from 0 to 2px while the card is fully active.
    const borderFill1 = useTransform(scrollYProgress, [0, 0.08, 0.25, 0.33], [0, 1, 1, 0]);
    const borderFill2 = useTransform(scrollYProgress, [0.3, 0.4, 0.62, 0.72], [0, 1, 1, 0]);
    const borderFill3 = useTransform(scrollYProgress, [0.72, 0.82, 1], [0, 1, 1]);
    // Use an inset box-shadow ring (anti-aliased) instead of border-width, which browsers
    // snap to whole device pixels — that snapping is what makes a width animation look jumpy.
    const borderRing1 = useTransform(borderFill1, (v) => `inset 0 0 0 ${v * 2}px rgba(78, 168, 255, 0.9)`);
    const borderRing2 = useTransform(borderFill2, (v) => `inset 0 0 0 ${v * 2}px rgba(98, 226, 213, 0.9)`);
    const borderRing3 = useTransform(borderFill3, (v) => `inset 0 0 0 ${v * 2}px rgba(78, 168, 255, 0.9)`);

    const getTransformProps = (index: number) => {
        if (index === 0) return { scale: scale1, opacity: opacity1, borderRing: borderRing1 };
        if (index === 1) return { scale: scale2, opacity: opacity2, borderRing: borderRing2 };
        return { scale: scale3, opacity: opacity3, borderRing: borderRing3 };
    };

    return (
        <article className="relative w-full bg-primary text-white overflow-visible selection:bg-accent-blue selection:text-white">
            {/* Visual guide markers reminiscent of premium Webflow layouts */}
            <div className="absolute top-0 left-[15%] w-[1px] h-full bg-white/2 pointer-events-none" />
            <div className="absolute top-0 right-[15%] w-[1px] h-full bg-white/2 pointer-events-none" />
            
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-[-150px] w-[500px] h-[500px] bg-accent-blue/4 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-[-150px] w-[500px] h-[500px] bg-accent-teal/4 rounded-full blur-[140px] pointer-events-none" />

            {/* Static Section Intro Header */}
            <div className="mx-auto max-w-7xl px-8 pt-32 sm:pt-36 pb-12 flex flex-col items-center text-center relative z-10 select-none">
                <h1 className="font-primary text-5xl md:text-6xl font-extrabold tracking-tight mt-6 leading-none">
                    {t("title")}
                </h1>
                <p className="font-secondary text-base md:text-lg text-gray-400 mt-4 max-w-2xl leading-relaxed">
                    {t_career("description")}
                </p>
                
            </div>

            {/* VIEWPORT-LOCKING SCROLL TIMELINE CONTAINER */}
            <div ref={containerRef} className="relative h-[280vh] w-full overflow-visible">
                {/* Sticky Pinned Viewport Frame */}
                <div className="sticky top-[72px] h-[calc(100vh-72px)] w-full flex flex-col justify-center overflow-hidden z-20">
                    
                    {/* Horizontal guide tracking line - shifted down to 56% for top card clearance */}
                    <div className="absolute top-[56%] left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 pointer-events-none">
                        <motion.div 
                            style={{ scaleX: scrollYProgress }} 
                            className="w-full h-full bg-gradient-to-r from-accent-blue to-accent-teal origin-left shadow-[0_0_10px_rgba(78,168,255,0.5)]" 
                        />
                    </div>
                    
                    {/* Horizontal sliding track - absolute positioned at 56% to align perfectly with the shifted tracking line */}
                    <motion.div
                        ref={trackRef}
                        style={{ x }}
                        className="absolute top-[56%] -translate-y-1/2 left-0 flex flex-row gap-12 sm:gap-20 px-[15vw] lg:px-[25vw] items-center w-max h-auto z-10"
                    >
                        {SCHOOLS.map((school, index) => {
                            const schoolPath = `schools.${school.key}`;
                            const glowClass = school.glow === "orange" ? "glow-card-teal" : "glow-card-blue";
                            const activeAccent = school.glow === "orange" ? "text-accent-teal" : "text-accent-blue";
                            const { scale, opacity, borderRing } = getTransformProps(index);
                            const isAbove = index % 2 === 0;

                            return (
                                <div 
                                    key={school.key} 
                                    className="relative w-[85vw] sm:w-[500px] h-[320px] sm:h-[380px] shrink-0 flex items-center justify-center group"
                                >
                                    {/* Pulsing Node */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden sm:flex items-center justify-center pointer-events-none">
                                        {/* Ripple Glows */}
                                        <div className={`absolute w-8 h-8 rounded-full opacity-20 scale-70 animate-ping ${school.glow === 'orange' ? 'bg-accent-teal' : 'bg-accent-blue'}`} />
                                        <div className={`absolute w-12 h-12 rounded-full opacity-10 scale-70 animate-pulse ${school.glow === 'orange' ? 'bg-accent-teal' : 'bg-accent-blue'}`} />
                                        
                                        {/* Core Node */}
                                        <div className="w-4 h-4 rounded-full border border-white/30 bg-secondary flex items-center justify-center relative z-10 transition-all duration-300 group-hover:border-white">
                                            <div className={`w-2 h-2 rounded-full ${school.glow === 'orange' ? 'bg-accent-teal' : 'bg-accent-blue'}`} />
                                        </div>
                                    </div>

                                    {/* Vertical Connecting Line (Above) */}
                                    {isAbove && (
                                        <div className={`absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[1.5px] h-[24px] bg-gradient-to-t ${school.glow === 'orange' ? 'from-accent-teal/50 to-transparent' : 'from-accent-blue/50 to-transparent'} hidden sm:block pointer-events-none`} />
                                    )}

                                    {/* Vertical Connecting Line (Below) */}
                                    {!isAbove && (
                                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-[1.5px] h-[24px] bg-gradient-to-b ${school.glow === 'orange' ? 'from-accent-teal/50 to-transparent' : 'from-accent-blue/50 to-transparent'} hidden sm:block pointer-events-none`} />
                                    )}

                                    <motion.div
                                        style={{ scale, opacity }}
                                        className={`w-full sm:absolute ${isAbove ? 'sm:bottom-1/2 sm:mb-[24px]' : 'sm:top-1/2 sm:mt-[24px]'} bg-secondary/35 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/8 ${glowClass} flex flex-col gap-4 sm:gap-5 overflow-hidden interactive-card`}
                                        data-cursor-text="STUDY"
                                    >
                                        {/* Progressive accent border — inset ring thickens 0 -> 2px (anti-aliased, no pixel snapping) as the card becomes active */}
                                        <motion.div
                                            style={{ boxShadow: borderRing }}
                                            className="absolute inset-0 rounded-3xl pointer-events-none z-20"
                                        />

                                        {/* Ambient corner light glow on hover */}
                                        <div className={`absolute top-0 right-0 w-[160px] h-[160px] rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${school.glow === 'orange' ? 'bg-accent-teal/5' : 'bg-accent-blue/5'}`} />

                                        {/* Timeline Capsule Node Badge */}
                                        <div className="flex flex-row justify-between items-center w-full">
                                            <span className={`text-[10px] font-extrabold uppercase font-secondary tracking-widest px-3.5 py-1 rounded-full ${school.glow === 'orange' ? 'bg-accent-teal/10 text-accent-teal border border-accent-teal/20' : 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'}`}>
                                                Milestone 0{index + 1}
                                            </span>
                                            <time className={`font-secondary text-xs font-extrabold uppercase tracking-widest ${activeAccent}`}>
                                                {t_career(`${schoolPath}.date`)}
                                            </time>
                                        </div>

                                        {/* Milestone Description */}
                                        <div className="flex flex-col gap-3 mt-2 border-b border-white/5 pb-5">
                                            <Link href={school.url} target="_blank" className="inline-block group-hover:text-accent-blue transition-colors duration-300 cursor-pointer">
                                                <h3 className="font-primary text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight group-hover:text-inherit">
                                                    {t_career(`${schoolPath}.title`)}
                                                </h3>
                                            </Link>
                                            <p className="font-secondary text-sm text-gray-400 leading-relaxed mt-1">
                                                {t_career(`${schoolPath}.description`)}
                                            </p>
                                        </div>

                                        {/* School Crest Logo Asset */}
                                        {school.image && (
                                            <div className="mt-2 relative w-full h-[50px] flex items-center justify-start opacity-70 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500 select-none pointer-events-none">
                                                <Image 
                                                    className="object-contain object-left filter brightness-95 contrast-105" 
                                                    src={school.image} 
                                                    width={140} 
                                                    height={36} 
                                                    alt="School Crest" 
                                                    priority
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>

                </div>
            </div>
        </article>
    );
}
