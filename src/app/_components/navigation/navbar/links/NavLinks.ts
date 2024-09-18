import { ExternalURL } from "@/app/_components/utils/ExternalLink";
import { useTranslations } from "next-intl";

export function retrieveNavLinks(): ExternalURL[] {
    const t = useTranslations("navigation");

    return [
        { name: t("home"), href: "/" },
        { name: t("skills"), href: "/skills" },
        { name: t("education"), href: "/education" },
        { name: t("experiences"), href: "/experiences" },
        { name: t("gallery"), href: "/gallery" },
        { name: t("contact"), href: "/contact" }
    ]
}