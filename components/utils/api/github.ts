export type Repository = {
    name: string,
    description: string,
    owner: {
        login: string,
    },

    html_url: string,
    homepage?: string,
    language: string,
    topics: string[],

    stargazers_count: number,
    forks_count: number,

    fork: boolean,
    archived: boolean,
    is_template: boolean
}

export async function retrieveRepositories(): Promise<Repository[]> {
    return (await (await fetch("https://api.github.com/users/agonkolgeci/repos")).json());
}