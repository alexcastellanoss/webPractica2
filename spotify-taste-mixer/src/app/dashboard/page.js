import PlaylistDisplay from "@/components/PlaylistDisplay";
import "./dashboard.css";
import Menu from '@/components/Menu'

export default function DashboardPage() {
    return (
        <div className="dashboard">
            <div className="menu-tracks">
                <Menu />
            </div>
            <div className="tracks-display">
                <PlaylistDisplay />
            </div>
        </div>
    )
}