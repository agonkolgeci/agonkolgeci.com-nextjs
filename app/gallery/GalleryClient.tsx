"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faAngleDown, faAngleUp, faCodeFork, faStar, faFolderOpen, 
    faUsers, faFilter, faArchive, faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import Article from "@/components/pages/Article";
import { retrieveRepositories, Repository } from "@/components/utils/api/github";
import { FABIEN_GRAYSSAGUEL, LEO_RIVIERES } from "@/components/utils/Team";

// Projects Dataset
const PROJECTS = [
    {
        key: "project-family",
        image: "/gallery/project-family.webp",
        links: [
            { name: "Website", href: "https://playze.org/project-family/" }
        ],
        tags: ["lead-developer"],
        team: [
            { role: "founders", members: [FABIEN_GRAYSSAGUEL] }
        ]
    },
    {
        key: "nexus",
        image: "/gallery/nexus.webp",
        links: [
            { name: "GitHub", icon: faGithub, href: "https://github.com/agonkolgeci/Nexus" }
        ],
        tags: ["founder", "lead-developer"],
        team: [
            { role: "thanks", members: [FABIEN_GRAYSSAGUEL] }
        ]
    },
    {
        key: "stranger-hide",
        image: "/gallery/strangerhide.webp",
        links: [
            { name: "GitHub", icon: faGithub, href: "https://github.com/StrangerHide/" }
        ],
        tags: ["lead-developer"],
        team: [
            { role: "founders", members: [LEO_RIVIERES, FABIEN_GRAYSSAGUEL] }
        ]
    },
    {
        key: "playze-family-bot",
        image: "/gallery/playze-family-bot.webp",
        links: [
            { name: "Discord App", icon: faDiscord, href: "https://discord.com/application-directory/1112083786130280488" }
        ],
        tags: ["lead-developer"],
        team: [
            { role: "collaborators", members: [FABIEN_GRAYSSAGUEL] }
        ]
    },
    {
        key: "berkasia",
        image: "/gallery/berkasia.webp",
        links: [
            { name: "GitHub", icon: faGithub, href: "https://github.com/Berkasia/" }
        ],
        tags: ["founder", "lead-developer"]
    }
] as const;

