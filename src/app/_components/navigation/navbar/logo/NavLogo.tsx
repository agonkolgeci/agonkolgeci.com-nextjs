import Image from "next/image";
import Link from "next/link";

export default function NavLogo() {
    return (
        <Link href="/">
            <Image className="object-cover object-center" src="/logo.png" fill={true} alt="Logo" />
        </Link>
    )
}