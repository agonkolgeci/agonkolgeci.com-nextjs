import ClockWidget from "./_components/bento/ClockWidget";
import ContactWidget from "./_components/bento/ContactWidget";
import DiscoverWidget from "./_components/bento/DiscoverWidget";
import GitHubWidget from "./_components/bento/GitHubWidget";
import MusicWidget from "./_components/bento/MusicWidget";
import ProfileCard from "./_components/bento/ProfileCard";
import ProjectsWidget from "./_components/bento/ProjectsWidget";
import StackWidget from "./_components/bento/StackWidget";
import TimelineWidget from "./_components/bento/TimelineWidget";

export default function Home() {
    return (
        <div className="min-h-screen relative">
            {/* Ambient background glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div
                    className="absolute top-1/4 left-[15%] w-[600px] h-[600px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
                    }}
                />
                <div
                    className="absolute bottom-1/3 right-[10%] w-[500px] h-[500px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
                    }}
                />
                <div
                    className="absolute top-[65%] left-[40%] w-[400px] h-[400px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)",
                    }}
                />
            </div>

            {/* Bento Grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[195px] gap-4">

                    {/* Profile — 2×2 */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[380px] lg:min-h-0">
                        <ProfileCard />
                    </div>

                    {/* Clock — 1×1 */}
                    <div className="col-span-1 min-h-[180px] lg:min-h-0">
                        <ClockWidget />
                    </div>

                    {/* Music — 1×1 */}
                    <div className="col-span-1 min-h-[180px] lg:min-h-0">
                        <MusicWidget />
                    </div>

                    {/* Stack Lab — 2×1 */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[180px] lg:min-h-0">
                        <StackWidget />
                    </div>

                    {/* GitHub — 2×1 */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[190px] lg:min-h-0">
                        <GitHubWidget />
                    </div>

                    {/* Projects — 2×1 */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[220px] lg:min-h-0">
                        <ProjectsWidget />
                    </div>

                    {/* Timeline — 4×1 */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 min-h-[200px] lg:min-h-0">
                        <TimelineWidget />
                    </div>

                    {/* Contact — 2×1 */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2 min-h-[220px] lg:min-h-0">
                        <ContactWidget />
                    </div>

                    {/* Discover — 2×1 */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2 min-h-[220px] lg:min-h-0">
                        <DiscoverWidget />
                    </div>

                </div>
            </div>
        </div>
    );
}
