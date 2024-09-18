export type SelectOption = {
    value: string
    label: string
}

export default function Select({ items, ...props }: { items: SelectOption[], } & React.ComponentPropsWithoutRef<"select">) {
    return (
        <select className="bg-transparent text-white border-0 outline-0 font-[inherit] pr-1 hover:underline hover:cursor-pointer" name="locale" id="locale-switcher" {...props}>
            {items.map(item => {
                return (
                    <option key={item.label} className="text-black bg-transparent p-0" value={item.value}>{item.label}</option>
                )
            })}
        </select>
    )
}