"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from "framer-motion";
import SocialsLinks from "@/components/navigation/socials/SocialsLinks";
import Section from "@/components/pages/Section";
import { ExternalURL } from "@/components/utils/ExternalLink";
import { Button } from "@/components/utils/ui/Button";

// Single word of the scroll-reveal quote (hooks must run per-word, not inside a map callback)
const ScrollHighlightWord = ({ word, scrollYProgress, start, end }: { word: string; scrollYProgress: MotionValue<number>; start: number; end: number }) => {
    const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
    const color = useTransform(scrollYProgress, [start, end], ["#4b5563", "#ffffff"]);
    const textShadow = useTransform(
        scrollYProgress,
        [start, (start + end) / 2, end],
        ["0px 0px 0px rgba(78, 168, 255, 0)", "0px 0px 18px rgba(78, 168, 255, 0.45)", "0px 0px 0px rgba(78, 168, 255, 0)"]
    );

    return (
        <motion.span style={{ opacity, color, textShadow }} className="relative inline-block">
            {word}
        </motion.span>
    );
};

// Viewport-Locking Scroll-Reveal Quote Component
const ScrollHighlightSection = ({ text }: { text: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const words = text.split(" ");
    
    return (
        <div ref={containerRef} className="relative h-[220vh] w-full bg-primary select-none overflow-visible">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-12">
                
                {/* Decorative guides */}
                <div className="absolute top-0 left-[12%] w-[1px] h-full bg-white/2 pointer-events-none" />
                <div className="absolute top-0 right-[12%] w-[1px] h-full bg-white/2 pointer-events-none" />
                <div className="absolute top-[20%] left-0 w-full h-[1px] bg-white/2 pointer-events-none" />
                <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-white/2 pointer-events-none" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-accent-blue/4 rounded-full blur-[110px] md:blur-[140px] pointer-events-none" />

                <div className="max-w-5xl text-center z-10 px-4">
                    <span className="text-[10px] uppercase tracking-widest text-accent-blue font-extrabold font-secondary mb-8 inline-block select-none bg-accent-blue/5 border border-accent-blue/10 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(78,168,255,0.05)]">
                        Vision & Purpose
                    </span>
                    
                    <h2 className="font-primary text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-snug md:leading-normal flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1 sm:gap-y-2">
                        {words.map((word, idx) => {
                            const start = idx / words.length;
                            const end = (idx + 1.2) / words.length;

                            return (
                                <ScrollHighlightWord
                                    key={idx}
                                    word={word}
                                    scrollYProgress={scrollYProgress}
                                    start={start}
                                    end={end}
                                />
                            );
                        })}
                    </h2>
                </div>
            </div>
        </div>
    );
};

// Viewport-Locking Scroll-Pinned About Intro Component (Replaces Bento Bio + Photo + Terminal)
const AboutScrollSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    
    // Track scroll coordinates over the 300vh segment
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Step 1 animations (Stately name header)
    const step1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.32], [0, 1, 0]);
    const step1Scale = useTransform(scrollYProgress, [0, 0.22, 0.32], [0.85, 1, 1.05]);
    const step1Y = useTransform(scrollYProgress, [0, 0.22, 0.32], [40, 0, -45]);

    // Step 2 animations (Interactive Glass Timeline Capsules)
    const step2Opacity = useTransform(scrollYProgress, [0.32, 0.42, 0.65, 0.72], [0, 1, 1, 0]);
    const step2Y = useTransform(scrollYProgress, [0.32, 0.42, 0.65, 0.72], [45, 0, 0, -45]);
    
    // Staggered slide inputs from left & right
    const capsule1X = useTransform(scrollYProgress, [0.32, 0.42], [-120, 0]);
    const capsule2X = useTransform(scrollYProgress, [0.37, 0.47], [120, 0]);
    const capsule3X = useTransform(scrollYProgress, [0.42, 0.52], [-120, 0]);

    // Step 3 animations (Determined bio statement & Social row)
    const step3Opacity = useTransform(scrollYProgress, [0.72, 0.82, 0.95], [0, 1, 1]);
    const step3Scale = useTransform(scrollYProgress, [0.72, 0.82, 0.95], [0.92, 1, 1]);
    const step3Y = useTransform(scrollYProgress, [0.72, 0.82], [30, 0]);

    // Interactive Abstract Background Orb properties
    const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 0.95]);
    const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const orbOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.1, 0.35, 0.35, 0.1]);

    return (
        <div ref={sectionRef} className="relative h-[300vh] w-full bg-primary select-none overflow-visible">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12">
                
                {/* Visual grid lines overlay */}
                <div className="absolute top-0 left-[15%] w-[1px] h-full bg-white/2 pointer-events-none" />
                <div className="absolute top-0 right-[15%] w-[1px] h-full bg-white/2 pointer-events-none" />
                <div className="absolute top-[25%] left-0 w-full h-[1px] bg-white/2 pointer-events-none" />
                <div className="absolute bottom-[25%] left-0 w-full h-[1px] bg-white/2 pointer-events-none" />

                {/* Pulsing & Rotating CSS Cosmic Orb */}
                <motion.div 
                    style={{ scale: orbScale, rotate: orbRotate, opacity: orbOpacity }}
                    className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full border border-accent-blue/15 bg-gradient-to-tr from-accent-blue/5 via-transparent to-accent-teal/5 blur-[35px] flex items-center justify-center pointer-events-none"
                >
                    <div className="w-48 h-48 rounded-full bg-gradient-to-r from-accent-blue/10 to-accent-teal/10 blur-[30px]" />
                    <div className="absolute w-[90%] h-[90%] rounded-full border border-dashed border-white/5 animate-[spin_40s_linear_infinite]" />
                    <div className="absolute w-[70%] h-[70%] rounded-full border border-dashed border-accent-teal/10 animate-[spin_20s_linear_infinite_reverse]" />
                </motion.div>

                {/* Step 1: Clean Bold Introduction */}
                <motion.div 
                    style={{ opacity: step1Opacity, scale: step1Scale, y: step1Y }}
                    className="absolute flex flex-col items-center justify-center gap-6 max-w-4xl text-center z-10 px-4"
                >
                    <span className="text-[10px] uppercase tracking-widest text-accent-blue font-extrabold font-secondary px-4 py-1.5 rounded-full bg-accent-blue/5 border border-accent-blue/10">
                        About Me
                    </span>
                    <h2 className="font-primary text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white leading-none">
                        AGON KOLGECI
                    </h2>
                    <p className="font-secondary text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
                        A software developer driven by a profound passion for technology, crafting high-impact solutions with code and design.
                    </p>
                </motion.div>

                {/* Step 2: Key Professional Capsules */}
                <motion.div 
                    style={{ opacity: step2Opacity, y: step2Y }}
                    className="absolute flex flex-col items-center gap-6 max-w-3xl w-full z-10 px-4"
                >
                    <span className="text-[10px] uppercase tracking-widest text-accent-teal font-extrabold font-secondary px-4 py-1.5 rounded-full bg-accent-teal/5 border border-accent-teal/10 mb-2">
                        Background & Focus
                    </span>
                    
                    <motion.div 
                        style={{ x: capsule1X }}
                        className="w-full bg-[#080808]/75 backdrop-blur-md border border-white/8 rounded-2xl p-5 hover:border-accent-blue/30 transition-colors duration-300 flex flex-row items-center gap-4 shadow-xl"
                    >
                        <div className="w-8 h-8 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20 shrink-0 font-primary font-bold text-accent-blue text-sm">01</div>
                        <p className="font-secondary text-sm sm:text-base text-gray-300 font-semibold leading-snug">
                            Bachelor in Computer Science student at the <span className="text-white font-extrabold">University of Geneva</span>.
                        </p>
                    </motion.div>

                    <motion.div 
                        style={{ x: capsule2X }}
                        className="w-full bg-[#080808]/75 backdrop-blur-md border border-white/8 rounded-2xl p-5 hover:border-accent-teal/30 transition-colors duration-300 flex flex-row items-center gap-4 shadow-xl"
                    >
                        <div className="w-8 h-8 rounded-xl bg-accent-teal/10 flex items-center justify-center border border-accent-teal/20 shrink-0 font-primary font-bold text-accent-teal text-sm">02</div>
                        <p className="font-secondary text-sm sm:text-base text-gray-300 font-semibold leading-snug">
                            Self-taught engineer who loves discovering, learning, and experimenting with advanced tech.
                        </p>
                    </motion.div>

                    <motion.div 
                        style={{ x: capsule3X }}
                        className="w-full bg-[#080808]/75 backdrop-blur-md border border-white/8 rounded-2xl p-5 hover:border-accent-blue/30 transition-colors duration-300 flex flex-row items-center gap-4 shadow-xl"
                    >
                        <div className="w-8 h-8 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20 shrink-0 font-primary font-bold text-accent-blue text-sm">03</div>
                        <p className="font-secondary text-sm sm:text-base text-gray-300 font-semibold leading-snug">
                            Determined to create innovative solutions that combine clean software with refined design aesthetics.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Step 3: Determined Statement & Social Connect */}
                <motion.div 
                    style={{ opacity: step3Opacity, scale: step3Scale, y: step3Y }}
                    className="absolute flex flex-col items-center justify-center gap-8 max-w-4xl text-center z-10 px-4"
                >
                    <span className="text-[10px] uppercase tracking-widest text-accent-blue font-extrabold font-secondary px-4 py-1.5 rounded-full bg-accent-blue/5 border border-accent-blue/10">
                        My Commitment
                    </span>
                    <h3 className="font-primary text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-relaxed max-w-3xl">
                        "Determined to improve every day, push technical boundaries, and turn abstract challenges into elegant products."
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-white/8 pt-6 w-full max-w-md justify-center mt-4">
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-extrabold font-secondary pl-1">Connect directly</span>
                        <SocialsLinks className="flex flex-row gap-6 text-xl text-accent-blue hover:opacity-85 transition-opacity" />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

