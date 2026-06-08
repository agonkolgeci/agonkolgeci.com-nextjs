import { ExternalURL } from "@/components/utils/ExternalLink";
import { useTranslations } from "next-intl";

export function useMenu(): ExternalURL[] {
    const t = useTranslations("navigation");

    return [
        { name: t("home"), href: "/#home" },
        { name: t("skills"), href: "/#skills" },
        { name: t("education"), href: "/#education" },
        { name: t("gallery"), href: "/#gallery" },
        { name: t("experiences"), href: "/#experiences" },
        { name: t("contact"), href: "/#contact" }
    ]
}