"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const TIMELINE_KEYS = [
    { key: "jjr", icon: "🎓", accent: "#6b7280" },
    { key: "stael", icon: "🎓", accent: "#3b82f6" },
    { key: "world_heberg", icon: "💼", accent: "#22c55e" },
    { key: "unige", icon: "🎓", accent: "#D6005A" },
    { key: "swerc", icon: "🏆", accent: "#f59e0b" },
    { key: "redcap", icon: "⚕️", accent: "#a855f7" },
];

export default function TimelineWidget() {
    const t = useTranslations("home.bento.timeline");

    return (
        <motion.div
            className="relative rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-6 overflow-hidden"
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.05) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 mb-6">
                <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-0.5">
                    {t("label")}
                </p>
                <p className="text-sm font-bold text-white">{t("title")}</p>
            </div>

            {/* Horizontal timeline */}
            <div className="relative z-10">
                {/* Connector line */}
                <div className="absolute top-5 left-5 right-5 h-px bg-white/[0.07]" />

                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    {TIMELINE_KEYS.map(({ key, icon, accent }, i) => (
                        <motion.div
                            key={key}
                            className="flex flex-col items-center gap-2.5 flex-shrink-0 w-[110px]"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                        >
                            {/* Node */}
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-base z-10 border relative bg-neutral-900"
                                style={{
                                    borderColor: `${accent}40`,
                                    boxShadow: `0 0 14px ${accent}25`,
                                }}
                            >
                                {icon}
                            </div>

                            {/* Year */}
                            <p className="text-[10px] font-bold text-white/50 font-mono">
                                {t(`items.${key}.date`)}
                            </p>

                            {/* Title */}
                            <p className="text-[11px] font-semibold text-white/70 text-center leading-tight">
                                {t(`items.${key}.title`)}
                            </p>

                            {/* Subtitle */}
                            <p className="text-[10px] text-white/30 text-center leading-tight">
                                {t(`items.${key}.subtitle`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
