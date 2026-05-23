"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function hash(w: number, d: number): number {
    const n = Math.sin(w * 127.1 + d * 311.7 + 43.0) * 43758.5453;
    return n - Math.floor(n);
}

const GRID = Array.from({ length: 52 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
        const v = hash(w, d);
        if (v < 0.48) return 0;
        if (v < 0.68) return 1;
        if (v < 0.82) return 2;
        if (v < 0.92) return 3;
        return 4;
    })
);

const CELL_CLASSES = [
    "bg-white/[0.04]",
    "bg-emerald-900/60",
    "bg-emerald-700/65",
    "bg-emerald-500/75",
    "bg-emerald-400/90",
];

const CELL_SHADOWS = [
    "",
    "",
    "",
    "0 0 4px rgba(52,211,153,0.3)",
    "0 0 6px rgba(52,211,153,0.5)",
];

export default function GitHubWidget() {
    const t = useTranslations("home.bento.github");

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
                        "radial-gradient(circle at 90% 10%, rgba(34,197,94,0.05) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10 flex items-start justify-between mb-4">
                <div>
                    <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-0.5">
                        {t("title")}
                    </p>
                    <p className="text-sm font-bold text-white">{t("description")}</p>
                </div>
                <a
                    href="https://github.com/agonkolgeci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-white/25 hover:text-white/50 transition-colors font-mono"
                >
                    @agonkolgeci
                </a>
            </div>

            {/* Contribution grid */}
            <div className="relative z-10 overflow-x-auto scrollbar-hide">
                <div className="flex gap-[3px] min-w-max">
                    {GRID.map((week, w) => (
                        <div key={w} className="flex flex-col gap-[3px]">
                            {week.map((level, d) => (
                                <motion.div
                                    key={d}
                                    className={`w-[10px] h-[10px] rounded-sm ${CELL_CLASSES[level]}`}
                                    style={
                                        CELL_SHADOWS[level]
                                            ? { boxShadow: CELL_SHADOWS[level] }
                                            : undefined
                                    }
                                    whileHover={{ scale: 1.6 }}
                                    transition={{ duration: 0.1 }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
