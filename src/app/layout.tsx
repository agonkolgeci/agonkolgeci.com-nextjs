import type { Metadata, Viewport } from "next";

import "./globals.css";

import Footer from "./_components/footer";
import Header from "./_components/header";

const DEFAULT_IMAGE = "https://agonkolgeci.com/banner_full.webp";

export const viewport: Viewport = {
  themeColor: "#152238",
}

export const metadata: Metadata = {
  title: {
    default: "Agon KOLGECI — Software Developer",
    template: "Agon KOLGECI — %s"
  },
  description: "Passionate since my youngest age by computers, I devote my time to realize various projects allowing me to enrich my own knowledge.",

  keywords: "Software Developer, Agon KOLGECI, Passionate Developer, Computer Enthusiast, Software Projects, Knowledge Enrichment, Coding Expert, Developer Portfolio, Tech Enthusiast, Programming Projects, Skilled Coder, Computer Science, Development Skills, Innovative Software, Personal Projects, Technology Passion, Young Developer, Self-Learning, IT Professional, Tech Projects",
  authors: [{name: "Agon KOLGECI", url: "https://github.com/agonkolgeci/"}],
  robots: "index, follow",

  openGraph: {
    type: "website",
    images: DEFAULT_IMAGE,
    locale: "en_US"
  },

  twitter: {
    card: "summary_large_image",
    images: DEFAULT_IMAGE
  }
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className="bg-primary text-white">
        <Header/>

        <main className="w-full">
          {children}
        </main>

        <Footer/>
      </body>
    </html>
  );
}