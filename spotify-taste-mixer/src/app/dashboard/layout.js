import Header from "@/components/Header";

export default function DashboardLayout({ children }) {
    return (
        <div>
            <Header></Header>
            {children}
        </div>
    );
}
