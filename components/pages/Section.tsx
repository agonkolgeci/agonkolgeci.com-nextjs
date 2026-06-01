export default function Section({ id, title, description, position, children }: { id?: string, title: string, description?: string, position: number, children: React.ReactNode }) {
    return (
        <section id={id} className={`w-full bg-primary text-white border-b border-white/5 relative overflow-hidden`}>
            <div className={`flex flex-col items-center gap-12 mx-auto px-6 py-24 max-w-7xl`}>
                <div className="flex flex-col gap-2 text-center max-w-3xl">
                    <h2 className="font-bold text-4xl md:text-5xl font-primary tracking-tight text-white">{title}</h2>

                    {description ? <p className="font-normal text-base md:text-lg text-gray-400 font-secondary mt-2">{description}</p> : null} 
                </div>

                {children}
            </div>
        </section>
    )
}