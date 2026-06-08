"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faPeopleGroup, faPerson, faSliders } from "@fortawesome/free-solid-svg-icons";
import Article from "@/components/pages/Article";
import { retrieveLanguageByName } from "@/components/utils/ui/Language";

// All 32 GitHub core technologies and tools divided into 3 scroll steps (10 in step 1, 9 in step 2, 13 in step 3)
const TECH_CONSTELLATION = [
    // Step 1: Core Languages (10 items)
    { name: "Java", color: "#f89820", angle: 36, ring: 2, step: 1 },
    { name: "JavaScript", color: "#f7df1e", angle: 72, ring: 1, step: 1 },
    { name: "TypeScript", color: "#3178c6", angle: 0, ring: 1, step: 1 },
    { name: "PHP", color: "#777bb4", angle: 0, ring: 2, step: 1 },
    { name: "Python", color: "#3776ab", angle: 72, ring: 2, step: 1 },
    { name: "C", color: "#a8b9cc", angle: 0, ring: 2, step: 1 },
    { name: "C++", color: "#00599c", angle: 108, ring: 2, step: 1 },
    { name: "HTML", color: "#e34f26", angle: 0, ring: 2, step: 1 },
    { name: "CSS", color: "#1572b6", angle: 0, ring: 2, step: 1 },
    { name: "Sass", color: "#cc6699", angle: 0, ring: 2, step: 1 },
    
    // Step 2: Frameworks, Databases & Core Ops (9 items)
    { name: "Node", color: "#339933", angle: 288, ring: 1, step: 2 },
    { name: "React", color: "#61dafb", angle: 144, ring: 1, step: 2 },
    { name: "NextJS", color: "#ffffff", angle: 216, ring: 1, step: 2 },
    { name: "Tailwind CSS", color: "#38bdf8", angle: 0, ring: 2, step: 2 },
    { name: "Redis", color: "#dc382d", angle: 324, ring: 2, step: 2 },
    { name: "MySQL", color: "#4479a1", angle: 252, ring: 2, step: 2 },
    { name: "MongoDB", color: "#47a248", angle: 288, ring: 2, step: 2 },
    { name: "Docker", color: "#2496ed", angle: 144, ring: 2, step: 2 },
    { name: "Cloudflare", color: "#f38020", angle: 0, ring: 2, step: 2 },
    
    // Step 3: Development Tools, OS & Automations (13 items)
    { name: "VSCode", color: "#007acc", angle: 0, ring: 2, step: 3 },
    { name: "IntelliJ IDEA", color: "#fe315d", angle: 0, ring: 2, step: 3 },
    { name: "Git", color: "#f05032", angle: 216, ring: 2, step: 3 },
    { name: "GitHub", color: "#ffffff", angle: 0, ring: 2, step: 3 },
    { name: "GitLab", color: "#fc6d26", angle: 0, ring: 2, step: 3 },
    { name: "Linux", color: "#ffffff", angle: 180, ring: 2, step: 3 },
    { name: "Jenkins", color: "#d24939", angle: 0, ring: 2, step: 3 },
    { name: "Bash", color: "#4eaa25", angle: 0, ring: 2, step: 3 },
    { name: "PowerShell", color: "#5391fe", angle: 0, ring: 2, step: 3 },
    { name: "Maven", color: "#c71a36", angle: 0, ring: 2, step: 3 },
    { name: "Gradle", color: "#00c6be", angle: 0, ring: 2, step: 3 },
    { name: "Postman", color: "#ff6c37", angle: 0, ring: 2, step: 3 },
    { name: "StackOverflow", color: "#f58025", angle: 0, ring: 2, step: 3 }
];

const SOFT_SKILLS_DATA = [
    { key: "motivation" as const, color: "#4ea8ff", percent: 98, metric: "SYNC", icon: faBolt },
    { key: "adaptation" as const, color: "#62e2d5", percent: 95, metric: "FLEX", icon: faSliders },
    { key: "autonomy" as const, color: "#a855f7", percent: 92, metric: "AUTO", icon: faPerson },
    { key: "team_work" as const, color: "#eab308", percent: 96, metric: "TEAM", icon: faPeopleGroup }
];

