export function Topic({ name }: { name: string }) {
    return (
        <p>{name}</p>
    )
}

export default function Topics({ tags: topics }: { tags?: string[] }): React.ReactNode {
    return (
        <ul className="flex flex-row flex-wrap gap-2">
            {topics?.map(topic => {
                return (
                    <li key={topic} className="flex flex-col items-center justify-center bg-[#111d2e] text-white text-md px-3 py-0.5 rounded-full topic" data-status={topic}>
                        <Topic name={topic} />
                    </li>
                )
            })}
        </ul>
    )
}