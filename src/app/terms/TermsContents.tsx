import { AGON_KOLGECI } from "../_components/utils/Collaborators"
import ExternalLink, { CONTACT_URL } from "../_components/utils/ExternalLink"
import Copyright from "../_components/Copyright"
import { useTranslations } from "next-intl"

const Material = (props: React.ComponentPropsWithoutRef<"div">) => {
    return (
        <div className="flex flex-col max-w-screen-lg gap-8">
            <div {...props} className="flex flex-col gap-4" />

            <ExternalLink url={{name: "Back to top", href: "#summary"}} blank={false} />
        </div>
    )
}

export type Content = {
    title: string,
    id: string,
    material: React.ReactNode
}

export default function useContents(): Content[] {
    const t = useTranslations("terms");

    return [
        {
            title: "General Information",
            id: "general",
            material: (
                <Material>
                    <p>This website serves as a portfolio for <ExternalLink url={AGON_KOLGECI} />, showcasing various projects and developments in the field of computer science. By using the site, you acknowledge that the information provided here is for general informational purposes and may change over time.</p>
                </Material>
            )
        },

        {
            title: "Use of Content",
            id: "content",
            material: (
                <Material>
                    <p>Visitors are free to share any of the content found on this website. However, some parts of the site, such as GitHub repositories or other linked materials, are subject to specific licenses that govern their use. It is the responsibility of the user to check the relevant licenses before sharing or using these materials.</p>
                </Material>
            )
        },

        {
            title: "Intellectual Property",
            id: "intellectual-property",
            material: (
                <Material>
                    <p>The content on this website, unless otherwise stated, is the intellectual property of <ExternalLink url={AGON_KOLGECI} />. This includes text, design, and projects, all of which are protected under copyright law.</p>
                    <p>However, certain images and icons used on the site are sourced from third-party providers, including but not limited to:</p>

                    <ul className="list-disc p-[revert]">
                        <li><ExternalLink url={{name: "Google Images", href: "https://images.google.com/"}} /></li>
                        <li><ExternalLink url={{name: "Freepik Images", href: "https://freepik.com/"}} /></li>
                        <li><ExternalLink url={{name: "Devicon Icons", href: "https://devicon.dev/"}} /></li>
                        <li><ExternalLink url={{name: "FontAwesome Icons", href: "https://fontawesome.com/"}} /></li>
                    </ul>

                    <p>These images and icons remain the property of their respective owners and are used under the licenses provided by those sources. Users must respect the intellectual property rights of these third-party providers when using or sharing content from this website.</p>
                </Material>
            )
        },

        {
            title: "Disclaimer and Limitation of Liability",
            id: "disclaimer",
            material: (
                <Material>
                    <p>The information provided on this website is intended to be accurate and up-to-date at the time of publication. However, <ExternalLink url={AGON_KOLGECI} /> makes no guarantees about the accuracy, completeness, or currency of the information and disclaims any liability for any errors or omissions. The content may change or evolve over time, and visitors are encouraged to verify information independently before relying on it.</p>
                    <p>By using this website, you acknowledge that your use of any information or materials is entirely at your own risk, and <ExternalLink url={AGON_KOLGECI} /> is not liable for any damages or losses that may result from your use of the website or its contents.</p>
                </Material>
            )
        },

        {
            title: "Modifications to the Terms",
            id: "modifications",
            material: (
                <Material>
                    <p><ExternalLink url={AGON_KOLGECI} /> reserves the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting. The date of the last update will always be indicated at the top of this page. It is the responsibility of the user to review these Terms regularly to ensure compliance.</p>
                </Material>
            )
        },

        {
            title: "Contact Information",
            id: "contact",
            material: (
                <Material>
                    <p>If you have any questions or concerns regarding these <ExternalLink url={{name: "Terms of Service", href: "https://agonkolgeci.com/terms" }} />, please contact <ExternalLink url={AGON_KOLGECI} /> at <ExternalLink url={CONTACT_URL} />.</p>
                </Material>
            )
        },

        {
            title: "Copyright Notice",
            id: "copyright",
            material: (
                <Material>
                    <p>All content on this website, including text, images, and code, is the intellectual property of <ExternalLink url={AGON_KOLGECI} />, unless otherwise noted. Unauthorized use, reproduction, or distribution of any part of this site without express written permission is prohibited.</p>

                    <Copyright />
                </Material>
            )
        }
    ]
}