import { Metadata } from "next";
import Article from "../_components/pages/article";
import Section from "../_components/pages/section";
import ContactForm from "./form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Feel free to reach me for inquiries or simply to connect!"
};

export default function Contact() {
    return (
        <Article title="Contact" description="Feel free to reach me for inquiries or simply to connect!">
            <Section title="Get In Touch" description="Fill in the contact form below to send your message." position={0}>
                <ContactForm recaptchaKey={String(process.env["GOOGLE_RECAPTCHA_PUBLIC_KEY"])} />
            </Section>
        </Article>
    );
}