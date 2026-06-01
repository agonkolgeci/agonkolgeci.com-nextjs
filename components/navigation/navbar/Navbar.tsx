import LocaleSwitcher from "../locale_switcher/LocaleSwitcher";
import NavMenu from "./menu/NavMenu";
import NavLogo from "./logo/NavLogo";

export default function Navbar() {
    return (
        <nav className="flex flex-row items-center justify-between w-full h-full gap-6">
            <div className="flex items-center w-[130px] h-[34px] relative shrink-0">
                <NavLogo />
            </div>

            <div className="flex items-center gap-6 lg:gap-8 ml-auto">
                <div className="flex">
                    <NavMenu />
                </div>
                
                <div className="flex">
                    <LocaleSwitcher />
                </div>
            </div>
        </nav>
    );
}