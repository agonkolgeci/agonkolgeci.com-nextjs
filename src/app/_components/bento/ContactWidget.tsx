"use client";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ReactNode } from "react";

interface ContactLinkProps {
    href: string;
    icon: ReactNode;
    label: string;
    accentClass: string;
    external?: boolean;
}

function ContactLink({ href, icon, label, accentClass, external }: ContactLinkProps) {
    return (
        <motion.a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border text-xs font-semibold transition-colors ${accentClass}`}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <span className="w-3.5 h-3.5 flex-shrink-0">{icon}</span>
            {label}
        </motion.a>
    );
}

export default function ContactWidget() {
    const t = useTranslations("home.bento.contact");

    return (
        <motion.div
            className="relative h-full rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-6 overflow-hidden flex flex-col justify-between"
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 0% 0%, rgba(99,102,241,0.1) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10">
                <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-1">
                    {t("label")}
                </p>
                <h2 className="text-xl font-black text-white mb-5">{t("title")}</h2>

                <div className="flex flex-col gap-2">
                    <ContactLink
                        href="mailto:contact@agonkolgeci.com"
                        icon={<FontAwesomeIcon icon={faEnvelope} />}
                        label={t("cta_email")}
                        accentClass="bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/15"
                        external
                    />
                    <ContactLink
                        href="https://linkedin.com/in/agon-kolgeci-193aa2266/"
                        icon={<FontAwesomeIcon icon={faLinkedin} />}
                        label={t("cta_linkedin")}
                        accentClass="bg-sky-500/10 border-sky-500/20 text-sky-400 hover:bg-sky-500/15"
                        external
                    />
                    <ContactLink
                        href="https://github.com/agonkolgeci"
                        icon={<FontAwesomeIcon icon={faGithub} />}
                        label={t("cta_github")}
                        accentClass="bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/15"
                        external
                    />
                </div>
            </div>

            <Link
                href="/contact"
                className="relative z-10 w-full py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs font-semibold text-white/50 hover:bg-white/10 hover:text-white transition-all text-center block"
            >
                {t("cta_form")} →
            </Link>
        </motion.div>
    );
}
