'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

export default function Header() {
    const router = useRouter();

    // Cerrar sesión y volver al login
    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <nav className="bg-white m-2 rounded-lg">
            <ul className="grid grid-cols-2 items-center px-5 py-2 text-black">
                <li className="flex items-center">
                    <Image
                        src="/spotify-logo.png"
                        alt="Spotify Taste Mixer"
                        width={140}
                        height={40}
                    />
                </li>

                <li className="text-right">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-[#1DB954] text-white rounded-full px-4 py-1 text-sm hover:bg-[#17a248]"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}
