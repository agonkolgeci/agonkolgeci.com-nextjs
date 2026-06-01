import { Animation } from "./Render";

export enum ButtonStyle {
    PRIMARY = "border border-accent-blue/30 bg-black text-white px-8 py-2.5 rounded-full hover:bg-accent-blue hover:text-black hover:border-accent-blue hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all duration-300 font-semibold tracking-wide disabled:bg-gray-800 disabled:text-gray-500 disabled:border-transparent",
    ACTION = "text-gray-500 hover:text-accent-blue transition-colors duration-300"
}

export function Button({ description, style = ButtonStyle.PRIMARY, animation = Animation.SCALE, ...props } : { description?: string, style?: ButtonStyle, animation?: Animation } & React.ComponentPropsWithoutRef<"button">) {
    return (
        <button {...props} className={`flex flex-row self-[inherit] items-center gap-4 cursor-pointer disabled:cursor-not-allowed ${style} ${animation} relative`} />
    )
}