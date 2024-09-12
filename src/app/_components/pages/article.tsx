export default function Article({ title, description, children} : { title: string, description?: string, children: React.ReactNode }) {
    return (
        <article className="w-full bg-secondary text-white">
            <div className="flex flex-col items-center max-w-screen-lg mx-auto px-8 py-20">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="font-bold text-5xl">{title}</h1>

                    {description ? <p className="font-normal text-lg">{description}</p> : null}
                </div>
            </div>

            {children}
        </article>
    );
}