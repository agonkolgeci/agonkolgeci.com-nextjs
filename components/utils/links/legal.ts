import { ExternalURL } from "@/components/utils/ExternalLink";
import { useTranslations } from "next-intl";

export function useLegal(): ExternalURL[] {
    const t = useTranslations("legal");

    return [
        { name: t("terms"), href: "/legal/terms" },
        { name: t("privacy"), href: "/legal/privacy" }
    ]
}