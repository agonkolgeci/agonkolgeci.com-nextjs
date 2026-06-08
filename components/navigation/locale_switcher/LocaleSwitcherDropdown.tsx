"use client";

import Dropdown, { DropdownItem } from "@/components/utils/ui/Dropdown";
import { Locale } from "@/i18n/locales";
import { setUserLocale } from "@/services/locale";
import { useTransition } from "react";
import { LocaleFlag } from "./LocaleSwitcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function LocaleSwitcherDropdown({ locales, currentLocale } : { locales: DropdownItem[]; currentLocale: Locale }) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (newValue: string) => {
        const locale = newValue as Locale;

        startTransition(() => {
            setUserLocale(locale);
        });
    };

    return (
        <Dropdown  
            button={(
                <div className="flex items-center gap-2 bg-secondary/65 hover:bg-secondary/90 border border-white/8 hover:border-white/15 rounded-full pl-1.5 pr-3 py-1.5 transition-all duration-300 group cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.25)] select-none">
                    <LocaleFlag locale={currentLocale} />
                    <span className="text-[10px] font-extrabold uppercase font-secondary tracking-widest text-gray-300 group-hover:text-white transition-colors duration-200">
                        {currentLocale}
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} className="size-2 text-gray-500 group-hover:text-gray-300 transition-colors duration-300" />
                </div>
            )}
            items={locales}
            defaultValue={currentLocale}
            disabled={isPending}
            onChange={handleChange}
        />
    );
}