import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faBook, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function retrieveIconByName(name: string) {
    switch(name.toLowerCase()) {
        case "documentation": return faBook;
        case "github": return faGithub;
        case "discord": return faDiscord;
        case "homepage": return faLink;

        default: return faArrowUpRightFromSquare;
    }
}

export default function Icon({ name } : { name: string }) {
    return (
        <FontAwesomeIcon icon={retrieveIconByName(name)} className="hover:scale-125 transition-all duration-300"/>
    )
}