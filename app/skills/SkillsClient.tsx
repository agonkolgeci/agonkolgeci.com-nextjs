"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faPeopleGroup, faPerson, faSliders } from "@fortawesome/free-solid-svg-icons";
import Article from "@/components/pages/Article";
import { retrieveLanguageByName } from "@/components/utils/ui/Language";

// IT Skills Data
const LANGUAGES = ["Java", "JavaScript", "TypeScript", "Python", "C", "C++", "HTML", "CSS", "Sass"];
const FRAMEWORKS = ["Node", "React", "NextJS", "Tailwind CSS", "Redis"];
const TOOLS = ["Git", "GitHub", "GitLab", "Linux", "Jenkins", "Bash", "Powershell", "MySQL", "MongoDB"];

const ALL_STACKS = [...LANGUAGES, ...FRAMEWORKS, ...TOOLS];

// Soft Skills Icons
const SOFT_SKILLS_ICONS = {
    motivation: faBolt,
    adaptation: faSliders,
    autonomy: faPerson,
    team_work: faPeopleGroup
} as const;

function TechIcon({ name, className = "size-6" }: { name: string; className?: string }) {
    const url = retrieveLanguageByName(name);
    if (!url) return <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />;
    return (
        <img 
            src={url} 
            alt={name} 
            className={`${className} shrink-0 object-contain hover:scale-115 transition-transform duration-300`} 
            loading="lazy" 
        />
    );
}

export default function SkillsClient() {
    const t = useTranslations("skills");
    const t_it = useTranslations("skills.it_skills");
    const t_soft = useTranslations("skills.soft_skills");

    // Seamless looping array (doubled for visual marquee wrap)
    const marqueeItems = [...ALL_STACKS, ...ALL_STACKS];

    const cardVariants = {
        hidden: { opacity: 0, y: 35 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 90, damping: 15 }
        }
    } as const;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    return (
        <Article title={t("title")} description={t("description")}>
            <div className="w-full flex flex-col gap-24 py-10 max-w-7xl mx-auto px-8 overflow-hidden">
                
                {/* 1. FUTURISTIC TECH TICKER (INFINITE HORIZONTAL MARQUEE) */}
                <div className="relative w-full flex flex-col gap-4 overflow-hidden py-4 select-none">
                    <span className="text-[10px] uppercase tracking-widest text-accent-blue font-extrabold font-secondary text-center">Tech Stack Loop</span>
                    
                    {/* Shadow Blurs on Edges */}
                    <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                    
                    <div className="w-full overflow-hidden flex flex-row border-y border-white/5 py-6 bg-secondary/10">
                        <div className="animate-marquee flex gap-8 whitespace-nowrap">
                            {marqueeItems.map((item, index) => (
                                <div 
                                    key={`${item}-${index}`}
                                    className="bg-secondary/40 border border-white/5 rounded-full px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-gray-300 flex items-center gap-2.5 hover:border-accent-blue/40 hover:text-white transition-all cursor-default active:scale-95 duration-200"
                                >
                                    <TechIcon name={item} />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. GLOWING BENTO GRID: IT SKILLS PANELS */}
                <div className="flex flex-col gap-8 w-full">
                    <div className="flex flex-col gap-2 text-center lg:text-left">
                        <h2 className="font-primary text-3xl font-extrabold text-white tracking-tight">{t_it("title")}</h2>
                        <p className="font-secondary text-sm text-gray-400 max-w-xl">{t_it("description")}</p>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4"
                    >
                        {/* LANGUAGES PANEL (Blue Glow) */}
                        <motion.div 
                            variants={cardVariants}
                            className="bg-secondary/30 rounded-3xl p-8 glow-card-blue flex flex-col gap-6"
                        >
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <h3 className="font-primary text-lg font-bold text-white uppercase tracking-wider">{t_it("contents.languages.title")}</h3>
                                <span className="text-[10px] uppercase tracking-widest text-accent-blue font-extrabold font-secondary">Core</span>
                            </div>
                            <ul className="grid grid-cols-2 gap-4">
                                {LANGUAGES.map(lang => (
                                    <li key={lang} className="flex items-center gap-2.5 text-sm text-gray-300 font-secondary hover:text-accent-blue transition-colors duration-200">
                                        <TechIcon name={lang} />
                                        {lang}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* FRAMEWORKS PANEL (Teal Glow) */}
                        <motion.div 
                            variants={cardVariants}
                            className="bg-secondary/30 rounded-3xl p-8 glow-card-teal flex flex-col gap-6"
                        >
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <h3 className="font-primary text-lg font-bold text-white uppercase tracking-wider">{t_it("contents.frameworks.title")}</h3>
                                <span className="text-[10px] uppercase tracking-widest text-accent-teal font-extrabold font-secondary">Stack</span>
                            </div>
                            <ul className="grid grid-cols-2 gap-4">
                                {FRAMEWORKS.map(fw => (
                                    <li key={fw} className="flex items-center gap-2.5 text-sm text-gray-300 font-secondary hover:text-accent-teal transition-colors duration-200">
                                        <TechIcon name={fw} />
                                        {fw}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* TOOLS PANEL (Blue Glow) */}
                        <motion.div 
                            variants={cardVariants}
                            className="bg-secondary/30 rounded-3xl p-8 glow-card-blue flex flex-col gap-6"
                        >
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <h3 className="font-primary text-lg font-bold text-white uppercase tracking-wider">{t_it("contents.tools.title")}</h3>
                                <span className="text-[10px] uppercase tracking-widest text-accent-blue font-extrabold font-secondary">Ops</span>
                            </div>
                            <ul className="grid grid-cols-2 gap-4">
                                {TOOLS.map(tool => (
                                    <li key={tool} className="flex items-center gap-2.5 text-sm text-gray-300 font-secondary hover:text-accent-blue transition-colors duration-200">
                                        <TechIcon name={tool} />
                                        {tool}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>

                {/* 3. SOFT SKILLS ASYMMETRIC DASHBOARD */}
                <div className="flex flex-col gap-8 w-full mt-8">
                    <div className="flex flex-col gap-2 text-center lg:text-left">
                        <h2 className="font-primary text-3xl font-extrabold text-white tracking-tight">{t_soft("title")}</h2>
                        <p className="font-secondary text-sm text-gray-400 max-w-xl">{t_soft("description")}</p>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4"
                    >
                        {(["motivation", "adaptation", "autonomy", "team_work"] as const).map(key => {
                            const icon = SOFT_SKILLS_ICONS[key];
                            return (
                                <motion.div 
                                    key={key}
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.01, y: -4 }}
                                    className="group relative overflow-hidden bg-secondary/20 border border-white/8 rounded-3xl p-8 flex flex-col sm:flex-row items-start gap-6 hover:border-accent-blue/30 hover:shadow-[0_10px_30px_rgba(204,255,0,0.03)] transition-all duration-300 interactive-card"
                                    data-cursor-text="SOFT"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    
                                    <div className="p-4 bg-secondary/60 border border-white/10 rounded-2xl text-accent-blue group-hover:text-black group-hover:bg-accent-blue group-hover:scale-110 transition-all duration-300 flex items-center justify-center shrink-0">
                                        <FontAwesomeIcon icon={icon} className="size-6" />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-primary text-lg font-bold text-white tracking-tight uppercase group-hover:text-accent-blue transition-colors duration-300">
                                            {t_soft(`contents.${key}.title`)}
                                        </h3>
                                        <p className="font-secondary text-sm text-gray-400 leading-relaxed">
                                            {t_soft(`contents.${key}.description`)}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

            </div>
        </Article>
    );
}
