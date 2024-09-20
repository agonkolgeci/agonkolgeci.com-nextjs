import { Locale, locales } from "@/i18n/locales";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { useLocale, useTranslations } from "next-intl";

export default function LocaleSwitcher() {
    const t = useTranslations("locales");
    const locale = useLocale() as Locale;

    return (
        <LocaleSwitcherSelect/>
        // <LocaleSwitcherSelect locale={locale} items={locales.map(locale => ({value: locale, label: t(locale) }))} />
    )
}