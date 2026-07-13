import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("errors.404");
  
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pb-20 pt-32 sm:px-10 lg:px-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)] lg:gap-20">
        <div className="flex max-w-2xl flex-col items-start gap-7">
          <div className="flex flex-col gap-3">
            <span className="font-secondary text-[10px] font-extrabold uppercase text-accent-blue">
              {t("eyebrow")}
            </span>
            <h1 className="text-7xl font-black leading-none text-white sm:text-8xl lg:text-[9rem]">
              404
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-accent-blue/40 bg-accent-blue px-6 font-secondary text-sm font-bold text-black transition-all duration-300 hover:border-accent-teal hover:bg-accent-teal"
            >
              {t("home")}
            </Link>
            <Link
              href="/#contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 font-secondary text-sm font-bold text-white transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
            >
              {t("contact")}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center lg:max-w-[480px]">
          <div className="absolute inset-8 rounded-full bg-accent-blue/10 blur-3xl" />
          <div className="absolute inset-14 rounded-full bg-accent-teal/10 blur-3xl" />
          <Image
            src="/errors/404.webp"
            width={512}
            height={512}
            sizes="(min-width: 1024px) 480px, 80vw"
            priority
            alt={t("robot_alt")}
            className="relative h-auto w-full object-contain drop-shadow-[0_24px_80px_rgba(78,168,255,0.18)]"
          />
        </div>
      </div>
    </section>
  );
}
