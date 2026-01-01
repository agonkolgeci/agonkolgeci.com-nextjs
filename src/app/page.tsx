import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import SocialsLinks from "./_components/navigation/socials/SocialsLinks";
import Section from "./_components/pages/Section";
import { ExternalURL } from "./_components/utils/ExternalLink";
import { Button } from "./_components/utils/ui/Button";
import { Card, CardContainer, CardImage } from "./_components/utils/ui/Card";
import { Justify, Orientation } from "./_components/utils/ui/Render";

export default function Home() {
    const t = useTranslations("home");

    const Discover = ({ image, title, description, buttons, orientation } : { image: string, title: string, description: string, buttons?: ExternalURL[], orientation: Orientation }) => {
        return (
            <Card orientation={orientation}>
                <CardImage src={image} alt={title} className="w-full h-[200px] lg:w-[500px] lg:h-[300px]" border="rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none" />

                <CardContainer justify={Justify.BETWEEN}>
                    <div className="flex flex-col gap-4">
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        {buttons?.map(button => {
                            return (
                                <Link key={button.name} href={button.href}>
                                    <Button>{button.name}</Button>
                                </Link>
                            )
                        })}
                    </div>
                </CardContainer>
            </Card>
        )
    }

    return (
        <div className="w-full bg-secondary">
            <div className="bg-[url('/background.webp')] bg-cover bg-center">
                <div className="flex flex-col items-center justify-center gap-2 max-w-5xl h-screen mx-auto px-10 text-center">
                    <h1 className="bg-gradient-primary bg-clip-text text-transparent text-6xl leading-normal">{t("title")}</h1>
                    <p className="text-4xl text-shadow">{t("description")}</p>
                </div>
            </div>

            <Section title={t("about.title")} description={t("about.description")} position={0}>
                <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl">
                    <div className="flex">
                        <figure className="block bg-gradient-primary w-[300px] h-[300px] relative rounded-2xl mt-4 ml-4">
                            <Image className="object-cover object-center -translate-x-4 -translate-y-4 rounded-2xl" src="/home/portrait.webp" fill={true} alt="Portrait" />
                        </figure>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6 text-lg">
                            {t("about.presentation").split(/(?<=\.|\?|\!)\s+/).map(text => <p key={text}>{text}</p>)}
                        </div>

                        <SocialsLinks className="flex flex-row gap-8 text-5xl text-primary" />
                    </div>
                </div>
            </Section>

            <Section title={t("discover.title")} description={t("discover.description")} position={1}>
                <div className="grid grid-cols-1 justify-center w-full gap-32 max-w-7xl">
                    <Discover orientation={Orientation.HORIZONTAL} 
                        image="/home/knowledge.webp"
                        title={t("discover.knowledge.title")}
                        description={t("discover.knowledge.description")}
                        buttons={[
                            { name: t("discover.knowledge.go_to_skills"), href: "/skills" },
                            { name: t("discover.knowledge.go_to_education"), href: "/education" }
                        ]}
                    />

                    <Discover orientation={Orientation.HORIZONTAL} 
                        image="/home/career.webp"
                        title={t("discover.career.title")}
                        description={t("discover.career.description")}
                        buttons={[
                            { name: t("discover.career.go_to_experiences"), href: "/experiences" }
                        ]}
                    />

                    <Discover orientation={Orientation.HORIZONTAL} 
                        image="/home/creations.webp"
                        title={t("discover.creations.title")}
                        description={t("discover.creations.description")}
                        buttons={[
                            { name: t("discover.creations.go_to_gallery"), href: "/gallery" }
                        ]}
                    />
                </div>
            </Section>

            {/* <Section title="Testimonials" description="" position={2}>
            </Section> */}
        </div>
    );
}