import Header from "@/components/Header";
import "./dashboard.css";

export default function DashboardLayout({ children }) {
    return (
        <div className="dashboard-layout">
            <Header></Header>
            {/*Poner aquí el menú*/}
            <div className="dashboard-main">
                {children}
            </div>
        </div>
    );
}
