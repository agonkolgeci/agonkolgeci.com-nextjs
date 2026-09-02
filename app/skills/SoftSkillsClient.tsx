"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faSliders, faPerson, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import Article from "@/components/pages/Article";

const SOFT_SKILLS_DATA = [
    { 
        key: "motivation" as const, 
        color: "#4ea8ff", 
        metric: "ENERGY", 
        icon: faBolt,
        glowClass: "glow-card-blue"
    },
    { 
        key: "adaptation" as const, 
        color: "#62e2d5", 
        metric: "AGILE", 
        icon: faSliders,
        glowClass: "glow-card-teal"
    },
    { 
        key: "autonomy" as const, 
        color: "#a855f7", 
        metric: "DRIVE", 
        icon: faPerson,
        glowClass: "glow-card-blue"
    },
    { 
        key: "team_work" as const, 
        color: "#38bdf8", 
        metric: "COLLAB", 
        icon: faPeopleGroup,
        glowClass: "glow-card-teal"
    }
];

export default function SoftSkillsClient() {
    const t_soft = useTranslations("skills.soft_skills");

    return (
        <article className="relative w-full bg-transparent text-white overflow-visible selection:bg-accent-blue selection:text-white">
            {/* Visual guide markers reminiscent of premium Webflow layouts */}
            <div className="absolute top-0 left-[15%] w-[1px] h-full bg-white/2 pointer-events-none" />
            <div className="absolute top-0 right-[15%] w-[1px] h-full bg-white/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* LEFT COLUMN — Sticky Title & Description */}
                    <div className="lg:col-span-5 lg:sticky lg:top-[120px] flex flex-col gap-4 select-none">
                        <h2 className="font-primary text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
                            {t_soft("title")}
                        </h2>

                        <p className="font-secondary text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
                            {t_soft("description")}
                        </p>
                    </div>

                    {/* RIGHT COLUMN — Stack of compact cards appearing smoothly on scroll */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        {SOFT_SKILLS_DATA.map((skill) => {
                            return (
                                <motion.div
                                    key={skill.key}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                    className="w-full bg-white/[0.03] border border-white/8 border-l-4 rounded-2xl p-5 flex items-start gap-5 overflow-hidden relative interactive-card group hover:border-white/20 transition-all duration-300"
                                    style={{ borderLeftColor: skill.color }}
                                    data-cursor-text="SKILL"
                                >
                                    {/* Subtle accent glow on left edge */}
                                    <div
                                        className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
                                        style={{ boxShadow: `4px 0 16px ${skill.color}30` }}
                                    />

                                    {/* Icon */}
                                    <div
                                        className="p-3 border rounded-xl flex items-center justify-center shrink-0 shadow-inner"
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
                        })}
                    </div>

                </div>
            </div>
        </article>
    );
}
