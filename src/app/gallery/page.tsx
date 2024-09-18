import Article from "../_components/pages/Article";
import Section from "../_components/pages/Section";
import { retrieveRepositories } from "../_components/utils/api/github";
import { Repositories } from "./Repositories";
import { Projects } from "./Projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Find out about the different creations I've made or taken part in. These have helped me learn more about certain aspects of development."
};

export default async function Gallery() {
    const repositories: any[] = await retrieveRepositories();

    return (
        <Article title={String(metadata.title)} description={String(metadata.description)}>
            <Section title="Projects" description="List of all the projects I have been involved in." position={0}>
                <Projects />
            </Section>

            <Section title="Repositories" description="List of all my source code available to everyone mainly on GitHub." position={1}>
                <Repositories repositories={repositories} />
            </Section>
        </Article>
    );
}