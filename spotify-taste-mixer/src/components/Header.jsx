import styles from '@/styles/Header.module.css'
import Image from 'next/image'

const nombres = [
    { name: "Favoritos" },
    { name: "Usuario" }
]

export default function Header() {
    return (
        <nav className={styles.navPrincipal}>
            <ul>
                <Image
                    src="/spotify-logo.png"
                    alt="Spotify Taste Mixer"
                    width={140}
                    height={40}
                />
                {nombres.map((nombre) => (
                    <li key={nombre.name}>
                        {nombre.name}
                    </li>
                ))}
            </ul>
        </nav>
    )
}