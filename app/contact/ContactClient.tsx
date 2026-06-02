"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkerAlt, faClock, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Article from "@/components/pages/Article";
import Alert, { AlertType } from "@/components/utils/ui/Alert";
import { Button } from "@/components/utils/ui/Button";
import { sendEmail } from "@/components/utils/api/mailer";
import Turnstile, { useTurnstile } from "react-turnstile";
import { Locale } from "@/i18n/locales";

export type FormData = {
    name: string,
    email: string,
    subject: string,
    message: string
}

export type FormStatus = {
    type: AlertType,
    message: string
}

export default function ContactClient({ target_mail, recaptchaKey } : { target_mail: string, recaptchaKey: string }) {
    const currentLocale = useLocale() as Locale;
    const t = useTranslations("contact.contact_form");
    const t_section = useTranslations("contact");

    const [pending, setPending] = useState(false);
    const [sent, setSent] = useState(false);
    const [status, setStatus] = useState<FormStatus>();
    const [time, setTime] = useState("");

    const turnstile = useTurnstile();

    // 1. Digital Clock ticks every second in Europe/Zurich Timezone
    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            const options = {
                timeZone: "Europe/Zurich",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            } as const;
            setTime(date.toLocaleTimeString("en-US", options));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            subject: event.target.subject.value,
            message: event.target.message.value,
        } as FormData;

        if (!data.name || !data.email || !data.subject || !data.message) {
            setStatus({ type: AlertType.ERROR, message: t("alerts.fields_missing") });
            return;
        }

        if (!turnstile) {
            setStatus({ type: AlertType.ERROR, message: t("alerts.recaptcha_invalid") });
            return;
        }

        setPending(true);
        setStatus({ type: AlertType.LOADING, message: t("alerts.sending") });

        try {
            const result = await sendEmail({
                from: {
                    name: data.name,
                    address: data.email,
                },
                sender: data.email,
                to: target_mail,
                replyTo: data.email,
                subject: `[agonkolgeci.com] ${data.subject}`,
                text: data.message
            });

            setPending(false);
            setSent(result);

            if (result) {
                setStatus({ type: AlertType.SUCCESS, message: t("alerts.sent") });
            } else {
                setStatus({ type: AlertType.ERROR, message: t("alerts.unknown_error") });
            }
        } catch (err) {
            setPending(false);
            setStatus({ type: AlertType.ERROR, message: t("alerts.unknown_error") });
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 90, damping: 15 }
        }
    } as const;

    return (
        <Article title={t("title")} description={t("description")} pill={t_section("title")}>
            <div className="w-full py-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-5 gap-8 mt-4">
                
                {/* LEFT BENTO CELL: THE GLASSMORPHISM FORM (Span 3) */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                    className="lg:col-span-3 bg-secondary/30 rounded-3xl p-8 border border-white/8 glow-card-blue flex flex-col gap-6 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-28 h-28 bg-accent-blue/3 rounded-full blur-3xl pointer-events-none" />
                    
                    <h3 className="font-primary text-xl font-bold text-white tracking-tight uppercase border-b border-white/5 pb-4 select-none">
                        {t_section("send_message")}
                    </h3>

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        
                        {/* Row: Name and Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-xs uppercase tracking-wider text-gray-500 font-extrabold font-secondary">{t("inputs.name.label")}</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    disabled={pending || sent}
                                    placeholder={t("inputs.name.placeholder")}
                                    className="bg-black/40 border border-white/8 focus:border-accent-blue focus:shadow-[0_0_15px_rgba(204,255,0,0.1)] rounded-2xl px-5 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300 w-full font-secondary"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-xs uppercase tracking-wider text-gray-500 font-extrabold font-secondary">{t("inputs.email.label")}</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    disabled={pending || sent}
                                    placeholder={t("inputs.email.placeholder")}
                                    className="bg-black/40 border border-white/8 focus:border-accent-blue focus:shadow-[0_0_15px_rgba(204,255,0,0.1)] rounded-2xl px-5 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300 w-full font-secondary"
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="subject" className="text-xs uppercase tracking-wider text-gray-500 font-extrabold font-secondary">{t("inputs.subject.label")}</label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                required
                                disabled={pending || sent}
                                placeholder={t("inputs.subject.placeholder")}
                                className="bg-black/40 border border-white/8 focus:border-accent-blue focus:shadow-[0_0_15px_rgba(204,255,0,0.1)] rounded-2xl px-5 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300 w-full font-secondary"
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-xs uppercase tracking-wider text-gray-500 font-extrabold font-secondary">{t("textareas.message.label")}</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                disabled={pending || sent}
                                className="bg-black/40 border border-white/8 focus:border-accent-blue focus:shadow-[0_0_15px_rgba(204,255,0,0.1)] rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none transition-all duration-300 w-full resize-none font-secondary"
                            />
                        </div>

                        {/* Recaptcha / Turnstile */}
                        {!sent && (
                            <div className="w-full flex justify-start py-2">
                                <Turnstile 
                                    sitekey={recaptchaKey} 
                                    refreshExpired="auto" 
                                    language={currentLocale} 
                                    theme="dark" 
                                    fixedSize 
                                />
                            </div>
                        )}

                        {/* Alerts Notification */}
                        {status && <Alert type={status.type} message={status.message} />}

                        {/* Submit Button */}
                        {!sent && (
                            <div className="flex justify-start">
                                <button
                                    type="submit"
                                    disabled={pending || sent}
                                    className="bg-black border border-accent-blue/30 text-white hover:bg-accent-blue hover:text-black hover:border-accent-blue hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-40 flex items-center gap-2 cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} className="size-3.5" />
                                    <span>{t("submit")}</span>
                                </button>
                            </div>
                        )}

                    </form>
                </motion.div>

                {/* RIGHT BENTO COLUMN: DYNAMIC PORTFOLIO INFO (Span 2) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    
                    {/* Bento Cell 1: Local Clock Cell */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="bg-secondary/35 border border-white/8 rounded-3xl p-7 flex flex-col gap-4 relative overflow-hidden group select-none"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/3 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                            <FontAwesomeIcon icon={faClock} className="size-4 text-accent-blue" />
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-extrabold font-secondary">{t_section("geneva_time")}</span>
                        </div>
                        
                        <div className="flex flex-col gap-1 py-1">
                            <div className="font-primary text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wider text-accent-blue drop-shadow-[0_0_10px_rgba(204,255,0,0.3)] tabular-nums">
                                {time || "00:00:00"}
                            </div>
                            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold font-secondary">{t_section("ticking_live")}</span>
                        </div>
                    </motion.div>

                    {/* Bento Cell 2: Map & Location radar */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="bg-secondary/35 border border-white/8 rounded-3xl p-7 flex flex-col gap-4 relative overflow-hidden group select-none"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent-teal/3 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="size-4 text-accent-teal" />
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-extrabold font-secondary">{t_section("current_base")}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 py-2">
                            {/* Locator Radar Animation */}
                            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                                <span className="absolute w-full h-full rounded-full bg-accent-teal/20 animate-ping" />
                                <span className="absolute w-4 h-4 rounded-full bg-accent-teal/40 animate-pulse" />
                                <span className="absolute w-2 h-2 rounded-full bg-accent-teal" />
                            </div>
                            
                            <div className="flex flex-col">
                                <h4 className="font-primary text-base font-bold text-white tracking-tight leading-snug">Geneva, Switzerland</h4>
                                <span className="text-[9px] uppercase tracking-widest text-gray-500 font-semibold font-secondary mt-0.5">{t_section("borders")}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bento Cell 3: Quick Connect capsule panel */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="bg-secondary/35 border border-white/8 rounded-3xl p-7 flex flex-col gap-4 relative overflow-hidden group select-none flex-1"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/3 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                            <FontAwesomeIcon icon={faEnvelope} className="size-4 text-accent-blue" />
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-extrabold font-secondary">{t_section("quick_connect")}</span>
                        </div>

                        <div className="flex flex-col gap-3.5 mt-2">
                            {/* Email Pill */}
                            <Link 
                                href="mailto:contact@agonkolgeci.com" 
                                className="bg-secondary/80 border border-white/5 hover:border-accent-blue/45 text-gray-400 hover:text-white px-5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-3 interactive-card cursor-pointer"
                                data-cursor-text="CHAT"
                            >
                                <FontAwesomeIcon icon={faEnvelope} className="size-4 text-accent-blue" />
                                <span>contact@agonkolgeci.com</span>
                            </Link>

                            {/* GitHub Pill */}
                            <Link 
                                href="https://github.com/agonkolgeci" 
                                target="_blank" 
                                className="bg-secondary/80 border border-white/5 hover:border-accent-blue/45 text-gray-400 hover:text-white px-5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-3 interactive-card cursor-pointer"
                                data-cursor-text="CHAT"
                            >
                                <FontAwesomeIcon icon={faGithub} className="size-4 text-white" />
                                <span>github.com/agonkolgeci</span>
                            </Link>

                            {/* LinkedIn Pill */}
                            <Link 
                                href="https://linkedin.com/in/agon-kolgeci-193aa2266/" 
                                target="_blank" 
                                className="bg-secondary/80 border border-white/5 hover:border-accent-blue/45 text-gray-400 hover:text-white px-5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-3 interactive-card cursor-pointer"
                                data-cursor-text="CHAT"
                            >
                                <FontAwesomeIcon icon={faLinkedin} className="size-4 text-blue-400" />
                                <span>linkedin.com/in/agon-kolgeci</span>
                            </Link>
                        </div>
                    </motion.div>

                </div>

            </div>
        </Article>
    );
}
