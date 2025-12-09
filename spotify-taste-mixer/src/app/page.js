'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-linear-to-br from-[#1DB954] to-[#191414]">
      <div className="font-bold text-white text-4xl md:text-6xl drop-shadow-lg text-center">
        🎵 Spotify Taste Mixer
      </div>

      <button
        onClick={handleLogin}
        className="px-10 py-3 rounded-full bg-white text-[#1DB954] text-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform">
        Login
      </button>
    </div>
  );
}
