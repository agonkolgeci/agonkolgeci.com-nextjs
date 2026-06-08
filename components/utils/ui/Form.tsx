export function Label({ id, name, required, children } : { id?: string, name: string, required?: boolean, children: React.ReactNode }): React.ReactNode {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className={required ? "after:content-['*'] after:px-1 after:text-red-600" : undefined}>{name}</label>

            {children}
        </div>
    )
}

export function Input({ label, ...props } : { label: string } & React.ComponentPropsWithoutRef<"input">): React.ReactNode {
    return (
        <Label {...props} name={label}>
            <input {...props} className="border-primary border-[1px] px-4 py-2 rounded-md focus:shadow-xl disabled:opacity-50" />
        </Label>
    )
}

export function Textarea({ label, ...props } : { label: string } & React.ComponentPropsWithoutRef<"textarea">): React.ReactNode {
    return (
        <Label {...props} name={label}>
            <textarea {...props} className="border-primary border-[1px] px-4 py-2 rounded-md min-h-[150px] max-h-[500px] focus:shadow-xl disabled:opacity-50 disabled:resize-none" />
        </Label>
    )
}

export default function Form(props: React.ComponentPropsWithoutRef<"form">): React.ReactNode {
    return (
        <form {...props} />
    )
}