function TechIcon({ name, className = "size-6" }: { name: string; className?: string }) {
    const url = retrieveLanguageByName(name);
    if (!url) return <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />;
    
    // Invert black NextJS, GitHub & Bash logos to white using CSS filters
    const filterStyle = (name.toLowerCase() === "nextjs" || name.toLowerCase() === "github" || name.toLowerCase() === "bash") ? { filter: "brightness(0) invert(1)" } : undefined;

    return (
        <img 
            src={url} 
            alt={name} 
            className={`${className} shrink-0 object-contain hover:scale-110 transition-transform duration-300`} 
            style={filterStyle}
            loading="lazy" 
        />
    );
}

// Child Badge Component: Compliant with React Hook Rules
interface BadgeProps {
    item: typeof TECH_CONSTELLATION[number];
    index: number;
    activeStep: number;
    radiusMultiplier: number;
    hoveredTech: string | null;
    onHover: (name: string | null) => void;
}

function ConstellationBadge({ item, index, activeStep, radiusMultiplier, hoveredTech, onHover }: BadgeProps) {
    const t = useTranslations("skills");
    
    const rowIndex = item.step - 1; // 0 (Languages), 1 (Frameworks), 2 (Ops)
    
    // Filter elements in the same step/row to compute dynamic column layout indices
    const rowItems = TECH_CONSTELLATION.filter(x => x.step === item.step);
    const colIndex = rowItems.findIndex(x => x.name === item.name);
    const rowSize = rowItems.length;
    
    // Concentric Rainbow Arcs centered slightly below the chest
    // Row 1 (10 items): Radius 500px (narrower circle, holds 10 badges nicely)
    // Row 2 (9 items): Radius 620px (120px vertical gap, holds 9 badges)
    // Row 3 (13 items): Radius 740px (120px vertical gap, wider circle holds 13 badges beautifully)
    const radii = [500, 620, 740];
    const r = radii[rowIndex] * radiusMultiplier;
    
    // Dynamic angle step based on row index and row size to ensure comfortable spacing without overlaps:
    // We dynamically scale the angle steps on small mobile viewports to prevent horizontal screen clipping
    const isMobile = radiusMultiplier < 0.6;
    const angleSteps = isMobile ? [7.2, 5.8, 4.2] : [11.5, 9.5, 7.2];
    const angleStep = angleSteps[rowIndex];
    
    const angleDeg = (colIndex - (rowSize - 1) / 2) * angleStep;
    const angleRad = (angleDeg * Math.PI) / 180;
    
    // Symmetrical flatter rainbow arch projection shifted down to align with lowered chest (+128px base translation)
    const finalX = r * Math.sin(angleRad);
    const finalY = -r * Math.cos(angleRad) + 460 * radiusMultiplier; // Shifting entire system down to float perfectly (+128px chest base - offset = +460px)
    
    // Staggered spring animations for automatic erupt / retract at each scroll step
    const isErupted = activeStep >= item.step;
    const delay = isErupted ? 0.05 + colIndex * 0.03 : (rowSize - 1 - colIndex) * 0.01;
    const isHovered = hoveredTech === item.name;

    // Load translations dynamically
    const t_category = t(`tech_details.${item.name.toLowerCase()}.category`);
    const t_exp = t(`tech_details.${item.name.toLowerCase()}.exp`);
    const t_desc = t(`tech_details.${item.name.toLowerCase()}.desc`);

    return (
        <motion.div
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
                x: isErupted ? finalX : 0,
                y: isErupted ? finalY : 0,
                scale: isErupted ? 1 : 0,
                opacity: isErupted ? 1 : 0
            }}
            transition={{
                x: { type: "spring", stiffness: isErupted ? 75 : 120, damping: isErupted ? 14 : 18, delay },
                y: { type: "spring", stiffness: isErupted ? 75 : 120, damping: isErupted ? 14 : 18, delay },
                scale: { type: "spring", stiffness: isErupted ? 90 : 120, damping: isErupted ? 14 : 18, delay },
                opacity: { type: "spring", stiffness: isErupted ? 90 : 120, damping: isErupted ? 14 : 18, delay }
            }}
            style={{
                zIndex: isHovered ? 100 : 20
            }}
            className="absolute origin-center cursor-pointer select-none will-change-transform"
            onMouseEnter={() => onHover(item.name)}
            onMouseLeave={() => onHover(null)}
        >
            {/* 
              Gentle levitating float drift using hardware-accelerated pure CSS keyframes.
              We use vanilla CSS animations offloaded directly to the GPU compositor thread,
              completely bypassing Framer Motion loop cycles and CPU layout calculations.
              Replaced expensive backdrop-blur-md with solid obsidian glass bg-[#0a0a0a]/90.
            */}
            <div
                className="relative flex items-center justify-center size-14 sm:size-18 md:size-20 rounded-full bg-[#0a0a0a]/90 border border-white/6 hover:border-accent-blue/40 shadow-lg transition-all duration-300 group will-change-transform"
                style={{
                    boxShadow: isHovered ? `0 0 25px ${item.color}35` : "none",
                    borderColor: isHovered ? `${item.color}40` : "rgba(255, 255, 255, 0.06)",
                    animation: isErupted && !isHovered 
                        ? `skillsBadgeFloat ${3.2 + (colIndex % 3) * 0.7 + (rowIndex % 2) * 0.5}s ease-in-out infinite` 
                        : "none"
                }}
            >
                {/* Neon shadow aura backdrop */}
                <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none"
                    style={{
                        background: `radial-gradient(circle, ${item.color}25 0%, transparent 70%)`
                    }}
                />
                
                <TechIcon name={item.name} className="size-8 sm:size-10 md:size-12" />

                {/* Minimal label (fades in on hover underneath badge if tooltip isn't captured) */}
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[8px] uppercase tracking-widest font-extrabold font-secondary text-gray-400 whitespace-nowrap bg-black/75 px-2 py-0.5 rounded border border-white/5 pointer-events-none">
                    {item.name}
                </span>
            </div>

            {/* 
              Sleek Floating Glass HUD Card Tooltip. 
              Always in the DOM to eliminate hover shivering.
              Dynamically conditions backdrop-blur-xl ONLY when hovered, saving 99% of GPU compositor memory!
            */}
            <motion.div
                initial={false}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 10,
                    scale: isHovered ? 1 : 0.95,
                    pointerEvents: isHovered ? "auto" : "none"
                }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                className={`absolute bottom-full mb-5 left-1/2 -translate-x-1/2 w-64 p-5 bg-[#050505]/95 ${isHovered ? 'backdrop-blur-xl' : ''} border border-white/10 rounded-2xl shadow-2xl z-[999] pointer-events-none text-left flex flex-col gap-3 selection:bg-accent-blue selection:text-white border-t-2`}
                style={{
                    borderTopColor: item.color,
                    boxShadow: `0 10px 30px -5px rgba(0,0,0,0.8), 0 0 15px ${item.color}20`,
                    borderColor: `${item.color}30`
                }}
            >
                {/* Ambient neon radial glow inside card */}
                <div 
                    className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)`
                    }}
                />
                
                {/* Header: Title, Category, Exp */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex flex-col">
                        <h4 className="font-primary text-sm font-bold text-white tracking-tight leading-none">{item.name}</h4>
                        <span className="text-[9px] uppercase tracking-widest text-accent-blue font-extrabold font-secondary mt-1">{t_category}</span>
                    </div>
                    <span className="text-[9px] font-secondary font-extrabold uppercase text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {t_exp}
                    </span>
                </div>
                
                {/* Description */}
                <p className="font-secondary text-[11px] text-gray-300 leading-relaxed font-semibold">
                    {t_desc}
                </p>
            </motion.div>
        </motion.div>
    );
}

// Scroll-driven soft skill card: slides in from the right and STAYS (additive reveal)
// Cards are in normal vertical flow - no absolute positioning
function SoftSkillCard({ skill, index, total, softScrollProgress, t_soft }: {
    skill: typeof SOFT_SKILLS_DATA[number];
    index: number;
    total: number;
    softScrollProgress: MotionValue<number>;
    t_soft: ReturnType<typeof useTranslations>;
}) {
    // Card i enters when scroll progress passes (i / total)
    // Animation completes in the next 10% of progress — very snappy, ~1 scroll per card
    const enterStart = index / total;
    const enterEnd = enterStart + 0.1;

    const x = useTransform(
        softScrollProgress,
        [Math.max(0, enterStart - 0.01), enterEnd],
        ["100%", "0%"]
    );
    const opacity = useTransform(
        softScrollProgress,
        [Math.max(0, enterStart - 0.01), enterEnd],
        [0, 1]
    );

    return (
        <motion.div
            style={{ x, opacity, borderLeftColor: skill.color }}
            className="w-full bg-white/[0.03] border border-white/8 border-l-4 rounded-2xl p-5 flex items-start gap-5 will-change-transform overflow-hidden"
        >
            {/* Subtle accent glow on left edge */}
            <div
                className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
                style={{ boxShadow: `4px 0 16px ${skill.color}30` }}
            />

            {/* Icon */}
            <div
                className="p-3 border rounded-xl flex items-center justify-center shrink-0"
                style={{
                    borderColor: `${skill.color}25`,
                    backgroundColor: `${skill.color}10`,
                    color: skill.color
                }}
            >
                <FontAwesomeIcon icon={skill.icon} className="size-5" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
                <h3
                    className="font-primary text-base font-extrabold tracking-tight uppercase"
                    style={{ color: skill.color }}
                >
                    {t_soft(`contents.${skill.key}.title`)}
                </h3>
                <p className="font-secondary text-sm text-gray-400 leading-relaxed">
                    {t_soft(`contents.${skill.key}.description`)}
                </p>
            </div>
        </motion.div>
    );
}

export default function SkillsClient() {
    const t = useTranslations("skills");
    const t_soft = useTranslations("skills.soft_skills");

    // Ref and states
    const containerRef = useRef<HTMLDivElement>(null);
    const softSkillsRef = useRef<HTMLDivElement>(null);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const [radiusMultiplier, setRadiusMultiplier] = useState(1);
    const [activeStep, setActiveStep] = useState(0);
    const [mounted, setMounted] = useState(false);

    // Safeguard target ref execution to occur only post-hydration on client-side
    useEffect(() => {
        setMounted(true);
    }, []);

    // Track scroll coordinates over the pinned parent timeline height
    const { scrollYProgress } = useScroll({
        target: mounted ? containerRef : undefined,
        offset: ["start start", "end end"]
    });

    // Separate scroll progress for the soft skills section
    const { scrollYProgress: softScrollProgress } = useScroll({
        target: mounted ? softSkillsRef : undefined,
        offset: ["start start", "end end"]
    });

    // Reactive scroll lock trigger - throttled exactly to step boundaries to prevent rendering lags
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        let newStep = 0;
        if (latest <= 0.05) {
            newStep = 0;
        } else if (latest <= 0.35) {
            newStep = 1;
        } else if (latest <= 0.65) {
            newStep = 2;
        } else {
            newStep = 3;
        }

        // identity gate: only trigger state update if the step actually changed!
        setActiveStep((prev) => {
            if (prev !== newStep) {
                return newStep;
            }
            return prev;
        });
    });

    // Handle responsive constellation radius boundaries
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setRadiusMultiplier(0.55);
            } else if (width < 1024) {
                setRadiusMultiplier(0.76);
            } else {
                setRadiusMultiplier(1.0);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Article pill={t("title")}>
            <div className="relative z-10 w-full flex flex-col gap-10 max-w-7xl mx-auto px-8 overflow-visible">
                
                {/* 1. SCROLL LOCKED LOCKING CHAMBER FOR CONSTELLATION ERUPTION (h-170vh parent) */}
                <div ref={containerRef} className="relative h-[170vh] w-full overflow-visible">
                    
                    {/* Sticky locking viewport frame */}
                    <div className="sticky top-[72px] h-[calc(100vh-72px)] w-full flex flex-col items-center justify-center overflow-visible select-none">


                        {/* 
                          Sticky Section Header. 
                          By placing this inside the sticky viewport container, it remains beautifully visible 
                          at the top of the viewport when the section pins!
                        */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-30 select-none w-full max-w-2xl px-6">
                            <h2 className="font-primary text-4xl sm:text-5xl font-extrabold tracking-tight leading-none text-white">
                                {t("title")}
                            </h2>
                            <p className="font-secondary text-xs sm:text-sm text-gray-400 mt-3 max-w-xl leading-relaxed">
                                {t("description")}
                            </p>
                        </div>

                        {/* Centered chamber container */}
                        <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center overflow-visible mt-16 sm:mt-20">
                            
                             {/* Ambient Light Beam from Open Suitcase */}
                            <motion.div
                                animate={{
                                    scaleY: activeStep >= 1 ? 1 : 0,
                                    opacity: activeStep >= 1 ? 0.7 : 0
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 60,
                                    damping: 15,
                                    delay: activeStep >= 1 ? 0.1 : 0
                                }}
                                className="absolute bottom-[50%] left-1/2 -translate-x-1/2 w-32 h-[300px] bg-gradient-to-t from-accent-blue/35 via-accent-teal/15 to-transparent blur-md rounded-full origin-bottom pointer-events-none z-0 translate-y-32"
                            />

                            {/* Majestic Cybernetic Treasure Chest base (w-72 sm:w-80 h-32 sm:h-36) */}
                            <div className="relative w-72 sm:w-80 h-32 sm:h-36 flex items-center justify-center z-10 mt-12 translate-y-32">
                                
                                {/* 3D Perspective Base Container */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-[#0c0c0c]/95 to-[#040404]/95 border-2 rounded-b-2xl shadow-2xl flex items-center justify-center preserve-3d group transition-all duration-500 will-change-transform ${activeStep >= 1 ? 'border-accent-blue/55 shadow-[0_0_40px_rgba(78,168,255,0.35)]' : 'border-white/10 shadow-black/85'}`}>
                                    
                                    {/* Symmetrical vertical metal panel straps on chest body */}
                                    <div className="absolute left-[20%] top-0 w-3 h-full bg-white/5 border-x border-white/5" />
                                    <div className="absolute right-[20%] top-0 w-3 h-full bg-white/5 border-x border-white/5" />
                                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-full bg-accent-blue/5 border-x border-accent-blue/10 flex items-center justify-center"><div className="w-[1px] h-full bg-accent-blue/20" /></div>

                                    {/* Mechanical Cyber Grab Rings (Side handles) */}
                                    <div className="absolute left-[-16px] top-1/4 w-4 h-12 border-2 border-r-0 border-white/15 rounded-l-xl flex items-center justify-end pointer-events-none"><div className="w-1.5 h-6 bg-white/10 rounded-full" /></div>
                                    <div className="absolute right-[-16px] top-1/4 w-4 h-12 border-2 border-l-0 border-white/15 rounded-r-xl flex items-center justify-start pointer-events-none"><div className="w-1.5 h-6 bg-white/10 rounded-full" /></div>

                                    {/* High-Tech mechanical corner armor brackets */}
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/20 rounded-bl-lg bg-white/[0.01]" />
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/20 rounded-br-lg bg-white/[0.01]" />

                                    {/* Breathing Neon Aura line */}
                                    <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-1 rounded-full transition-all duration-500 ${activeStep >= 1 ? 'bg-accent-blue/50 shadow-[0_0_15px_rgba(78,168,255,0.8)]' : 'bg-white/10 shadow-none'}`} />

                                    {/* Chest Interior Tech Panel (glowing power engine inside) */}
                                    <div className={`absolute inset-[3px] bg-[#020202] rounded-b-2xl overflow-hidden transition-all duration-500 z-0 flex flex-col items-center justify-center border border-accent-blue/20 ${activeStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(78,168,255,0.25)_0%,transparent_70%)] animate-pulse" />
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
                                        
                                        {/* Glowing power fusion core */}
                                        <div className="w-12 h-12 rounded-full border border-accent-teal/40 flex items-center justify-center bg-accent-teal/10 shadow-[0_0_20px_rgba(98,226,213,0.4)] animate-pulse">
                                            <span className="w-3 h-3 rounded-full bg-accent-blue shadow-[0_0_10px_#4ea8ff] animate-ping" />
                                        </div>
                                    </div>

                                    {/* Front Cyber Padlock Receiver Plate */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-[#0c0c0c] to-[#121212] border-2 border-white/8 rounded-xl shadow-inner flex items-center justify-center z-20">
                                        <div className={`absolute top-1 left-1 size-1 rounded-full ${activeStep >= 1 ? 'bg-accent-blue' : 'bg-red-500'}`} />
                                        <div className={`absolute top-1 right-1 size-1 rounded-full ${activeStep >= 1 ? 'bg-accent-blue' : 'bg-red-500'}`} />
                                        
                                        {/* Cyber lock indicator */}
                                        <div className={`size-8 rounded-full border border-dashed flex items-center justify-center animate-[spin_10s_linear_infinite] ${activeStep >= 1 ? 'border-accent-blue/35 bg-accent-blue/5' : 'border-white/10'}`}>
                                            <div className={`size-2 rounded-full transition-all duration-500 ${activeStep >= 1 ? 'bg-accent-teal animate-pulse shadow-[0_0_8px_#62e2d5]' : 'bg-red-500'}`} />
                                        </div>
                                    </div>

                                    {/* 3D VAULTED SEMICIRCULAR DOME LID (Mechanical hinge rotating backward - 115deg) */}
                                    <motion.div
                                        animate={{ rotateX: activeStep >= 1 ? -115 : 0 }}
                                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                                        style={{ transformStyle: "preserve-3d", originY: 1 }}
                                        className="absolute bottom-full left-[-2px] right-[-2px] h-24 sm:h-28 bg-gradient-to-t from-[#121212]/95 to-[#080808]/95 border-x-2 border-t-2 border-white/10 rounded-t-[48px] shadow-xl z-10 flex items-center justify-center origin-bottom will-change-transform"
                                    >
                                        {/* Domed lid interior atmospheric mesh */}
                                        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(78,168,255,0.2),transparent)] rounded-t-[48px] pointer-events-none transition-opacity duration-300 ${activeStep >= 1 ? 'opacity-100' : 'opacity-0'}`} />
                                        
                                        {/* Concentric mechanical bands running over the dome */}
                                        <div className="absolute left-[20%] top-0 w-3 h-full bg-white/5 border-x border-white/5" />
                                        <div className="absolute right-[20%] top-0 w-3 h-full bg-white/5 border-x border-white/5" />
                                        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-full bg-accent-teal/5 border-x border-accent-teal/10" />

                                        {/* Front Heavy Mechanical Padlock Clasp (Hangs over base receiver plate when closed) */}
                                        <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-10 h-14 bg-gradient-to-b from-[#181818] to-[#0c0c0c] border border-white/15 rounded-b-lg shadow-lg flex flex-col items-center justify-center z-20 pointer-events-none">
                                            {/* Holographic clasp detail lock slot */}
                                            <div className={`w-3.5 h-6 rounded-full border transition-colors duration-500 flex items-center justify-center ${activeStep >= 1 ? 'border-accent-teal/40 bg-accent-teal/5' : 'border-red-500/20 bg-red-500/5'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${activeStep >= 1 ? 'bg-accent-teal animate-ping' : 'bg-red-500'}`} />
                                            </div>
                                        </div>
                                    </motion.div>

                                </div>
                            </div>

                            {/* PROJECTED BADGES ORBIT matrix */}
                            {TECH_CONSTELLATION.map((item, index) => (
                                <ConstellationBadge
                                    key={item.name}
                                    item={item}
                                    index={index}
                                    activeStep={activeStep}
                                    radiusMultiplier={radiusMultiplier}
                                    hoveredTech={hoveredTech}
                                    onHover={setHoveredTech}
                                />
                            ))}

                        </div>

                    </div>
                </div>

                {/* 2. SOFT SKILLS — Scroll-Pinned Additive Reveal */}
                {/* Tall container: each scroll step reveals one more card from the right */}
                <div ref={softSkillsRef} className="relative w-full" style={{ height: `${SOFT_SKILLS_DATA.length * 50}vh` }}>

                    {/* Sticky viewport stays pinned during the entire reveal sequence */}
                    <div className="sticky top-[72px] h-[calc(100vh-72px)] w-full flex items-center overflow-hidden">

                        {/* Two-column layout: left title stays fixed, right cards stack up */}
                        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                            {/* LEFT — Title block */}
                            <div className="lg:col-span-4 flex flex-col gap-6 select-none">
                                <h2 className="font-primary text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
                                    {t_soft("title")}
                                </h2>
                                <p className="font-secondary text-sm text-gray-400 max-w-xs leading-relaxed">
                                    {t_soft("description")}
                                </p>
                            </div>

                            {/* RIGHT — Cards in vertical flow, each slides in from right on scroll */}
                            <div className="lg:col-span-8 flex flex-col gap-4 overflow-hidden">
                                {SOFT_SKILLS_DATA.map((skill, i) => (
                                    <SoftSkillCard
                                        key={skill.key}
                                        skill={skill}
                                        index={i}
                                        total={SOFT_SKILLS_DATA.length}
                                        softScrollProgress={softScrollProgress}
                                        t_soft={t_soft}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            {/* Super lightweight GPU-promoted keyframe stylesheet for lag-free floating animation at 120 FPS */}
            <style>{`
                @keyframes skillsBadgeFloat {
                    0%, 100% { transform: translateY(0) translateZ(0); }
                    50% { transform: translateY(-5px) translateZ(0); }
                }
            `}</style>
        </Article>
    );
}
