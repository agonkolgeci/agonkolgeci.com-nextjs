"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/*
  A real CSS 3D MacBook.

  The whole machine is authored at one fixed design size inside a perspective
  scene, then scaled from the outside — so the 3D math (hinge sweep, camera
  tilt, deck foreshortening) never changes with the viewport.

  Coordinate setup: the hinge line is the origin. The lid stands above it and
  swings on `rotateX`, the base lies flat below it at `rotateX(90deg)`, and the
  whole world is tilted back by CAMERA_TILT so we look down on the keyboard the
  way you do when a laptop sits on a desk in front of you.
*/

const W = 460;           // chassis width
const H = 322;           // lid height (a MacBook lid is as tall as the base is deep)
const D = 322;           // base depth
const BASE_T = 15;       // base thickness
const LID_T = 8;         // lid thickness
const OPEN_ANGLE = 9;    // the hinge stops a little past vertical, like the real one
const CLOSED_ANGLE = -90;
const CAMERA_TILT = -13; // negative = camera sits above the keyboard plane

// How far the foreshortened deck reaches below the hinge line. Callers use it to
// keep the lid anchored where they want it and let the deck hang underneath.
export const DECK_OVERHANG = 150;

// Key widths per row, as flex weights. Enough structure to read as a real
// MacBook keyboard once the deck is foreshortened.
const KEY_ROWS: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],                      // function row
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.7],                 // numbers + delete
    [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.2],               // tab
    [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.85],                // caps + return
    [2.3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.3]                      // shifts
];

const KEY_STYLE: React.CSSProperties = {
    background: "linear-gradient(180deg, #26272c 0%, #191a1e 55%, #131417 100%)",
    boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.10), 0 1px 1px rgba(0,0,0,0.6)"
};

function Keyboard() {
    return (
        <div className="absolute inset-0 flex flex-col gap-[3px] p-[5px]">
            {/* Function row sits half height, with Touch ID capping the right end */}
            {KEY_ROWS.map((row, r) => (
                <div key={r} className="flex w-full gap-[3px]" style={{ height: r === 0 ? 11 : 20 }}>
                    {row.map((weight, k) => (
                        <div
                            key={k}
                            className="rounded-[2.5px]"
                            style={{ ...KEY_STYLE, flex: `${weight} 1 0%` }}
                        />
                    ))}
                    {r === 0 && (
                        <div
                            className="rounded-[3px]"
                            style={{
                                ...KEY_STYLE,
                                flex: "1 1 0%",
                                background: "linear-gradient(180deg, #303138 0%, #1d1e22 100%)"
                            }}
                        />
                    )}
                </div>
            ))}

            {/* Bottom row: modifiers, space bar, then the inverted-T arrow cluster */}
            <div className="flex w-full gap-[3px]" style={{ height: 20 }}>
                {[1.35, 1.15, 1.35].map((weight, k) => (
                    <div key={k} className="rounded-[2.5px]" style={{ ...KEY_STYLE, flex: `${weight} 1 0%` }} />
                ))}
                <div className="rounded-[2.5px]" style={{ ...KEY_STYLE, flex: "5.6 1 0%" }} />
                {[1.35, 1.15].map((weight, k) => (
                    <div key={k} className="rounded-[2.5px]" style={{ ...KEY_STYLE, flex: `${weight} 1 0%` }} />
                ))}
                <div className="flex flex-col gap-[2px]" style={{ flex: "1 1 0%" }}>
                    <div className="rounded-[2px] h-[9px] mx-auto w-1/2" style={KEY_STYLE} />
                    <div className="rounded-[2px] h-[9px] mx-auto w-1/2" style={KEY_STYLE} />
                </div>
                {[1, 1].map((weight, k) => (
                    <div key={k} className="rounded-[2.5px]" style={{ ...KEY_STYLE, flex: `${weight} 1 0%` }} />
                ))}
            </div>
        </div>
    );
}

