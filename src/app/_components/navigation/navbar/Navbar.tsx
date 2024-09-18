import Image from "next/image";

import Link from "next/link";
import NavLinks from "./menu/MenuLinks";
import LocaleSwitcher from "./locale_switcher/LocaleSwitcher";

export default function Navbar() {
    return (
        <nav className={`flex flex-row items-center justify-between h-[var(--navbar-height)] max-w-screen-2xl mx-auto px-10`}>
            <figure className="flex items-center w-24 h-full relative">
                <Link href="/">
                    <Image className="object-cover object-center" src="/logo.png" fill={true} alt="Logo" />
                </Link>
            </figure>

            <NavLinks />
            <LocaleSwitcher />
        </nav>
    );
}