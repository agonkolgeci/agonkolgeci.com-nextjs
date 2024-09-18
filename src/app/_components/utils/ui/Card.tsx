import Image from "next/image"
import { Align, Animation, Justify, Orientation } from "./Render"

export function CardImage({ className, border, alt, ...props } : { className: string, border: string, alt: string } & React.ComponentPropsWithoutRef<typeof Image>) {
    return (
        <div className="block">
            <figure className={`${className} relative`}>
                <Image {...props} className={`${border} object-cover object-center`} fill={true} alt={alt} />
            </figure>
        </div>
    )
}

export function CardContainer({ orientation = Orientation.VERTICAL, justify = Justify.START, children } : { orientation?: Orientation, justify?: Justify, children: React.ReactNode }): React.ReactNode {
    return (
        <div className={`flex flex-col ${justify} lg:${orientation} gap-6 p-6 w-full h-full relative`} >
            {children}
        </div>
    )
}

export function Card({ orientation = Orientation.VERTICAL, animation = Animation.NONE, children } : { orientation?: Orientation, animation?: Animation, children: React.ReactNode }): React.ReactNode {
    return (
        <li className={`flex flex-col justify-between lg:${orientation} w-full h-full bg-white shadow-xl rounded-2xl ${animation}`}>
            {children}
        </li>
    )
}

export function Cards({ className, children } : { className: string, children: React.ReactNode }) {
    return (
        <ul className={`grid justify-center w-full gap-20 ${className}`}>
            {children}
        </ul>
    )
}