// 3D Stacking Parallax Deck Wrapper
const ScrollCardContainer = ({ children, index }: { children: React.ReactNode; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start start", "end start"]
    });
    
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94 - index * 0.015]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.65]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -25]);
    
    return (
        <motion.div ref={cardRef} style={{ scale, opacity, y }} className="w-full origin-top">
            {children}
        </motion.div>
    );
};

// Discover deck card (hoisted to module scope so it isn't recreated on every render)
const DiscoverCard = ({ image, title, description, buttons } : { image: string; title: string; description: string; buttons?: ExternalURL[] }) => {
    return (
        <div
            className="group relative flex flex-col lg:flex-row items-stretch w-full bg-secondary/95 border border-white/8 rounded-[36px] overflow-hidden hover:border-accent-blue/45 hover:shadow-[0_20px_50px_rgba(78,168,255,0.05)] transition-all duration-500 backdrop-blur-xl shadow-2xl interactive-card"
        >
            {/* Neon Lime/Cyan Ambient Glow */}
            <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-accent-blue/3 rounded-full blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Parallax Image Grid */}
            <div className="w-full lg:w-[44%] h-[260px] lg:h-auto relative overflow-hidden shrink-0 border-r lg:border-r border-b lg:border-b-0 border-white/5">
                <Image
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    src={image}
                    fill={true}
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    alt={title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#000]/30" />
            </div>

            {/* Content Cell */}
            <div className="flex-1 flex flex-col justify-between p-8 lg:p-12 gap-8 w-full">
                <div className="flex flex-col gap-4">
                    <h3 className="font-primary text-2xl lg:text-3xl font-extrabold text-white tracking-tight group-hover:text-accent-blue transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="font-secondary text-sm lg:text-base text-gray-400 leading-relaxed max-w-xl">
                        {description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    {buttons?.map(button => (
                        <Link key={button.name} href={button.href} className="inline-block cursor-pointer">
                            <Button>{button.name}</Button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Client-side module-level memory state to bypass preloader on client-side routing
let preloaderHasPlayed = false;

export default function Home() {
    const t = useTranslations("home");
    // Skip the preloader entirely if it already played during this runtime session
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

    // Hero Character Stagger Animation Variants
    const titleLetterVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12,
                delay: i * 0.03
            }
        })
    } as const;

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
            <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Atmospheric grid lines with traveling neon glows (Lithosquare inspired) */}
                <div className="absolute top-0 left-[20%] w-[1px] h-full bg-white/3 pointer-events-none overflow-hidden">
                    <motion.div 
                        animate={{ y: ["-100%", "200%"] }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-full h-24 bg-gradient-to-b from-transparent via-accent-blue to-transparent" 
                    />
                </div>
                <div className="absolute top-0 right-[20%] w-[1px] h-full bg-white/3 pointer-events-none overflow-hidden">
                    <motion.div 
                        animate={{ y: ["-100%", "200%"] }} 
                        transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-24 bg-gradient-to-b from-transparent via-accent-teal to-transparent" 
                    />
                </div>
                <div className="absolute top-[35%] left-0 w-full h-[1px] bg-white/3 pointer-events-none" />
                <div className="absolute bottom-[35%] left-0 w-full h-[1px] bg-white/3 pointer-events-none" />

                {/* Soft breathing background lighting */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[480px] h-[340px] md:h-[480px] bg-accent-blue/6 rounded-full blur-[100px] md:blur-[135px] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
                
                <div className="flex flex-col items-center justify-center gap-6 max-w-5xl px-6 text-center z-10 select-none">
                    
                    {/* Character Stagger Title Reveal */}
                    <h1 className="font-primary text-6xl sm:text-7xl md:text-9xl tracking-tight text-white font-extrabold leading-none flex flex-wrap justify-center gap-x-2">
                        {nameText.split(" ").map((word, wordIdx) => (
                            <span key={wordIdx} className="inline-flex overflow-hidden">
                                {word.split("").map((letter, letterIdx) => (
                                    <motion.span
                                        custom={wordIdx * 5 + letterIdx}
                                        variants={titleLetterVariants}
                                        initial="hidden"
                                        animate={showPreloader ? "hidden" : "visible"}
                                        key={letterIdx}
                                        className="inline-block"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>
                    
                    {/* Animated Horizontal Line Break with Glow dot */}
                    <div className="relative w-48 h-[1px] bg-white/10 my-2 overflow-visible">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={showPreloader ? { width: 0 } : { width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-teal" 
                        />
                        <motion.div
                            animate={showPreloader ? { opacity: 0 } : { x: ["-10px", "200px"], opacity: 1 }}
                            transition={showPreloader ? { duration: 0.1 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_12px_#4ea8ff]"
                        />
                    </div>
                    
                    {/* Subtitle Reveal */}
                    <div className="overflow-hidden">
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={showPreloader ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                            className="font-secondary text-xl sm:text-2xl md:text-3xl text-gray-400 mt-2 tracking-widest font-semibold uppercase bg-clip-text bg-gradient-to-r from-white via-white to-gray-500"
                        >
                            {descText}
                        </motion.p>
                    </div>
                </div>

            </div>

            {/* SCROLL-PINNED INTERACTIVE QUOTE REVEAL SECTION */}
            <div id="scroll-pinned-quote" className="w-full">
                <ScrollHighlightSection text={t("quote")} />
            </div>

            {/* VIEWPORT-LOCKING STORYTELLING ABOUT SECTION (Replaces Bento grid text, portrait photo, and TS code box) */}
            <div id="about" className="w-full">
                <AboutScrollSection />
            </div>

            {/* DISCOVER SECTION (With 3D Stacking Deck Mechanics) */}
            <Section title={t("discover.title")} description={t("discover.description")} position={1}>
                <div className="flex flex-col w-full gap-16 max-w-7xl mt-4 relative pb-24">
                    
                    <div className="sticky top-[100px] z-10 w-full">
                        <ScrollCardContainer index={0}>
                            <DiscoverCard 
                                image="/home/knowledge.png"
                                title={t("discover.knowledge.title")}
                                description={t("discover.knowledge.description")}
                                buttons={[
                                    { name: t("discover.knowledge.go_to_skills"), href: "/skills" },
                                    { name: t("discover.knowledge.go_to_education"), href: "/education" }
                                ]}
                            />
                        </ScrollCardContainer>
                    </div>

                    <div className="sticky top-[140px] z-20 w-full">
                        <ScrollCardContainer index={1}>
                            <DiscoverCard 
                                image="/home/career.png"
                                title={t("discover.career.title")}
                                description={t("discover.career.description")}
                                buttons={[
                                    { name: t("discover.career.go_to_experiences"), href: "/experiences" }
                                ]}
                            />
                        </ScrollCardContainer>
                    </div>

                    <div className="sticky top-[180px] z-30 w-full">
                        <ScrollCardContainer index={2}>
                            <DiscoverCard 
                                image="/home/creations.png"
                                title={t("discover.creations.title")}
                                description={t("discover.creations.description")}
                                buttons={[
                                    { name: t("discover.creations.go_to_gallery"), href: "/gallery" }
                                ]}
                            />
                        </ScrollCardContainer>
                    </div>
                    
                </div>
            </Section>

        </div>
    );
}