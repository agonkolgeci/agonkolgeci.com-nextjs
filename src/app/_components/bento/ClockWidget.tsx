"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function ClockWidget() {
    const t = useTranslations("home.bento.clock");
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        const tick = () => {
            setTime(new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Zurich" })));
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const hours = time ? time.getHours() : 12;
    const isDaytime = hours >= 6 && hours < 20;
    const hoursStr = time ? hours.toString().padStart(2, "0") : "--";
    const minutesStr = time ? time.getMinutes().toString().padStart(2, "0") : "--";
    const secondsStr = time ? time.getSeconds().toString().padStart(2, "0") : "--";

    const dateStr = time
        ? time.toLocaleDateString("en-CH", { weekday: "short", month: "short", day: "numeric" })
        : "";

    return (
        <motion.div
            className="relative h-full rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-6 flex flex-col justify-between overflow-hidden"
            whileHover={{ scale: 1.015, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            {/* Sky tint */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: isDaytime
                        ? "radial-gradient(circle at 80% 20%, rgba(251,191,36,0.06) 0%, transparent 60%)"
                        : "radial-gradient(circle at 80% 20%, rgba(99,102,241,0.08) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10">
                <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-4">
                    {t("title")}
                </p>

                {/* Digital clock */}
                <div className="tabular-nums leading-none">
                    <span className="text-[2.6rem] font-black text-white tracking-tight">
                        {hoursStr}:{minutesStr}
                    </span>
                    <span className="text-lg font-light text-white/25 ml-1">:{secondsStr}</span>
                </div>

                <p className="mt-2 text-xs text-white/30 font-medium">{dateStr}</p>
            </div>

            {/* Sky icon */}
            <div className="relative z-10">
                {isDaytime ? <SunIcon /> : <MoonIcon />}
            </div>
        </motion.div>
    );
}

function SunIcon() {
    return (
        <motion.div
            className="w-10 h-10 rounded-full"
            style={{
                background: "radial-gradient(circle, #fbbf24 0%, #f97316 100%)",
                boxShadow: "0 0 30px rgba(251,191,36,0.35)",
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}

function MoonIcon() {
    return (
        <motion.div
            className="w-10 h-10 flex items-center justify-center"
            animate={{ rotate: [0, 4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
            <svg viewBox="0 0 40 40" className="w-9 h-9">
                <defs>
                    <radialGradient id="moonGrad" cx="40%" cy="40%">
                        <stop offset="0%" stopColor="#e0e7ff" />
                        <stop offset="100%" stopColor="#a5b4fc" />
                    </radialGradient>
                </defs>
                <path
                    d="M22 8 C14 8, 8 14, 8 22 C8 30, 14 36, 22 36 C26 36, 30 34, 32 31 C28 31, 24 27, 24 22 C24 17, 27 13, 31 12 C28 9.5, 25 8, 22 8Z"
                    fill="url(#moonGrad)"
                    opacity="0.85"
                />
                <circle cx="33" cy="11" r="1.2" fill="rgba(255,255,255,0.5)" />
                <circle cx="36" cy="18" r="0.8" fill="rgba(255,255,255,0.35)" />
                <circle cx="31" cy="26" r="0.9" fill="rgba(255,255,255,0.4)" />
            </svg>
        </motion.div>
    );
}
