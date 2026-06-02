import { ExternalURL } from "@/components/utils/ExternalLink";
import { useTranslations } from "next-intl";

export function useLegal(): ExternalURL[] {
    const t = useTranslations("legal");

    return [
        { name: t("terms"), href: "/terms" },
        { name: t("privacy"), href: "/privacy-policy" }
    ]
}