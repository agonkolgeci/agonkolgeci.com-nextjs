import Navbar from "./navigation/navbar/Navbar";

export default function Header() {
    return (
        <header className="w-full sticky top-0 z-50 border-b border-white/[0.06]"
            style={{ background: "rgba(9,9,11,0.80)", backdropFilter: "blur(20px)" }}>
            <Navbar />
        </header>
    );
}
