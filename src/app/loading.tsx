import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center p-32 bg-white">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-primary text-5xl"/>
        </div>
    )
}