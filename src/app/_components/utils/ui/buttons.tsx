import { Animation } from "./render";

export enum ButtonStyle {
    PRIMARY = "border-primary border-2 bg-white text-primary disabled:bg-gray-500 px-8 py-2 rounded-full hover:bg-primary hover:text-white",
    ACTION = "text-gray-500 hover:text-green-500"
}

export function Button({ description, style = ButtonStyle.PRIMARY, animation = Animation.SCALE, ...props } : { description?: string, style?: ButtonStyle, animation?: Animation } & React.ComponentPropsWithoutRef<"button">) {
    return (
        <button {...props} className={`flex flex-row self-[inherit] items-center gap-4 ${style} ${animation} relative`} />
    )
}