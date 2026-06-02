"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUsers, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Article from "@/components/pages/Article";
import { 
    ANTOINE_MAENDLY, ELIE_BUSSOD, JEAN_LUC_FALCONE, CHRISTOPHE_CHARPILLOZ, 
    DELPHINE_COURVOISIER, ALEXANDRE_RIEDO 
} from "@/components/utils/Team";

// Experiences Datasets
const ACADEMIC_EXPERIENCES = [
    {
        key: "redcap-swisscom-module",
        image: "/experiences/redcap.webp",
        links: [
            { name: "REDCap Docs", icon: faBook, href: "https://github.com/vanderbilt-redcap/external-module-framework-docs" },
            { name: "LinkedIn", icon: faBook, href: "https://www.linkedin.com/in/agon-kolgeci-193aa2266/details/projects/1845300922/multiple-media-viewer?profileId=ACoAAEFNEH8B107RMPVu2EN12QzgvvXhLXPSbys&treasuryMediaId=1756339441754&type=LINK" }
        ],
        tags: ["unige"],
        languages: ["PHP", "Docker", "MySQL"],
        tasks: ["1", "2", "3", "4"],
        team: [
            { role: "collaborators", members: [ANTOINE_MAENDLY, ELIE_BUSSOD] },
            { role: "supervisors", members: [JEAN_LUC_FALCONE, CHRISTOPHE_CHARPILLOZ] },
            { role: "clients", members: [DELPHINE_COURVOISIER] }
        ]
    },
    {
        key: "swerc2024",
        image: "/experiences/swerc2024.webp",
        links: [
            { name: "Website", href: "https://swerc.eu/2024" },
            { name: "GitHub", icon: faGithub, href: "https://github.com/agonkolgeci/swerc2024" }
        ],
        tags: ["unige"],
        languages: ["C++"],
        tasks: ["1", "2"],
        team: [
            { role: "collaborators", members: [ANTOINE_MAENDLY, ALEXANDRE_RIEDO] }
        ]
    }
] as const;

const PROFESSIONAL_EXPERIENCES = [
    {
        key: "world-heberg",
        image: "/experiences/world-heberg.png",
        tags: ["volunteering"],
        tasks: ["1", "2"],
        languages: ["Java", "JavaScript"]
    },
    {
        key: "buro_plus",
        image: "/experiences/buroplus.webp",
        links: [
            { name: "Website", href: "https://www.buroplus.com/" }
        ],
        tags: ["internship"],
        tasks: ["1", "2", "3", "4"],
        languages: ["SQL", "Windows Server"]
    }
] as const;

const PERSONAL_EXPERIENCES = [
    {
        key: "web",
        image: "/experiences/web.webp",
        links: [
            { name: "GitHub", icon: faGithub, href: "https://github.com/agonkolgeci/agonkolgeci.com-nextjs" },
            { name: "V1 Live", href: "https://v1.agonkolgeci.com/" }
        ],
        languages: ["React", "NextJS", "Tailwind CSS", "Sass", "TypeScript"],
        tasks: ["1", "2", "3"]
    },
    {
        key: "discord",
        image: "/experiences/discord.webp",
        links: [
            { name: "GitHub", icon: faGithub, href: "https://github.com/agonkolgeci?tab=repositories&q=&type=source&language=javascript" }
        ],
        languages: ["Java", "JavaScript"],
        tasks: ["1", "2", "3"]
    },
    {
        key: "minecraft",
        image: "/experiences/minecraft.webp",
        links: [
            { name: "GitHub", icon: faGithub, href: "https://github.com/agonkolgeci?tab=repositories&q=&type=source&language=java" }
        ],
        languages: ["Java", "Redis", "MySQL", "Linux", "Bash"],
        tasks: ["1", "2", "3"]
    }
] as const;

