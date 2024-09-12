import type { Metadata } from "next";

import "./globals.css";

import Footer from "./_components/footer";
import Header from "./_components/header";

export const metadata: Metadata = {
  title: "Agon KOLGECI — Software Developer",
  description: "Passionate since my youngest age by computers, I devote my time to realize various projects allowing me to enrich my own knowledge.",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" className="scroll-smooth">
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