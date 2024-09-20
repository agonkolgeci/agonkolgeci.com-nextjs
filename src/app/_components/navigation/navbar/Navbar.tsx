import Image from "next/image";

import Link from "next/link";
import MenuLinks from "./menu/MenuLinks";
import LocaleSwitcher from "./locale_switcher/LocaleSwitcher";

export default function Navbar() {
    return (
        <nav className={`flex flex-row flex-wrap items-center justify-between h-[var(--navbar-height)] max-w-screen-2xl mx-auto px-10 md:order-2`}>
            <figure className="flex items-center w-24 h-full relative">
                <Link href="/">
                    <Image className="object-cover object-center" src="/logo.png" fill={true} alt="Logo" />
                </Link>
            </figure>
            {/* CHANGER AU DESSUS PAR UN COMPONENT TOO */}

            <div className="flex lg:order-2 ml-auto mr-4 lg:mr-0">
                <LocaleSwitcher/>
            </div>
            
            <div className="flex lg:order-1 lg:ml-auto">
                <MenuLinks />
            </div>
        </nav>
    );
}