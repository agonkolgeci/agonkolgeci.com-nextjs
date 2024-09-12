export enum Orientation {
    HORIZONTAL = "flex-row",
    HORIZONTAL_REVERSE = "flex-row-reverse",
    VERTICAL = "flex-col",
    VERTICAL_REVERSE = "flex-col-reverse",
}

export enum Align {
    START = "items-start",
    CENTER = "items-center",
    END = "items-end",
    BASELINE = "items-baseline",
    STRETCH = "items-stretch"
}

export enum Justify {
    START = "justify-start",
    CENTER = "justify-center",
    END = "justify-end",
    BETWEEN = "justify-between"
}

export enum Animation {
    NONE = "animation-none",
    DEFAULT = "transition-property-all duration-300",
    CLIMB = "transition-all duration-300 hover:-translate-y-4",
    SCALE = "transition-property-[scale] duration-150 hover:scale-110"
}