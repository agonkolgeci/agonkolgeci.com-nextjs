import Navbar from './navigation/navbar/Navbar';

export default function Header() {
    return (
        <header className="w-full sticky top-0 z-50 bg-primary">
            <Navbar />
        </header>
    );
}