"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

const PROJECTS = [
    {
        key: "nexus",
        accent: "#6366f1",
        glow: "rgba(99,102,241,0.1)",
        border: "rgba(99,102,241,0.2)",
        tags: ["Java", "Minecraft", "Spigot"],
    },
    {
        key: "stranger_hide",
        accent: "#ef4444",
        glow: "rgba(239,68,68,0.1)",
        border: "rgba(239,68,68,0.2)",
        tags: ["Java", "Bukkit", "Custom Maps"],
    },
    {
        key: "project_family",
        accent: "#22c55e",
        glow: "rgba(34,197,94,0.1)",
        border: "rgba(34,197,94,0.2)",
        tags: ["Minecraft", "Modded", "Community"],
    },
];

export default function ProjectsWidget() {
    const t = useTranslations("home.bento.projects");

    return (
        <motion.div
            className="relative h-full rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-6 overflow-hidden flex flex-col"
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-0.5">
                        {t("label")}
                    </p>
                    <p className="text-sm font-bold text-white">{t("title")}</p>
                </div>
                <Link
                    href="/gallery"
                    className="text-[11px] text-white/30 hover:text-white/60 transition-colors font-medium"
                >
                    {t("view_all")} →
                </Link>
            </div>

            <div className="flex flex-col gap-2.5 flex-1">
                {PROJECTS.map((project, i) => (
                    <Link key={project.key} href="/gallery">
                        <motion.div
                            className="relative rounded-2xl border p-3.5 overflow-hidden cursor-pointer flex items-center gap-3"
                            style={{
                                backgroundColor: project.glow,
                                borderColor: project.border,
                            }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            whileHover={{ x: 4 }}
                        >
                            {/* Accent stripe */}
                            <div
                                className="absolute left-0 inset-y-0 w-0.5 rounded-r-full"
                                style={{ backgroundColor: project.accent }}
                            />

                            <div className="flex-1 min-w-0 pl-2">
                                <p className="text-sm font-bold text-white">{t(`${project.key}.title`)}</p>
                                <p className="text-xs text-white/40 truncate mt-0.5">
                                    {t(`${project.key}.description`)}
                                </p>
                            </div>

                            <div className="flex gap-1 flex-shrink-0">
                                {project.tags.slice(0, 2).map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-white/35 font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
}
