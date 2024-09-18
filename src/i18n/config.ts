"use server";

import { headers } from "next/headers";
import { Locale, locales } from "./locales";

export async function getDefaultLocale(): Promise<Locale> {
    const acceptLanguage = headers().get("accept-language");
    const extractedLanguage = acceptLanguage?.split(";")[0].split(",")[0].split("-")[0];

    if(extractedLanguage && locales.includes(extractedLanguage as Locale)) {
        return extractedLanguage as Locale;
    }

    return "en";
};