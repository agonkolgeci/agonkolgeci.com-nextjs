"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

const NAV_LINKS = [
    { key: "knowledge", href: "/skills", emoji: "⚡", gradient: "from-blue-950/70 to-blue-900/20" },
    { key: "education", href: "/education", emoji: "🎓", gradient: "from-emerald-950/70 to-emerald-900/20" },
    { key: "career", href: "/experiences", emoji: "💼", gradient: "from-amber-950/70 to-amber-900/20" },
    { key: "gallery", href: "/gallery", emoji: "🚀", gradient: "from-purple-950/70 to-purple-900/20" },
];

export default function DiscoverWidget() {
    const t = useTranslations("home.bento.discover");

    return (
        <motion.div
            className="relative h-full rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-6 overflow-hidden"
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <div className="relative z-10 mb-4">
                <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-0.5">
                    {t("label")}
                </p>
                <p className="text-sm font-bold text-white">{t("title")}</p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-2.5">
                {NAV_LINKS.map(({ key, href, emoji, gradient }, i) => (
                    <Link key={key} href={href}>
                        <motion.div
                            className={`rounded-2xl bg-gradient-to-br ${gradient} border border-white/[0.07] p-4 flex flex-col gap-2.5`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.06 }}
                            whileHover={{ scale: 1.04, y: -2 }}
                        >
                            <span className="text-2xl">{emoji}</span>
                            <span className="text-xs font-semibold text-white/65 leading-tight">
                                {t(`links.${key}`)}
                            </span>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
}
