import { Orientation } from "./Render";

export function Slide(props: React.ComponentPropsWithoutRef<"li">) {
    return (
        <li className="relative" {...props}/>
    );
}

export default function Slider({ orientation = Orientation.HORIZONTAL, children }: { orientation?: Orientation, children: React.ReactNode }) {
    const SliderList = () => {
        return (
            <ul className={`flex ${orientation} [&_li]:size-12 [&_li]:mx-12 animate-infinite-scroll`}>
                {children}
            </ul>
        );
    }

    return (
        <div className={`w-full flex flex-row flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]`}>
            <SliderList />
            <SliderList />
        </div>
    ); 
}