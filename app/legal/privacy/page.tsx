import { getPageMetadata, MetadataProps } from "@/lib/metadata";
import LegalClient, { AbstractContent } from "../LegalClient";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({ namespace: "privacy", params });
}

export default function Privacy() {
    const contents: AbstractContent[] = [
        { key: "general", texts: ["1"] },
        { key: "data-collection", texts: ["1"] },
        { key: "data-usage", texts: ["1"] },
        { key: "hosting", texts: ["1"] },
        { key: "rights", texts: ["1"] },
        { key: "contact", texts: ["1"] }
    ];

    return <LegalClient namespace="privacy" contents={contents} />;
}
