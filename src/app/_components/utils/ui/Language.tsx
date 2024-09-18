import Image from "next/image";

function retrieveLanguageByName(name: string): string {
    switch(name.toLowerCase()) {
        // Languages
        case "java": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg";
        case "javascript": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg";
        case "typescript": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg";
        case "python": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg";
        case "c": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg";
        case "c++": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg";
        case "html": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg";
        case "css": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg";
        case "sass": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg";
        case "redis": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original-wordmark.svg";
        
        // Frameworks
        case "mysql": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg";
        case "mongodb": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg";
        case "node": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg";
        case "react": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg";
        case "nextjs": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg";
        case "tailwind css": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg";

        // Tools
        case "git": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg";
        case "github": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg";
        case "gitlab": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg";
        case "linux": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg";
        case "bash": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg";
        case "powershell": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg";

        default: return "";
    }
}


export function Language({ name } : { name: string }): React.ReactNode {
    return (
        <Image src={retrieveLanguageByName(name)} fill={true} alt={name} loading={"eager"} />
    )
}

export default function Languages({ languages } : { languages?: string[] }): React.ReactNode {
    return (
        <ul className="flex flex-row flex-wrap gap-4">
            {languages?.map(language => {
                return (
                    <li key={language} className="size-10 relative">
                        <Language name={language}/>
                    </li>
                )
            })}
        </ul>
    )
}