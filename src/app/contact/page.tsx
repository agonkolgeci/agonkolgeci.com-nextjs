import { useTranslations } from "next-intl";
import Article from "../_components/pages/Article";
import { getPageMetadata, MetadataProps } from "../metadata";
import ContactForm from "./ContactForm";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({namespace: "contact", params});
}

export default function Contact() {
    const t = useTranslations("contact");

    return (
        <Article title={t("title")} description={t("description")}>
            <ContactForm target_mail={String(process.env["CONTACT_TARGET_MAIL"])} recaptchaKey={String(process.env["GOOGLE_RECAPTCHA_PUBLIC_KEY"])} />
        </Article>
    );
}