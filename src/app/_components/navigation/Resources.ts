import { ExternalURL } from "@/app/_components/utils/ExternalLink";
import { useTranslations } from "next-intl";

export function retrieveResources(): ExternalURL[] {
    const t = useTranslations("resources");

    return [
        { name: t("repositories"), href: "https://github.com/agonkolgeci?tab=repositories" },
        { name: t("resources"), href: "https://resources.agonkolgeci.com/" },
        { name: t("archives"), href: "https://resources.agonkolgeci.com/archives" }
    ]
}