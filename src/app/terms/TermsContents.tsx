export type AbstractContent = {
    key: string,
    texts: string[]
}

export function useContents(): AbstractContent[] {
    return [
        { key: "general", texts: ["1"] },
        { key: "content", texts: ["1"] },
        { key: "intellectual-property", texts: ["1", "2", "3", "4"] },
        { key: "disclaimer", texts: ["1", "2"] },
        { key: "modifications", texts: ["1"] },
        { key: "contact", texts: ["1"] },
        { key: "copyright", texts: ["1", "2"] }
    ]
}