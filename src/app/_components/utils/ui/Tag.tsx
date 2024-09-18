export function Tag({ name }: { name: string }) {
    return (
        <p>{name}</p>
    )
}

export default function Tags({ tags }: { tags?: string[] }): React.ReactNode {
    return (
        <ul className="flex flex-row flex-wrap gap-4">
            {tags?.map(tag => {
                return (
                    <li key={tag} className="bg-primary text-white px-3 py-1 rounded-full">
                        <Tag name={tag}/>
                    </li>
                )
            })}
        </ul>
    )
}