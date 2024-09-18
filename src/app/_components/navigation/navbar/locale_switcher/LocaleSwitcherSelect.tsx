"use client";

import Select, { SelectOption } from "@/app/_components/utils/ui/Select";
import { Locale } from "@/i18n/locales";
import { setUserLocale } from "@/services/locale";
import { useTransition } from "react";

export default function LocaleSwitcherSelect({ locale, items } : { locale: Locale, items: SelectOption[] }) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (event: any) => {
        event.preventDefault();

        startTransition(() => {
            setUserLocale(event.target.value);
        });
    }

    return (
        <Select value={locale} items={items} onChange={handleChange} disabled={isPending} />
    )
}