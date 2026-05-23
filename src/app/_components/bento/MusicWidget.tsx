"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

const WAVE_COUNT = 18;
const WAVE_HEIGHTS = [30, 55, 75, 60, 40, 85, 50, 70, 35, 65, 80, 45, 90, 55, 40, 70, 60, 35];

export default function MusicWidget() {
    const t = useTranslations("home.bento.music");
    const [isPlaying, setIsPlaying] = useState(true);

    return (
        <motion.div
            className="relative h-full rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-6 overflow-hidden flex flex-col justify-between"
            whileHover={{ scale: 1.015, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 80% 80%, rgba(139,92,246,0.08) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10">
                <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-4">
                    {t("now_playing")}
                </p>

                {/* Vinyl + info */}
                <div className="flex items-center gap-4">
                    <motion.div
                        className="relative w-14 h-14 rounded-full flex-shrink-0"
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        }}
                        style={{ animationPlayState: isPlaying ? "running" : "paused" }}
                    >
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 border border-white/10 flex items-center justify-center">
                            <div className="absolute inset-[6px] rounded-full border border-white/[0.06]" />
                            <div className="absolute inset-[10px] rounded-full border border-white/[0.04]" />
                            <div className="absolute inset-[14px] rounded-full border border-white/[0.04]" />
                            <div className="w-4 h-4 rounded-full bg-purple-500/50 border border-purple-400/30 z-10" />
                        </div>
                    </motion.div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{t("track")}</p>
                        <p className="text-xs text-white/35 truncate">{t("artist")}</p>
                    </div>
                </div>
            </div>

            {/* Waveform */}
            <div className="relative z-10 flex items-end gap-[3px] h-8">
                {WAVE_HEIGHTS.slice(0, WAVE_COUNT).map((baseH, i) => (
                    <motion.div
                        key={i}
                        className="flex-1 rounded-full bg-purple-400/55"
                        animate={
                            isPlaying
                                ? {
                                      scaleY: [baseH / 100, Math.min((baseH + 30) / 100, 1), baseH / 100],
                                  }
                                : { scaleY: 0.15 }
                        }
                        style={{ originY: 1 }}
                        transition={{
                            duration: 1.1 + (i % 4) * 0.15,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.06,
                        }}
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="relative z-10 flex items-center gap-3">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/15 hover:text-white transition-all"
                    aria-label={isPlaying ? t("pause") : t("play")}
                >
                    {isPlaying ? (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <polygon points="5,3 19,12 5,21" />
                        </svg>
                    )}
                </button>
                <div className="flex-1 h-px bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-purple-400/60 rounded-full"
                        animate={isPlaying ? { width: ["30%", "75%"] } : {}}
                        transition={{ duration: 120, ease: "linear" }}
                        style={{ width: "30%" }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