function ExperienceCard({
    expKey,
    category,
    data,
    glow,
    milestoneIndex
}: {
    expKey: string;
    category: "academic" | "professional" | "personal";
    data: any;
    glow: "lime" | "orange";
    milestoneIndex: number;
}) {
    const t = useTranslations("experiences");
    const t_academic = useTranslations("experiences.academic_experiences");
    const t_professional = useTranslations("experiences.professional_experiences");
    const t_personal = useTranslations("experiences.personal_experiences");
    const t_team = useTranslations("team");

    const expPath = `contents.${expKey}`;
    const t_ns = category === "academic" ? t_academic : category === "professional" ? t_professional : t_personal;
    const title = t_ns(`${expPath}.title`);
    const date = t_ns(`${expPath}.date`);
    const description = t_ns(`${expPath}.description`);
    const glowClass = glow === "orange" ? "glow-card-teal" : "glow-card-blue";
    const activeAccent = glow === "orange" ? "text-accent-teal" : "text-accent-blue";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
            whileHover={{ scale: 1.01, y: -4 }}
            className={`bg-secondary/30 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 border border-white/8 ${glowClass} flex flex-col md:flex-row gap-6 sm:gap-8 overflow-hidden relative group interactive-card transition-all duration-300 w-full`}
            data-cursor-text={category === 'academic' ? 'STUDY' : category === 'professional' ? 'WORK' : 'CODE'}
        >
            {/* Ambient corner light glow */}
            <div className={`absolute top-0 right-0 w-[180px] h-[180px] rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${glow === 'orange' ? 'bg-accent-teal/5' : 'bg-accent-blue/5'}`} />

            {/* Cover Image Wrapper */}
            <div className="w-full md:w-[240px] h-[150px] md:h-[180px] relative overflow-hidden rounded-2xl shrink-0 shadow-lg">
                <Image
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    src={data.image}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, 240px"
                    alt={title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-black/40" />
            </div>

            {/* Full Details Grid */}
            <div className="flex flex-col gap-4 flex-1 justify-between">
                
                {/* Header Row: Title, Date, Links */}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-start w-full gap-4">
                        <div className="flex flex-col gap-1">
                            <span className={`text-[8.5px] font-extrabold uppercase font-secondary tracking-widest px-2.5 py-0.5 rounded-full w-max ${glow === 'orange' ? 'bg-accent-teal/10 text-accent-teal border border-accent-teal/20' : 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'}`}>
                                Milestone 0{milestoneIndex}
                            </span>
                            <h3 className="font-primary text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-accent-blue transition-colors duration-300 leading-snug mt-1">
                                {title}
                            </h3>
                        </div>

                        {data.links && (
                            <div className="flex gap-1.5 shrink-0 pt-1">
                                {data.links.map((link: any, i: number) => (
                                    <Link 
                                        key={i} 
                                        href={link.href} 
                                        target="_blank" 
                                        className="bg-secondary/80 border border-white/8 hover:border-accent-blue/45 text-gray-300 hover:text-white p-1 rounded-full text-xs transition-all flex items-center justify-center size-7 cursor-pointer shadow-md"
                                    >
                                        <FontAwesomeIcon icon={link.icon || faExternalLinkAlt} className="size-3" />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <time className={`font-secondary text-[10px] font-extrabold uppercase tracking-widest ${activeAccent}`}>
                        {date}
                    </time>
                </div>

                {/* Description */}
                <p className="font-secondary text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {description}
                </p>

                {/* Tech Row & Team Row */}
                <div className="flex flex-col gap-3 mt-1.5">
                    {/* Tech Row */}
                    {(data.tags || data.languages) && (
                        <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-3.5 shrink-0">
                            {data.tags?.map((tag: string) => (
                                <span key={tag} className="bg-accent-teal/15 border border-accent-teal/30 text-accent-teal px-2.5 py-0.5 rounded-full text-[8.5px] uppercase tracking-widest font-extrabold font-secondary">
                                    {tag}
                                </span>
                            ))}
                            {data.languages?.map((lang: string) => (
                                <span key={lang} className="bg-accent-blue/15 border border-accent-blue/30 text-accent-blue px-2.5 py-0.5 rounded-full text-[8.5px] uppercase tracking-widest font-extrabold font-secondary">
                                    {lang}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Teammates Capsule Row */}
                    {data.team && (
                        <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2 select-none shrink-0">
                            <span className="text-[7.5px] uppercase tracking-widest text-gray-500 font-extrabold font-secondary flex items-center gap-1">
                                <FontAwesomeIcon icon={faUsers} className="size-2.5" />
                                {t("collaborators_supervisor")}
                            </span>
                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                                {data.team.map((group: any) => (
                                    <div key={group.role} className="flex items-center gap-2 text-[8.5px]">
                                        <span className="text-gray-500 capitalize font-medium">{t_team(group.role, { count: group.members.length })}:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {group.members.map((member: any) => (
                                                <Link 
                                                    key={member.name} 
                                                    href={member.href} 
                                                    target="_blank" 
                                                    className="text-accent-blue font-bold hover:underline cursor-pointer"
                                                >
                                                    {member.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </motion.div>
    );
}

export default function ExperiencesClient() {
    const t = useTranslations("experiences");
    const [activeSlide, setActiveSlide] = useState(0);

    // Track active sections in vertical viewport scroll dynamically
    useEffect(() => {
        const sections = ["academic-section", "professional-section", "personal-section"];
        const observers = sections.map((id, index) => {
            const el = document.getElementById(id);
            if (!el) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSlide(index);
                    }
                },
                {
                    rootMargin: "-25% 0px -40% 0px",
                    threshold: 0
                }
            );
            observer.observe(el);
            return observer;
        });

        return () => {
            observers.forEach((obs) => obs?.disconnect());
        };
    }, []);

    // Smooth scroll helper to jump directly to any category section
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const headerOffset = 130; // Push content down cleanly below fixed navigation
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    };

    const chapters = [
        { id: 0, key: "academic-section", title: t("chapters.academic.title"), label: "01", desc: t("chapters.academic.desc"), glow: "lime" },
        { id: 1, key: "professional-section", title: t("chapters.professional.title"), label: "02", desc: t("chapters.professional.desc"), glow: "orange" },
        { id: 2, key: "personal-section", title: t("chapters.personal.title"), label: "03", desc: t("chapters.personal.desc"), glow: "lime" }
    ];

    return (
        <Article title={t("title")} description={t("description")} pill={t("title")}>
            <div className="w-full bg-primary text-white overflow-visible selection:bg-accent-blue selection:text-white relative">
                
                {/* Visual grid guide lines */}
                <div className="absolute top-0 left-[12%] w-[1px] h-full bg-white/2 pointer-events-none" />
                <div className="absolute top-0 right-[12%] w-[1px] h-full bg-white/2 pointer-events-none" />
                
                {/* Ambient Background Glows */}
                <div className="absolute top-1/4 left-[-150px] w-[500px] h-[500px] bg-accent-blue/4 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-[-150px] w-[500px] h-[500px] bg-accent-teal/4 rounded-full blur-[140px] pointer-events-none" />

                {/* 2-Column Spacious Vertical Directory Grid */}
                <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 overflow-visible">
                    
                    {/* LEFT COLUMN: Pinned Glassmorphic Tracker Directory */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-[140px] h-fit bg-secondary/15 border border-white/5 rounded-[32px] p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6 select-none relative overflow-hidden">
                            {/* Glow ambient light */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/3 rounded-full blur-2xl pointer-events-none" />
                            
                            {/* Header label */}
                            <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
                                <span className="text-[9px] uppercase tracking-widest text-gray-500 font-extrabold font-secondary">{t("catalog_index")}</span>
                                <h3 className="font-primary text-xl font-bold text-white tracking-tight uppercase">{t("chapters_header")}</h3>
                            </div>

                            {/* Dynamic tab list */}
                            <div className="flex flex-col gap-4 mt-2">
                                {chapters.map((cat, index) => {
                                    const isActive = activeSlide === index;
                                    const activeBg = cat.glow === "orange" ? "bg-accent-teal/5 border-accent-teal/20" : "bg-accent-blue/5 border-accent-blue/20";
                                    return (
                                        <button
                                            key={cat.key}
                                            onClick={() => scrollToSection(cat.key)}
                                            className={`flex flex-col items-start gap-1 text-left p-4 rounded-2xl border transition-all duration-500 w-full cursor-pointer group ${
                                                isActive 
                                                    ? `${activeBg} shadow-sm translate-x-1` 
                                                    : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/1"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`font-primary text-[10px] font-black transition-colors duration-300 px-2 py-0.5 rounded-md ${isActive ? (cat.glow === 'orange' ? 'bg-accent-teal/15 text-accent-teal' : 'bg-accent-blue/15 text-accent-blue') : 'bg-secondary text-gray-500 group-hover:text-gray-300'}`}>
                                                    {cat.label}
                                                </span>
                                                <span className={`font-primary text-sm font-extrabold tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-400"}`}>
                                                    {cat.title}
                                                </span>
                                            </div>
                                            <span className={`text-[10px] font-secondary leading-relaxed transition-all duration-300 text-gray-400 ${isActive ? "block mt-2" : "hidden pointer-events-none"}`}>
                                                {cat.desc}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Spacious Vertical Stack of Cards */}
                    <div className="lg:col-span-8 flex flex-col gap-24 sm:gap-28 pb-16">
                        
                        {/* Section 01: Academic */}
                        <section id="academic-section" className="flex flex-col gap-8 scroll-mt-32">
                            <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-blue font-bold text-xs uppercase tracking-widest font-secondary">Chapter 01</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                                </div>
                                <h2 className="font-primary text-3xl font-black text-white tracking-tight">{t("chapters.academic.title")}</h2>
                                <p className="font-secondary text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl mt-1">
                                    {t("chapters.academic.long_desc")}
                                </p>
                            </div>
                            <div className="flex flex-col gap-8">
                                <ExperienceCard expKey="redcap-swisscom-module" category="academic" data={ACADEMIC_EXPERIENCES[0]} glow="lime" milestoneIndex={1} />
                                <ExperienceCard expKey="swerc2024" category="academic" data={ACADEMIC_EXPERIENCES[1]} glow="orange" milestoneIndex={2} />
                            </div>
                        </section>

                        {/* Section 02: Professional */}
                        <section id="professional-section" className="flex flex-col gap-8 scroll-mt-32">
                            <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-teal font-bold text-xs uppercase tracking-widest font-secondary">Chapter 02</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                                </div>
                                <h2 className="font-primary text-3xl font-black text-white tracking-tight">{t("chapters.professional.title")}</h2>
                                <p className="font-secondary text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl mt-1">
                                    {t("chapters.professional.long_desc")}
                                </p>
                            </div>
                            <div className="flex flex-col gap-8">
                                <ExperienceCard expKey="world-heberg" category="professional" data={PROFESSIONAL_EXPERIENCES[0]} glow="lime" milestoneIndex={3} />
                                <ExperienceCard expKey="buro_plus" category="professional" data={PROFESSIONAL_EXPERIENCES[1]} glow="orange" milestoneIndex={4} />
                            </div>
                        </section>

                        {/* Section 03: Personal */}
                        <section id="personal-section" className="flex flex-col gap-8 scroll-mt-32">
                            <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-blue font-bold text-xs uppercase tracking-widest font-secondary">Chapter 03</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                                </div>
                                <h2 className="font-primary text-3xl font-black text-white tracking-tight">{t("chapters.personal.title")}</h2>
                                <p className="font-secondary text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl mt-1">
                                    {t("chapters.personal.long_desc")}
                                </p>
                            </div>
                            <div className="flex flex-col gap-8">
                                <ExperienceCard expKey="web" category="personal" data={PERSONAL_EXPERIENCES[0]} glow="lime" milestoneIndex={5} />
                                <ExperienceCard expKey="discord" category="personal" data={PERSONAL_EXPERIENCES[1]} glow="orange" milestoneIndex={6} />
                                <ExperienceCard expKey="minecraft" category="personal" data={PERSONAL_EXPERIENCES[2]} glow="lime" milestoneIndex={7} />
                            </div>
                        </section>

                    </div>
                </div>

            </div>
        </Article>
    );
}
