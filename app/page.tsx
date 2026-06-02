import HomeClient from "./HomeClient";
import { MetadataProps, getPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({ namespace: "home", params });
}

export default function Home() {
    return (
        <HomeClient 
            target_mail={String(process.env["CONTACT_TARGET_MAIL"] || "")} 
            recaptchaKey={String(process.env["CLOUDFLARE_TURNSTILE_SITE_KEY"] || "")} 
        />
    );
}