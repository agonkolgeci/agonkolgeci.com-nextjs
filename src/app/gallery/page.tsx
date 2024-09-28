import { useTranslations } from "next-intl";
import Article from "../_components/pages/Article";
import { getPageMetadata, MetadataProps } from "../metadata";
import Projects from "./Projects";
import Repositories from "./Repositories";

export async function generateMetadata({ params }: MetadataProps) {
    return await getPageMetadata({namespace: "gallery", params});
}

export default function Gallery() {
    const t = useTranslations("gallery");

    return (
        <Article title={t("title")} description={t("description")}>
            <Projects/>
            <Repositories/>
        </Article>
    );
}