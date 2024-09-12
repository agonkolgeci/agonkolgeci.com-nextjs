import Image from "next/image";
import Article from "../_components/pages/article";
import Section from "../_components/pages/section";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education",
  description: "Discover my educational background."
};

export default function Education() {
    const School = ({ title, date, description, children }: { title: string, date: string, description: string, children?: React.ReactNode }) => {
        return (
            <li className="flex flex-col ms-8 gap-4 before:absolute before:bg-gradient-primary before:size-4 before:rounded-full before:mt-1.5 before:-start-2">
                <div className="flex flex-col">
                    <h3 className="text-primary">{title}</h3>
                    <time className="text-gray-600">{date}</time>
                </div>
                
                <p>{description}</p>

                {children}
            </li>
        );
    }

    return (
        <Article title="Education" description="Discover my educational background.">
            <Section title="School career" description="After finishing high school, I went straight into a Bachelor's degree in Computer Science. I'm passionate about technology and innovation, and it's a real pleasure to be able to work in this field." position={0}>
                <ul className="flex flex-col gap-16 relative border-s border-primary max-w-screen-md">
                    <School title="University of Geneva: Bachelor of Computer Science" date="2023 - present" description="The Bachelor of Science in Computer Science provides a solid foundation in algorithms, computer systems and security, software engineering, digital imaging, theoretical computer science and multimedia information processing.">
                        <Link href="https://unige.ch/" target="_blank"><Image src="/education/university_of_geneva.svg" width={200} height={300} alt="University of Geneva Logo" /></Link>
                    </School>

                    <School title="High School: Baccalauréat générale et technologique" date="2020 - 2023" description="High School Diploma general and sciences." />

                    <School title="Middle School: Brevet des collèges" date="2016 - 2020" description="General Certifate of secondary education." />
                </ul>
            </Section>
        </Article>
    );
}