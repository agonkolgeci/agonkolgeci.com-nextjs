import { getPageMetadata, MetadataProps } from "@/lib/metadata";
import LegalClient, { AbstractContent } from "../LegalClient";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({ namespace: "terms", path: "/terms", params });
}

export default function Terms() {
    const contents: AbstractContent[] = [
        { key: "general", texts: ["1"] },
        { key: "content", texts: ["1"] },
        { key: "intellectual-property", texts: ["1", "2", "3", "4"] },
        { key: "disclaimer", texts: ["1", "2"] },
        { key: "modifications", texts: ["1"] },
        { key: "contact", texts: ["1"] },
        { key: "copyright", texts: ["1"] }
    ];

    return <LegalClient namespace="terms" contents={contents} />;
}
