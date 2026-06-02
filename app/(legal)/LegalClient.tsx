"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ExternalLink, { CONTACT_URL } from "@/components/utils/ExternalLink";
import { AGON_KOLGECI } from "@/components/utils/Team";

export type AbstractContent = {
    key: string;
    texts: string[];
};

interface LegalClientProps {
    namespace: "terms" | "privacy";
    contents: AbstractContent[];
}

export default function LegalClient({ namespace, contents }: LegalClientProps) {
    const t = useTranslations(namespace);
    const [activeSection, setActiveSection] = useState<string>(contents[0]?.key || "");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -55% 0px", // Focus tracking range for active section highlighting
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        contents.forEach((content) => {
            const el = document.getElementById(content.key);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [contents]);

    return (
        <article className="relative min-h-screen w-full bg-primary text-white py-24 xl:py-32 selection:bg-accent-blue selection:text-white">
            {/* Soft Futuristic Atmospheric Glows (clipped here so the article itself stays scroll-friendly for sticky) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-[-100px] w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-1/4 right-[-100px] w-[500px] h-[500px] bg-accent-teal/5 rounded-full blur-[140px]" />
            </div>

            <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
                {/* Visual Header Row */}
                <div className="flex flex-col gap-4 max-w-3xl mb-16 md:mb-24">
                    <span className="text-[10px] uppercase tracking-widest text-accent-blue font-extrabold font-secondary">
                        {t("description")}
                    </span>
                    <h1 className="font-primary text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
                        {t("title")}
                    </h1>
                </div>

                {/* Dashboard Split Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
                    
                    {/* LEFT PANEL: Sticky Docs Directory Selector */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-[120px] flex flex-col gap-6 z-20">
                        {/* Desktop Table of Contents */}
                        <div className="hidden lg:flex flex-col gap-3 border-l border-white/5 pl-6 relative">
                            <h3 className="text-xs uppercase tracking-widest font-extrabold text-gray-500 font-secondary mb-4">
                                {t("summary.title")}
                            </h3>
                            {contents.map((content, idx) => {
                                const isActive = activeSection === content.key;
                                return (
                                    <button
                                        key={content.key}
                                        onClick={() => {
                                            const el = document.getElementById(content.key);
                                            if (el) {
                                                el.scrollIntoView({ behavior: "smooth", block: "start" });
                                            }
                                        }}
                                        className="group flex items-center gap-4 text-left transition-all duration-300 py-1.5 focus:outline-none cursor-pointer"
                                    >
                                        <span className={`text-[10px] font-bold tracking-widest font-secondary w-6 text-right transition-colors duration-300 ${isActive ? "text-accent-blue" : "text-gray-600 group-hover:text-gray-400"}`}>
                                            {(idx + 1).toString().padStart(2, "0")}
                                        </span>
                                        <span className={`text-sm font-semibold tracking-wide font-primary transition-colors duration-300 ${isActive ? "text-accent-blue" : "text-gray-400 group-hover:text-gray-200"}`}>
                                            {t(`contents.${content.key}.title`)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Mobile Swipeable Table of Contents Bar */}
                        <div className="lg:hidden sticky top-[var(--navbar-height)] left-0 w-full z-30 bg-[#030303]/90 backdrop-blur-md border border-white/5 rounded-2xl p-4 -mx-2 flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-500 font-secondary pl-2">
                                {t("summary.title")}
                            </span>
                            <div className="flex flex-row flex-wrap gap-2 py-1 px-1 w-full">
                                {contents.map((content, idx) => {
                                    const isActive = activeSection === content.key;
                                    return (
                                        <button
                                            key={content.key}
                                            onClick={() => {
                                                const el = document.getElementById(content.key);
                                                if (el) {
                                                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                                                }
                                            }}
                                            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold font-secondary border transition-all duration-300 cursor-pointer ${isActive ? "bg-accent-blue text-white border-accent-blue shadow-[0_0_12px_rgba(139,92,246,0.3)]" : "bg-secondary/40 text-gray-400 border-white/5 hover:text-white"}`}
                                        >
                                            {idx + 1}. {t(`contents.${content.key}.title`)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT PANEL: Dynamic Scrollable Panels */}
                    <div className="lg:col-span-8 flex flex-col gap-10 md:gap-14">
                        {contents.map((content, idx) => {
                            const content_path = `contents.${content.key}`;
                            const isCurrent = activeSection === content.key;
                            return (
                                <section
                                    key={content.key}
                                    id={content.key}
                                    className={`relative p-8 md:p-12 bg-[#080808]/40 border rounded-3xl backdrop-blur-lg transition-all duration-700 glow-card-blue scroll-mt-[130px] ${isCurrent ? "border-accent-blue/25 shadow-[0_0_50px_rgba(139,92,246,0.03)]" : "border-white/5 opacity-80"}`}
                                >
                                    <div className="flex items-start justify-between gap-6 mb-8 border-b border-white/5 pb-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-bold font-secondary text-accent-blue uppercase tracking-widest">
                                                Section {(idx + 1).toString().padStart(2, "0")}
                                            </span>
                                            <h2 className="font-primary text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                                                {t(`${content_path}.title`)}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6 text-gray-400 font-secondary text-sm md:text-base leading-relaxed">
                                        {content.texts.map((textKey) => (
                                            <div key={textKey} className="transition-all duration-300">
                                                {t.rich(`${content_path}.texts.${textKey}`, {
                                                    author: () => <ExternalLink url={AGON_KOLGECI} />,
                                                    terms: () => <ExternalLink url={{ name: t("title"), href: "/terms" }} />,
                                                    contact: () => <ExternalLink url={CONTACT_URL} />,
                                                    references: () => (
                                                        <ul className="list-disc pl-5 mt-4 flex flex-col gap-2.5 text-accent-blue font-medium">
                                                            <li><ExternalLink url={{ name: "Google Images", href: "https://images.google.com/" }} /></li>
                                                            <li><ExternalLink url={{ name: "Freepik Images", href: "https://freepik.com/" }} /></li>
                                                            <li><ExternalLink url={{ name: "Devicon Icons", href: "https://devicon.dev/" }} /></li>
                                                            <li><ExternalLink url={{ name: "FontAwesome Icons", href: "https://fontawesome.com/" }} /></li>
                                                        </ul>
                                                    )
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>

                </div>
            </div>
        </article>
    );
}
