import PlaylistDisplay from "@/components/PlaylistDisplay";
import "./dashboard.css";

export default function DashboardPage() {
    return (
        <div className="dashboard">
            <div className="menu-tracks">
                Opciones de track
            </div>
            <div className="tracks-display">
                <PlaylistDisplay></PlaylistDisplay>
            </div>
        </div>
    )
}