import { useTranslations } from "next-intl"

export function Tag({ name }: { name: string }) {
    return (
        <p>{name}</p>
    )
}

export default function Tags({ tags }: { tags?: string[] }): React.ReactNode {
    const t = useTranslations("tags");

    return (
        <ul className="flex flex-row flex-wrap gap-4">
            {tags?.map(tag => {
                return (
                    <li key={tag} className="flex flex-col items-center justify-center bg-primary text-white px-4 py-1 rounded-full tag" data-status={tag}>
                        <Tag name={t(tag)} />
                    </li>
                )
            })}
        </ul>
    )
}