export default function GalleryClient() {
    const t = useTranslations("gallery");
    const t_projects = useTranslations("gallery.projects");
    const t_repos = useTranslations("gallery.repositories");
    const t_team = useTranslations("team");

    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [showArchives, setShowArchives] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const repos = await retrieveRepositories();
                setRepositories(repos);
            } catch (err) {
                console.error("Failed to load GitHub repos", err);
            }
        };
        fetchRepos();
    }, []);

    // Filter active (non-archived) repositories
    const activeRepos = repositories.filter(repo => {
        if (repo.fork || repo.name === repo.owner.login) return false;
        if (repo.archived) return false;
        if (selectedLanguage !== "All") {
            if (!repo.language || repo.language.toLowerCase() !== selectedLanguage.toLowerCase()) return false;
        }
        return true;
    }).sort((a, b) => b.stargazers_count - a.stargazers_count);

    // Filter archived repositories
    const archivedRepos = repositories.filter(repo => {
        if (repo.fork || repo.name === repo.owner.login) return false;
        if (!repo.archived) return false;
        if (selectedLanguage !== "All") {
            if (!repo.language || repo.language.toLowerCase() !== selectedLanguage.toLowerCase()) return false;
        }
        return true;
    }).sort((a, b) => b.stargazers_count - a.stargazers_count);

    // Dynamic list of languages present in repositories for filtering
    const languages = ["All", "Java", "TypeScript", "JavaScript", "C++", "PHP"];

    const cardVariants = {
        hidden: { opacity: 0, y: 35 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 90, damping: 16 }
        }
    } as const;

    const renderCard = (repo: any) => {
        const isArchived = repo.archived;
        return (
            <motion.div
                layout
                key={repo.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className={`group relative bg-secondary/30 rounded-3xl p-7 border flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.5)] ${isArchived ? 'border-accent-teal/20 hover:border-accent-teal/50' : 'border-white/8 hover:border-accent-blue/45'} interactive-card`}
                data-cursor-text="CODE"
            >
                <div className="flex flex-col gap-4">
                    {/* Repo Header */}
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faFolderOpen} className={`size-4 ${isArchived ? 'text-accent-teal' : 'text-accent-blue'}`} />
                            <Link href={repo.html_url} target="_blank" className="font-primary text-base font-bold text-white hover:text-accent-blue hover:underline transition-colors leading-tight">
                                {repo.name}
                            </Link>
                        </div>
                        
                        {repo.homepage && (
                            <Link href={repo.homepage} target="_blank" className="text-gray-400 hover:text-white transition-colors shrink-0">
                                <FontAwesomeIcon icon={faExternalLinkAlt} className="size-3.5" />
                            </Link>
                        )}
                    </div>

                    {/* Stars and Forks counters */}
                    {(repo.stargazers_count > 0 || repo.forks_count > 0) && (
                        <div className="flex gap-4 select-none">
                            {repo.stargazers_count > 0 && (
                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <FontAwesomeIcon icon={faStar} className="size-3.5 text-yellow-500 animate-pulse" />
                                    <span className="font-bold text-white">{repo.stargazers_count}</span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider">{t_repos(`properties.stars`, { count: repo.stargazers_count }).replace(/[0-9]/g, '').trim()}</span>
                                </div>
                            )}
                            {repo.forks_count > 0 && (
                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <FontAwesomeIcon icon={faCodeFork} className="size-3.5 text-gray-500" />
                                    <span className="font-bold text-white">{repo.forks_count}</span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider">{t_repos(`properties.forks`, { count: repo.forks_count }).replace(/[0-9]/g, '').trim()}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Description */}
                    {repo.description && (
                        <p className="font-secondary text-xs text-gray-400 leading-relaxed max-w-sm line-clamp-3">
                            {repo.description}
                        </p>
                    )}
                </div>

                {/* Language and Status Pill */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    {repo.language ? (
                        <span className={`text-[10px] uppercase tracking-widest font-extrabold font-secondary ${isArchived ? 'text-accent-teal' : 'text-accent-blue'}`}>
                            {repo.language}
                        </span>
                    ) : (
                        <span />
                    )}
                    
                    {isArchived ? (
                        <span className="bg-accent-teal/10 border border-accent-teal/30 text-accent-teal px-2.5 py-0.5 rounded-full text-[8px] uppercase tracking-widest font-extrabold font-secondary">
                            Archived
                        </span>
                    ) : repo.is_template ? (
                        <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 px-2.5 py-0.5 rounded-full text-[8px] uppercase tracking-widest font-extrabold font-secondary">
                            Template
                        </span>
                    ) : (
                        <span className="bg-white/5 border border-white/10 text-gray-400 px-2.5 py-0.5 rounded-full text-[8px] uppercase tracking-widest font-extrabold font-secondary">
                            Active
                        </span>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <Article title={t("title")} description={t("description")}>
            <div className="w-full py-10 max-w-7xl mx-auto px-8 flex flex-col gap-24">
                
                {/* PART 1: PREMIUM ZOOM CARD PROJECTS SECTION */}
                <div className="flex flex-col gap-8 w-full mt-4">
                    <div className="flex flex-col gap-2 text-center lg:text-left select-none">
                        <span className="text-[10px] uppercase tracking-widest text-accent-blue font-extrabold font-secondary">Featured Works</span>
                        <h2 className="font-primary text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">{t_projects("title")}</h2>
                        <p className="font-secondary text-sm md:text-base text-gray-400 mt-2">{t_projects("description")}</p>
                    </div>

                    <div className="flex flex-col gap-10 w-full mt-6">
                        {(PROJECTS as readonly any[]).map(project => {
                            const projectPath = `contents.${project.key}`;
                            const title = t_projects(`${projectPath}.title`);
                            const date = t_projects(`${projectPath}.date`);
                            const description = t_projects(`${projectPath}.description`);

                            return (
                                <motion.div
                                    key={project.key}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    variants={cardVariants}
                                    whileHover={{ y: -8 }}
                                    className="group relative flex flex-col lg:flex-row items-stretch w-full bg-secondary/35 border border-white/8 rounded-3xl overflow-hidden hover:border-accent-blue/45 hover:shadow-[0_15px_45px_rgba(204,255,0,0.04)] transition-all duration-500 interactive-card"
                                    data-cursor-text="VISIT"
                                >
                                    {/* Hover Radial Glow */}
                                    <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent-blue/3 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    {/* Left/Top: Image section */}
                                    <div className="w-full lg:w-[45%] h-[240px] lg:h-auto relative overflow-hidden shrink-0">
                                        <Image
                                            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                            src={project.image}
                                            fill={true}
                                            sizes="(max-width: 1024px) 100vw, 45vw"
                                            alt={title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/80" />
                                    </div>

                                    {/* Right/Bottom: Content Details */}
                                    <div className="flex-1 flex flex-col justify-between p-8 lg:p-10 gap-6 w-full">
                                        <div className="flex flex-col gap-4">
                                            
                                            {/* Title block */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                                                <div className="flex flex-col">
                                                    <h3 className="font-primary text-xl lg:text-2xl font-extrabold text-white tracking-tight group-hover:text-accent-blue transition-colors duration-300">
                                                        {title}
                                                    </h3>
                                                    <span className="font-secondary text-xs text-accent-blue font-bold uppercase tracking-wider mt-1">{date}</span>
                                                </div>

                                                {project.links && (
                                                    <div className="flex gap-3 shrink-0">
                                                        {project.links.map((link: any, i: number) => (
                                                            <Link 
                                                                key={i} 
                                                                href={link.href} 
                                                                target="_blank" 
                                                                className="bg-secondary/80 border border-white/8 hover:border-accent-blue/40 text-gray-300 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5"
                                                            >
                                                                {link.icon && <FontAwesomeIcon icon={link.icon} className="size-3" />}
                                                                {link.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Role Tags Row */}
                                            {project.tags && (
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.map((tag: string) => (
                                                        <span key={tag} className="bg-accent-teal/10 border border-accent-teal/30 text-accent-teal px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-extrabold font-secondary">
                                                            {tag === 'lead-developer' ? 'Lead Developer' : 'Founder'}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Description */}
                                            <p className="font-secondary text-sm text-gray-400 leading-relaxed mt-1">
                                                {description}
                                            </p>
                                        </div>

                                        {/* Teammates Capsule Row */}
                                        {project.team && (
                                            <div className="flex flex-col gap-2 border-t border-white/5 pt-6 mt-2">
                                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-extrabold font-secondary flex items-center gap-1.5 select-none">
                                                    <FontAwesomeIcon icon={faUsers} className="size-3" />
                                                    Teammates
                                                </span>
                                                <div className="flex flex-wrap gap-x-4 gap-y-2 select-none">
                                                    {project.team.map((group: any) => (
                                                        <div key={group.role} className="flex items-center gap-2 text-xs">
                                                            <span className="text-gray-400 capitalize font-medium">{t_team(group.role, { count: group.members.length })}:</span>
                                                            <div className="flex flex-wrap gap-2">
                                                                    {group.members.map((member: any) => (
                                                                        <Link 
                                                                            key={member.name} 
                                                                            href={member.href} 
                                                                            target="_blank" 
                                                                            className="text-accent-blue font-bold hover:underline"
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
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* PART 2: LIVE GITHUB REPOSITORIES BOARD */}
                <div className="flex flex-col gap-8 w-full border-t border-white/5 pt-16">
                    
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 select-none">
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            <span className="text-[10px] uppercase tracking-widest text-accent-teal font-extrabold font-secondary">Open Source</span>
                            <h2 className="font-primary text-3xl font-extrabold text-white tracking-tight mt-1">{t_repos("title")}</h2>
                            <p className="font-secondary text-sm text-gray-400 mt-2 max-w-xl">{t_repos("description")}</p>
                        </div>
                    </div>

                    {/* Language Filter Panel */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start select-none border-b border-white/5 pb-6">
                        {languages.map(lang => {
                            const isSelected = selectedLanguage === lang;
                            return (
                                <button
                                    key={lang}
                                    onClick={() => setSelectedLanguage(lang)}
                                    className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${isSelected ? 'bg-accent-blue/10 border-accent-blue text-accent-blue shadow-[0_0_12px_rgba(204,255,0,0.15)]' : 'bg-secondary/40 border-white/5 text-gray-400 hover:text-white hover:border-white/20'}`}
                                >
                                    {lang}
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Repositories Grid Layout */}
                    <motion.div 
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4"
                    >
                        <AnimatePresence mode="popLayout">
                            {activeRepos.map(repo => renderCard(repo))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Active Empty State */}
                    {activeRepos.length === 0 && (
                        <div className="w-full text-center py-16 bg-secondary/10 border border-white/5 rounded-3xl select-none">
                            <FontAwesomeIcon icon={faFilter} className="size-8 text-gray-600 mb-4 animate-bounce" />
                            <h3 className="font-primary text-lg font-bold text-white uppercase tracking-wider">No Repositories Found</h3>
                            <p className="font-secondary text-sm text-gray-500 mt-1 max-w-sm mx-auto">Try selecting a different programming language.</p>
                        </div>
                    )}

                    {/* Load Archives Button (When Closed) */}
                    {!showArchives && archivedRepos.length > 0 && (
                        <div className="flex justify-center w-full mt-10 select-none">
                            <button
                                onClick={() => setShowArchives(true)}
                                className="bg-secondary/40 border border-accent-teal/30 text-accent-teal hover:bg-accent-teal hover:text-black shadow-[0_0_15px_rgba(98,226,213,0.05)] hover:shadow-[0_0_25px_rgba(98,226,213,0.25)] transition-all duration-500 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer active:scale-95 flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faArchive} className="size-3.5" />
                                {t_repos("view_archives.show")}
                            </button>
                        </div>
                    )}

                    {/* Archived Repos Panel (When Open) */}
                    <AnimatePresence>
                        {showArchives && archivedRepos.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full flex flex-col gap-8 overflow-hidden mt-6"
                            >
                                {/* Wavy Separator with neon lighting */}
                                <div className="w-full flex flex-col items-center py-10 relative select-none">
                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-teal/15 to-transparent -translate-y-1/2" />
                                    <svg className="w-full h-10 text-accent-teal/30 stroke-current fill-none relative z-10 animate-pulse" viewBox="0 0 1200 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                        <path 
                                            d="M0,20 Q150,5 300,20 T600,20 T900,20 T1200,20" 
                                            strokeWidth="2" 
                                            strokeLinecap="round"
                                        />
                                        <path 
                                            d="M0,20 Q150,5 300,20 T600,20 T900,20 T1200,20" 
                                            strokeWidth="5" 
                                            strokeLinecap="round"
                                            className="opacity-15 blur-[2px]"
                                        />
                                    </svg>
                                    <span className="text-[10px] uppercase tracking-widest text-accent-teal font-extrabold font-secondary mt-3 px-4 py-1.5 rounded-full bg-accent-teal/5 border border-accent-teal/10 shadow-[0_0_12px_rgba(98,226,213,0.03)] relative z-20 -translate-y-6">
                                        {t_repos("view_archives.show")}
                                    </span>
                                </div>

                                {/* Archived Grid */}
                                <motion.div 
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4"
                                >
                                    {archivedRepos.map(repo => renderCard(repo))}
                                </motion.div>

                                {/* Close Archives Button at bottom */}
                                <div className="flex justify-center w-full mt-6 select-none">
                                    <button
                                        onClick={() => setShowArchives(false)}
                                        className="bg-secondary/30 border border-white/5 text-gray-500 hover:text-white hover:border-white/15 transition-all duration-300 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer active:scale-95 flex items-center gap-2"
                                    >
                                        {t_repos("view_archives.hide")}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

            </div>
        </Article>
    );
}
