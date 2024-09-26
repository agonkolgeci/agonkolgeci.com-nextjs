import { Locale, locales } from "@/i18n/locales";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherDropdown from "./LocaleSwitcherDropdown";
import Image from "next/image";

export default function LocaleSwitcher() {
    const t = useTranslations("locales");
    const locale = useLocale() as Locale;

    const Locale = ({ value, displayName } : { value: Locale, displayName: string }) => {
        return (
            <div className="flex flex-row gap-2">
                <figure className="size-6 relative">
                    <Image className="rounded-full" src={`/locales/${value}.svg`} loading="eager" fill={true} alt="EN" />
                </figure>

                <p>{displayName}</p>
            </div>
        )
    }

    return (
        <LocaleSwitcherDropdown currentLocale={locale} locales={locales.map(locale => ({content: (<Locale displayName={t(locale)} value={locale} />), value: locale }))} />
    )
}