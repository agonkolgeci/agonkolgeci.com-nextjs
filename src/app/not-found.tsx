import { useTranslations } from "next-intl";
import Image from "next/image"
import { Button, ButtonStyle } from "./_components/utils/ui/Button";

export default function NotFound() {
  const t = useTranslations("errors.404");
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full py-28 gap-16 bg-white text-black">
      <div className="flex flex-col max-w-screen-sm">
          <h1 className="font-bold text-8xl">404</h1>

          <p className="text-xl">{t("title")}</p>
          <p className="text-base animate-pulse">{t("description")}</p>
      </div>

      <Image src={"/errors/404.webp"} width={256} height={256} alt="Robot 404"/>
    </div>
  )
}
