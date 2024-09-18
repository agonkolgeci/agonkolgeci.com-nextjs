import { Metadata } from "next";
import Article from "../_components/pages/Article";
import Section from "../_components/pages/Section";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Feel free to reach me for inquiries or simply to connect!"
};

export default function Contact() {
    return (
        <Article title={String(metadata.title)} description={String(metadata.description)}>
            <Section title="Get In Touch" description="Fill in the contact form below to send your message." position={0}>
                <ContactForm recaptchaKey={String(process.env["GOOGLE_RECAPTCHA_PUBLIC_KEY"])} />
            </Section>
        </Article>
    );
}