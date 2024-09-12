import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full py-28 gap-16 bg-white text-black">
      <div className="flex flex-col">
        <h1 className="font-bold text-8xl">404</h1>
        <p className="text-lg">Page not found</p>
        <p className="text-xs">The page you are looking for doesn't exist.</p>
      </div>

      <Image src={"/errors/404.webp"} width={256} height={256} alt="Robot 404"/>
    </div>
  )
}
