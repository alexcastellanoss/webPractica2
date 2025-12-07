'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';
import './page.css';

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
    <div className='inicio'>
      <div className='inicio-text'>
        🎵 Spotify Taste Mixer
      </div>
      <div className='inicio-login'>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
