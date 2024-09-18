import { ExternalURL } from "@/app/_components/utils/ExternalLink";
import { useTranslations } from "next-intl";

export function useLegal(): ExternalURL[] {
    const t = useTranslations("legal");

    return [
        { name: t("terms"), href: "/terms" }
    ]
}