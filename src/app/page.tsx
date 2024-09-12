import Image from "next/image";
import Section from "./_components/pages/section";
import SocialsLinks from "./_components/navigation/socials";
import { ExternalURL } from "./_components/utils/links";
import { Card, CardContainer, CardImage } from "./_components/utils/ui/cards";
import { Button } from "./_components/utils/ui/buttons";
import Link from "next/link";
import { Align, Justify, Orientation } from "./_components/utils/ui/render";

export const COPYRIGHT_NOTICE = <p>Copyright © 2024 Agon KOLGECI • All Rights Reserved</p>;

export default function Home() {
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
            <div className="bg-image-primary bg-cover bg-center">
                <div className="flex flex-col items-center justify-center gap-2 max-w-screen-lg h-screen mx-auto px-10 text-center">
                    <h1 className="bg-gradient-primary bg-clip-text text-transparent text-6xl leading-normal">Agon KOLGECI</h1>
                    <p className="text-4xl text-shadow">Software Developer</p>
                </div>
            </div>

            <Section title="About Me" description="Discover who I am, my passions, and the journey that has shaped me. Learn about my background, interests, and what drives me to excel in everything I do." position={0}>
                <div className="flex flex-col lg:flex-row items-center gap-16 max-w-screen-xl">
                    <div className="block">
                        <figure className="block bg-gradient-primary w-[300px] h-[300px] relative rounded-2xl mt-4 ml-4">
                            <Image className="object-cover object-center -translate-x-4 -translate-y-4 rounded-2xl" src="/home/portrait.webp" fill={true} alt="Portrait" />
                        </figure>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6 text-lg">
                            <p>Hi, I'm Agon KOLGECI, a young software developer currently studying in Computer Science.</p>
                            <p>Since I was young, I've been able to discover, learn and experiment with various technologies on a self-taught basis, which has enabled me to develop a real passion for IT and acquire a variety of skills in this field.</p>
                            <p>All my experiences motivated me to continue my studies in this field to deepen my knowledge and become an expert capable of creating innovative solutions.</p>
                            <p>Today, I'm determined to continue on this path and improve every day to achieve my goals.</p>
                        </div>

                        <SocialsLinks className="flex flex-row gap-8 text-5xl text-primary" /> 
                    </div>
                </div>
            </Section>

            <Section title="Discover more" description="It's not over, it's just the beginning. Discover what I'm capable of by browsing my site!" position={1}>
                <div className="grid grid-cols-1 justify-center w-full gap-32 max-w-screen-xl">
                    <Discover orientation={Orientation.HORIZONTAL} 
                        image="/home/knowledge.webp"
                        title="Explore my knowledge"
                        description="Delve into the skills and education I have acquired over the years. From technical proficiencies to academic achievements. This section showcases the breadth of my learning journey."
                        buttons={[
                            { name: "Go to Skills", href: "/skills" },
                            { name: "Go to Education", href: "/education" }
                        ]}
                    />

                    <Discover orientation={Orientation.HORIZONTAL} 
                        image="/home/career.webp"
                        title="View my career"
                        description="Take a look at my personal and professional experiences, highlighting the roles I have taken on and the projects I have contributed to. This section provides an in-depth look at my career path."
                        buttons={[
                            { name: "Go to Experiences", href: "/experiences" }
                        ]}
                    />

                    <Discover orientation={Orientation.HORIZONTAL} 
                        image="/home/creations.webp"
                        title="Discover my creations"
                        description="Explore a collection of my personal projects and creative works. From design to development, this gallery showcases my passion for creation and innovation."
                        buttons={[
                            { name: "Go to Gallery", href: "/gallery" }
                        ]}
                    />
                </div>
            </Section>

            {/* <Section title="Testimonials" description="" position={2}>
            </Section> */}
        </div>
    );
}