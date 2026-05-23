"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import SocialsLinks from "../navigation/socials/SocialsLinks";

export default function ProfileCard() {
    const t = useTranslations("home.bento.profile");
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="h-full"
            style={{ perspective: "1200px" }}
        >
            <motion.div
                className="relative h-full rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl overflow-hidden p-7 flex flex-col justify-between"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
                {/* Ambient glow */}
                <div
                    className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
                />

                <div style={{ transform: "translateZ(25px)" }}>
                    {/* Live status */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                        <span className="relative flex size-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full size-1.5 bg-emerald-400" />
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-400">{t("status")}</span>
                    </div>

                    {/* Portrait */}
                    <div className="relative w-[72px] h-[72px] rounded-2xl overflow-hidden mb-5 ring-2 ring-white/10">
                        <Image
                            src="/home/portrait.webp"
                            fill
                            alt="Agon KOLGECI"
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Identity */}
                    <h1 className="text-2xl font-black text-white leading-tight mb-1.5">Agon KOLGECI</h1>
                    <p className="text-xs font-semibold text-white/40 mb-1 tracking-wide uppercase">{t("role")}</p>
                    <p className="text-sm text-white/25 leading-relaxed">{t("tagline")}</p>
                </div>

                <div style={{ transform: "translateZ(20px)" }}>
                    <SocialsLinks className="flex flex-row gap-5 text-lg text-white/40 mb-5" />

                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs font-semibold text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
                    >
                        {t("cta")}
                        <span className="opacity-50">→</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
