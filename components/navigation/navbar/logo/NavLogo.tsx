import Image from "next/image";
import Link from "next/link";

export default function NavLogo() {
    return (
        <Link href="/" className="relative w-full h-full block">
            <Image className="object-contain object-left" src="/logo.png" fill={true} sizes="130px" alt="Logo" priority />
        </Link>
    )
}