export default function MacBook({ open, scale = 1 }: { open: boolean; scale?: number }) {
    return (
        <div
            className="relative select-none pointer-events-none"
            style={{
                width: W * scale,
                height: (H + DECK_OVERHANG) * scale
            }}
        >
            <div
                style={{
                    width: W,
                    height: H + DECK_OVERHANG,
                    transform: `scale(${scale})`,
                    // Scale towards the top-left corner: the inner box keeps its full
                    // 460px design width, so shrinking it around its own centre would
                    // push the machine to the right of the (already scaled) wrapper.
                    transformOrigin: "top left",
                    perspective: `${2100}px`,
                    perspectiveOrigin: "50% 34%"
                }}
            >
                {/* World: everything below is rigid, tilted once so the camera looks down */}
                <div
                    className="relative w-full"
                    style={{
                        height: H,
                        transformStyle: "preserve-3d",
                        transform: `rotateX(${CAMERA_TILT}deg)`,
                        transformOrigin: `50% ${H}px`
                    }}
                >
                    {/* ---------- Contact shadow, flat on the desk ---------- */}
                    <div
                        className="absolute left-1/2"
                        style={{
                            top: H + BASE_T,
                            width: W * 1.18,
                            height: D * 1.1,
                            marginLeft: -(W * 1.18) / 2,
                            transformOrigin: "50% 0%",
                            transform: "rotateX(90deg) translateZ(-10px)",
                            background: "radial-gradient(50% 50% at 50% 45%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 72%)",
                            filter: "blur(14px)"
                        }}
                    />

                    {/* ---------- Base: top deck ---------- */}
                    <div
                        className="absolute left-0 overflow-hidden"
                        style={{
                            top: H,
                            width: W,
                            height: D,
                            transformOrigin: "50% 0%",
                            transform: "rotateX(90deg)",
                            borderRadius: "2px 2px 22px 22px",
                            background: "linear-gradient(180deg, #33343a 0%, #2a2b31 18%, #242529 60%, #1d1e22 100%)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)"
                        }}
                    >
                        {/* Hinge recess running along the back of the deck */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{
                                top: 0,
                                width: W - 34,
                                height: 13,
                                borderRadius: "0 0 4px 4px",
                                background: "linear-gradient(180deg, #08080a 0%, #121317 100%)",
                                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.06)"
                            }}
                        />

                        {/* Speaker grilles flanking the keyboard */}
                        {[{ left: 12 }, { right: 12 }].map((side, i) => (
                            <div
                                key={i}
                                className="absolute"
                                style={{
                                    ...side,
                                    top: 26,
                                    width: 40,
                                    height: 152,
                                    borderRadius: 5,
                                    backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.85) 32%, rgba(255,255,255,0.02) 34%)",
                                    backgroundSize: "5px 5px",
                                    opacity: 0.85
                                }}
                            />
                        ))}

                        {/* Keyboard well */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{
                                top: 22,
                                width: W - 116,
                                height: 160,
                                borderRadius: 7,
                                background: "linear-gradient(180deg, #0c0c0e 0%, #100f12 100%)",
                                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.07)"
                            }}
                        >
                            <Keyboard />
                        </div>

                        {/* Trackpad */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{
                                top: 196,
                                width: 176,
                                height: 108,
                                borderRadius: 8,
                                background: "linear-gradient(180deg, #2b2c31 0%, #232429 100%)",
                                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 2px 6px rgba(0,0,0,0.45)"
                            }}
                        />

                        {/* Light spilling out of the screen onto the aluminium */}
                        <motion.div
                            className="absolute inset-x-0 top-0 pointer-events-none"
                            animate={{ opacity: open ? 1 : 0 }}
                            transition={{ duration: 0.6, delay: open ? 0.12 : 0 }}
                            style={{
                                height: 210,
                                background: "linear-gradient(180deg, rgba(120,190,255,0.20) 0%, rgba(90,160,255,0.07) 45%, rgba(0,0,0,0) 100%)"
                            }}
                        />
                    </div>

                    {/* ---------- Base: front edge (the thickness you see) ---------- */}
                    <div
                        className="absolute left-0"
                        style={{
                            top: H,
                            width: W,
                            height: BASE_T,
                            transform: `translateZ(${D}px)`,
                            borderRadius: "0 0 9px 9px",
                            background: "linear-gradient(180deg, #3b3c42 0%, #26272c 40%, #141518 100%)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.30), 0 10px 22px rgba(0,0,0,0.75)"
                        }}
                    >
                        {/* Thumb notch */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 top-0"
                            style={{
                                width: 84,
                                height: 6,
                                borderRadius: "0 0 6px 6px",
                                background: "#0b0b0d",
                                boxShadow: "inset 0 -1px 2px rgba(255,255,255,0.08)"
                            }}
                        />
                    </div>

                    {/* ---------- Base: side edges ---------- */}
                    {[
                        { origin: "0% 50%", rotate: -90, left: 0 },
                        { origin: "100% 50%", rotate: 90, left: W - D }
                    ].map((side, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                top: H,
                                left: side.left,
                                width: D,
                                height: BASE_T,
                                transformOrigin: side.origin,
                                transform: `rotateY(${side.rotate}deg)`,
                                background: "linear-gradient(180deg, #35363c 0%, #212227 45%, #121316 100%)",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)"
                            }}
                        />
                    ))}

                    {/* ---------- Lid ---------- */}
                    <motion.div
                        className="absolute left-0 top-0"
                        initial={false}
                        animate={{ rotateX: open ? OPEN_ANGLE : CLOSED_ANGLE }}
                        transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 1.35 }}
                        style={{
                            width: W,
                            height: H,
                            transformStyle: "preserve-3d",
                            transformOrigin: "50% 100%"
                        }}
                    >
                        {/* Lid front — the display side */}
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                                transform: `translateZ(${LID_T / 2}px)`,
                                backfaceVisibility: "hidden",
                                borderRadius: "14px 14px 3px 3px",
                                padding: "7px 7px 10px 7px",
                                background: "linear-gradient(180deg, #35363c 0%, #26272c 45%, #1a1b1f 100%)",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)"
                            }}
                        >
                            <div
                                className="relative w-full h-full overflow-hidden bg-black"
                                style={{ borderRadius: "8px" }}
                            >
                                {/* Panel — already lit, so the wallpaper is there the instant the lid moves */}
                                <Image
                                    src="/home/mac-wallpaper.jpg"
                                    alt=""
                                    fill
                                    sizes="460px"
                                    priority
                                    className="object-cover object-center pointer-events-none"
                                />

                                {/* Glass sheen + bezel falloff */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.05] via-transparent to-white/[0.03]" />
                                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_18px_rgba(0,0,0,0.75)]" />

                                {/* Camera notch */}
                                <div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 bg-black flex items-center justify-center gap-2"
                                    style={{ width: 74, height: 13, borderRadius: "0 0 7px 7px" }}
                                >
                                    <div className="size-[4px] rounded-full bg-[#0d0d10] ring-[0.5px] ring-white/25 flex items-center justify-center">
                                        <div className="size-[1.5px] rounded-full bg-[#1b3a66]" />
                                    </div>
                                    <motion.div
                                        className="size-[3px] rounded-full bg-emerald-400"
                                        animate={{ opacity: open ? 0.9 : 0 }}
                                        transition={{ duration: 0.3, delay: open ? 0.15 : 0 }}
                                        style={{ boxShadow: "0 0 4px #34d399" }}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Lid back — brushed aluminium, what you see while it is shut */}
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                transform: `rotateY(180deg) translateZ(${LID_T / 2}px)`,
                                backfaceVisibility: "hidden",
                                borderRadius: "14px 14px 3px 3px",
                                background: "linear-gradient(150deg, #3d3e44 0%, #2c2d33 38%, #232429 62%, #191a1e 100%)",
                                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)"
                            }}
                        >
                            <div className="relative w-[58px] h-[58px] opacity-[0.35]">
                                <Image
                                    src="/logo.png"
                                    alt=""
                                    fill
                                    sizes="58px"
                                    className="object-contain"
                                    style={{ filter: "grayscale(1) brightness(1.9)" }}
                                />
                            </div>
                        </div>

                        {/* Lid top edge, seen because the camera is above */}
                        <div
                            className="absolute left-0 top-0"
                            style={{
                                width: W,
                                height: LID_T,
                                transformOrigin: "50% 0%",
                                transform: `translateZ(${-LID_T / 2}px) rotateX(90deg)`,
                                borderRadius: "6px 6px 0 0",
                                background: "linear-gradient(180deg, #4a4b52 0%, #2b2c31 60%, #1c1d21 100%)"
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
