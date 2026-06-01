import { Locale, locales } from "@/i18n/locales";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherDropdown from "./LocaleSwitcherDropdown";
import Image from "next/image";

export function LocaleFlag({ locale } : { locale: Locale }) {
    return (
        <div className="w-5 h-5 rounded-full overflow-hidden border border-white/15 shadow-[0_0_10px_rgba(255,255,255,0.08)] shrink-0 flex items-center justify-center relative bg-neutral-900 select-none">
            <Image 
                className="object-cover w-full h-full scale-105" 
                src={`/locales/${locale}.svg`} 
                loading="eager" 
                width={20} 
                height={20} 
                alt={`${locale.toUpperCase()} Flag`} 
            />
        </div>
    );
}

export default function LocaleSwitcher() {
    const t = useTranslations("locales");
    const currentLocale = useLocale() as Locale;

    const LocaleItem = ({ locale, displayName } : { locale: Locale; displayName: string }) => {
        return (
            <div className="flex flex-row items-center gap-2.5 w-full select-none">
                <LocaleFlag locale={locale} />
                <span className="text-xs font-bold font-secondary tracking-wide transition-colors duration-200">
                    {displayName}
                </span>
            </div>
        );
    };

    return (
        <LocaleSwitcherDropdown 
            currentLocale={currentLocale} 
            locales={locales.map(locale => ({
                content: <LocaleItem displayName={t(locale)} locale={locale} />, 
                value: locale 
            }))} 
        />
    );
}