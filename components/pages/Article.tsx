export default function Article({ title, description, children, pill }: { title?: string, description?: string, children: React.ReactNode, pill?: string }) {
    return (
        <article className="w-full bg-transparent text-white relative overflow-visible selection:bg-accent-blue selection:text-white">
            <div className="mx-auto max-w-7xl px-8 pt-32 sm:pt-36 pb-12 flex flex-col items-center text-center relative z-10 select-none">
                {title && (
                    <h1 className="font-primary text-5xl md:text-6xl font-extrabold tracking-tight mt-6 leading-none">
                        {title}
                    </h1>
                )}
                {description && (
                    <p className="font-secondary text-base md:text-lg text-gray-400 mt-4 max-w-2xl leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {children}
        </article>
    );
}