"use client";

import Dropdown, { DropdownItem } from "@/app/_components/utils/ui/Dropdown";
import { Locale } from "@/i18n/locales";
import { setUserLocale } from "@/services/locale";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTransition } from "react";

export default function LocaleSwitcherDropdown({ locales, currentLocale } : { locales: DropdownItem[], currentLocale: Locale }) {
    const [isPending, startTransition] = useTransition()

    const handleChange = (newValue: string) => {
        const locale = newValue as Locale;

        startTransition(() => {
            setUserLocale(locale);
        });
    }

    return (
        <Dropdown  
            button={{icon: faGlobe}}
            items={locales}
            defaultValue={currentLocale}
            disabled={isPending}
            onChange={handleChange}>
        </Dropdown>
    )
}