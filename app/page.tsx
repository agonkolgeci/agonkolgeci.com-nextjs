import HomeClient from "./HomeClient";

// Home is the root segment: it inherits the root layout's metadata directly
// (title default "Agon KOLGECI", canonical "/", and the portfolio social card).
export default function Home() {
    return <HomeClient />;
}
