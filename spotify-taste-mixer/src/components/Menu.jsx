'use client'

import "@/styles/Menu.css"
import Link from "next/link";
import { usePathname } from 'next/navigation'

const enlaces = [
    { name: "Artistas", href: "/a" },
    { name: "Géneros", href: "/g" },
    { name: "Décadas", href: "/d" },
    { name: "Mood", href: "/m" },
    { name: "Popularidad", href: "/p" }
]

export default function Menu() {
    const miPath = usePathname()

    return (
        <div className="menu-options">
            <ul>
                {enlaces.map((enlace) => (
                    {/*Ejemplo de clase (cambiar)*/ },
                    <li key={enlace.href} className={miPath == enlace.href ? "activo" : ""}>
                        <Link href={enlace.href}>{enlace.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
