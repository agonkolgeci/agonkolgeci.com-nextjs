import { ExternalURL } from "../utils/links";
import NavLink from "./navlink";

export const NAVIGATION_LINKS: ExternalURL[] = [
    { name: "Home", href: "/" },
    { name: "Skills", href: "/skills" },
    { name: "Education", href: "/education" },
    { name: "Experiences", href: "/experiences" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" }
]

export default function NavLinks(props: React.ComponentPropsWithoutRef<"ul">) {
    return (
        <ul {...props}>
            {NAVIGATION_LINKS.map(link => {
                return (
                    <li key={link.name}>
                        <NavLink href={link.href}>{link.name}</NavLink>
                    </li>
                )
            })}
        </ul>
    );
}