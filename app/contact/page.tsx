import ContactClient from "./ContactClient";
import { MetadataProps, getPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({namespace: "contact", params});
}

export default function Contact() {
    return (
        <ContactClient 
            target_mail={String(process.env["CONTACT_TARGET_MAIL"])} 
            recaptchaKey={String(process.env["CLOUDFLARE_TURNSTILE_SITE_KEY"])} 
        />
    );
}