export function retrieveColorByType(repository: any): string {
    if(repository["archived"]) return "bg-orange-500";
    if(repository["is_template"]) return "bg-blue-500";

    return "bg-gray-500";
}

export async function retrieveRepositories(): Promise<any[]> {
    return (await (await fetch("https://api.github.com/users/agonkolgeci/repos")).json());
}