export default function Section({ id, title, description, position, children }: { id?: string, title: string, description?: string, position: number, children: React.ReactNode }) {
    return (
        <section id={id} className={`w-full ${position % 2 == 0 ? "bg-white text-black" : "bg-slate-100 text-black"}`}>
            <div className={`flex flex-col items-center gap-16 mx-auto px-8 py-20`}>
                <div className="flex flex-col gap-2 text-center max-w-screen-md">
                    <h1 className="font-bold text-4xl">{title}</h1>

                    {description ? <p className="font-normal text-lg">{description}</p> : null} 
                </div>

                {children}
            </div>
        </section>
    )
}