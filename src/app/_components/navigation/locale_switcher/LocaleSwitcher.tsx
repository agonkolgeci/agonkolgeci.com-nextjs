import { Locale, locales } from "@/i18n/locales";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherDropdown from "./LocaleSwitcherDropdown";
import Image from "next/image";

export function LocaleFlag({ locale } : { locale: Locale }) {
    return (
        <Image className="rounded-full" src={`/locales/${locale}.svg`} loading="eager" width={24} height={24} alt={`${locale.toUpperCase()} Flag`} />
    )
}

export default function LocaleSwitcher() {
    const t = useTranslations("locales");
    const currentLocale = useLocale() as Locale;

    const Locale = ({ locale, displayName } : { locale: Locale, displayName: string }) => {
        return (
            <div className="flex flex-row gap-2">
                <figure className="size-6 relative">
                    <LocaleFlag locale={locale} />
                </figure>

                <p>{displayName}</p>
            </div>
        )
    }

    return (
        <LocaleSwitcherDropdown currentLocale={currentLocale} locales={locales.map(locale => ({content: (<Locale displayName={t(locale)} locale={locale} />), value: locale }))} />
    )
}