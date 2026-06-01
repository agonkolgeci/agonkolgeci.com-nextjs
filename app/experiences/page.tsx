import { MetadataProps, getPageMetadata } from "@/lib/metadata";
import ExperiencesClient from "./ExperiencesClient";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({namespace: "experiences", params});
}

export default function Experiences() {
    return (
        <ExperiencesClient />
    );
}