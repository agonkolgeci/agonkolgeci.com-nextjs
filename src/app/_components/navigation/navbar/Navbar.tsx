import LocaleSwitcher from "../locale_switcher/LocaleSwitcher";
import NavMenu from "./menu/NavMenu";
import NavLogo from "./logo/NavLogo";

export default function Navbar() {
    return (
        <nav className={`flex flex-row flex-wrap items-center justify-between h-(--navbar-height) max-w-screen-2xl mx-auto px-10 md:order-2`}>
            <div className="flex items-center w-24 h-full relative">
                <NavLogo />
            </div>

            <div className="flex lg:order-2 ml-auto mr-4 lg:mr-0">
                <LocaleSwitcher/>
            </div>
            
            <div className="flex lg:order-1 lg:ml-auto">
                <NavMenu />
            </div>
        </nav>
    );
}