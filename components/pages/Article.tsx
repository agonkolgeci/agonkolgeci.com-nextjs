export default function Article({ title, description, children }: { title?: string, description?: string, children: React.ReactNode }) {
    return (
        <article className="w-full bg-secondary text-white">
            <div className="mx-auto max-w-7xl px-8 pt-32 sm:pt-36 pb-16 flex flex-col items-center">
                <div className="flex flex-col gap-2 text-center">
                    {title && <h1 className="font-bold text-4xl sm:text-5xl">{title}</h1>}
                    {description && <p className="font-normal text-lg">{description}</p>}
                </div>
            </div>

            {children}
        </article>
    );
}