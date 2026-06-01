import SkillsClient from "./SkillsClient";
import { MetadataProps, getPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({namespace: "skills", params});
}

export default function Skills() {
    return (
        <SkillsClient />
    );
}