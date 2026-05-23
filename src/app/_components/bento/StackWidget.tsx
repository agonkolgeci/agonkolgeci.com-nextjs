"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const TECH_STACK = [
    { name: "React", color: "#61dafb" },
    { name: "Next.js", color: "#ffffff" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "Java", color: "#f89820" },
    { name: "Redis", color: "#dc382d" },
    { name: "C++", color: "#00599c" },
    { name: "Docker", color: "#2496ed" },
    { name: "Git", color: "#f05032" },
    { name: "PHP", color: "#8892bf" },
    { name: "Linux", color: "#fcc624" },
    { name: "Tailwind", color: "#38bdf8" },
    { name: "PostgreSQL", color: "#336791" },
];

export default function StackWidget() {
    const t = useTranslations("home.bento.stack");

    return (
        <motion.div
            className="relative h-full rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-6 overflow-hidden"
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 10% 90%, rgba(59,130,246,0.07) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10 mb-4">
                <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-0.5">
                    {t("title")}
                </p>
                <p className="text-sm font-bold text-white">{t("description")}</p>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-2">
                {TECH_STACK.map((tech, i) => (
                    <motion.div
                        key={tech.name}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07] cursor-default"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        whileHover={{
                            backgroundColor: "rgba(255,255,255,0.07)",
                            borderColor: "rgba(255,255,255,0.14)",
                        }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: tech.color, boxShadow: `0 0 6px ${tech.color}60` }}
                        />
                        <span className="text-[11px] font-medium text-white/60 truncate">{tech.name}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
