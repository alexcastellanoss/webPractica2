'use client';

import { useState, useEffect } from 'react';

import Header from '@/components/Header';
import Menu from '@/components/Menu';

import ArtistWidget from '@/components/widgets/ArtistWidget';
import TrackWidget from '@/components/widgets/TrackWidget';
import GenreWidget from '@/components/widgets/GenreWidget';
import DecadeWidget from '@/components/widgets/DecadeWidget';
import MoodWidget from '@/components/widgets/MoodWidget';
import PopularityWidget from '@/components/widgets/PopularityWidget';

import PlaylistDisplay from '@/components/PlaylistDisplay';
import { generatePlaylist } from '@/lib/spotify';

// Página principal
export default function DashboardPage() {

    // Widget seleccionado
    const [activeWidget, setActiveWidget] = useState('artists');
    // Requisitos para la playlist
    const [preferences, setPreferences] = useState({
        artists: [],
        tracks: [],
        genres: [],
        decades: [],
        mood: {
            label: '',
            energy: 50,
            valence: 50,
            danceability: 50,
            acousticness: 50,
        },
        popularity: { min: 0, max: 100 },
    });
    // Playlist a mostrar
    const [playlist, setPlaylist] = useState([]);
    // Estado de carga  y errores (únicamente para el css)
    const [playlistLoading, setPlaylistLoading] = useState(false);
    const [playlistError, setPlaylistError] = useState('');
    // Canciones favoritas
    const [favoriteTracks, setFavoriteTracks] = useState([]);

    // Coger favoritos del localstorage al cargar la página
    useEffect(() => {
        try {
            const stored = JSON.parse(
                localStorage.getItem('favorite_tracks') || '[]'
            );
            setFavoriteTracks(stored);
        } catch {
            setFavoriteTracks([]);
        }
    }, []);

    // Comprobar si la canción está en favoritos
    function isTrackFavorite(id) {
        return favoriteTracks.some((t) => t.id === id);
    }

    // Añadir o quitar de favoritos
    function handleToggleFavorite(track) {
        const exists = favoriteTracks.some((t) => t.id === track.id);

        let updated;
        if (exists) {
            updated = favoriteTracks.filter((t) => t.id !== track.id);
        } else {
            updated = [...favoriteTracks, track];
        }

        setFavoriteTracks(updated);
        localStorage.setItem('favorite_tracks', JSON.stringify(updated));
    }

    // Eliminar canción de la playlist
    function handleRemoveTrack(trackId) {
        setPlaylist((prev) => prev.filter((t) => t.id !== trackId));
    }

    // Actualizar las preferencias
    function handleArtistsChange(newArtists) {
        setPreferences((prev) => ({
            ...prev,
            artists: newArtists,
        }));
    }

    function handleTracksChange(newTracks) {
        setPreferences((prev) => ({
            ...prev,
            tracks: newTracks,
        }));
    }

    function handleGenresChange(newGenres) {
        setPreferences((prev) => ({
            ...prev,
            genres: newGenres,
        }));
    }

    function handleDecadesChange(newDecades) {
        setPreferences((prev) => ({
            ...prev,
            decades: newDecades,
        }));
    }

    function handleMoodChange(newMood) {
        setPreferences((prev) => ({
            ...prev,
            mood: newMood,
        }));
    }

    function handlePopularityChange(newPopularity) {
        setPreferences((prev) => ({
            ...prev,
            popularity: newPopularity,
        }));
    }

    // Preparar las preferencias para pasarlo a lib/spotify.js
    // Preparar los resultados a lo que recibe TrackWidget.jsx
    async function getPlaylist() {
        const apiPreferences = {
            artists: preferences.artists,
            genres: preferences.genres,
            decades: preferences.decades,
            popularity: [
                preferences.popularity.min,
                preferences.popularity.max,
            ],
        };

        const spotifyTracks = await generatePlaylist(apiPreferences);

        const recommended = (spotifyTracks || []).map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists?.map((a) => a.name).join(', ') || '',
            imageUrl: track.album?.images?.[0]?.url || '',
        }));

        return recommended;
    }

    // Generar playlist
    async function handleGeneratePlaylist() {
        try {
            setPlaylistLoading(true);
            setPlaylistError('');

            const recommended = await getPlaylist();
            const seedTracks = preferences.tracks || [];
            const all = [...seedTracks, ...recommended];
            // Quitar duplicados y limitar a 30 canciones
            const uniqueById = Array.from(
                new Map(all.map((t) => [t.id, t])).values()
            ).slice(0, 30)

            setPlaylist(uniqueById);

        } catch (err) {
            console.error(err);
            setPlaylistError('Error al generar la playlist. Intenta de nuevo.');
        } finally {
            setPlaylistLoading(false);
        }
    }

    // Mezclar y devolver otra playlist
    function otraPlaylist(tracks, size) {
        const shuffled = [...tracks].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(size, shuffled.length));
    }

    // Refrescar playlist con las mismas preferencias
    async function handleRefreshPlaylist() {
        try {
            setPlaylistLoading(true);
            setPlaylistError('');

            const recommended = await getPlaylist();
            const seedTracks = preferences.tracks || [];
            const all = [...seedTracks, ...recommended];
            const uniqueById = Array.from(
                new Map(all.map((t) => [t.id, t])).values()
            )
            const newPlaylist = otraPlaylist(uniqueById, 30)
            setPlaylist(newPlaylist);

        } catch (err) {
            console.error(err);
            setPlaylistError('Error al generar la playlist. Intenta de nuevo.');
        } finally {
            setPlaylistLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="px-3 pb-4 md:px-4">
                <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-[1fr_3fr]">
                    <section className="bg-white rounded-lg p-4">
                        <h2 className="font-semibold mb-3 text-black">Preferencias</h2>

                        <Menu
                            activeWidget={activeWidget}
                            onChangeWidget={setActiveWidget}
                        />
                    </section>

                    <section className="bg-white rounded-lg p-4 space-y-6">
                        <h2 className="font-semibold text-black">
                            {activeWidget === 'artists' && 'Artistas'}
                            {activeWidget === 'tracks' && 'Canciones'}
                            {activeWidget === 'genres' && 'Géneros'}
                            {activeWidget === 'decades' && 'Décadas'}
                            {activeWidget === 'mood' && 'Mood'}
                            {activeWidget === 'popularity' && 'Popularidad'}
                        </h2>

                        {/* Renderizar solo el widget correspondiente*/}
                        {activeWidget === 'artists' && (
                            <ArtistWidget
                                selectedArtists={preferences.artists}
                                onChangeSelectedArtists={handleArtistsChange}
                            />
                        )}

                        {activeWidget === 'tracks' && (
                            <TrackWidget
                                selectedTracks={preferences.tracks}
                                onChangeSelectedTracks={handleTracksChange}
                            />
                        )}

                        {activeWidget === 'genres' && (
                            <GenreWidget
                                selectedGenres={preferences.genres}
                                onChangeSelectedGenres={handleGenresChange}
                            />
                        )}

                        {activeWidget === 'decades' && (
                            <DecadeWidget
                                selectedDecades={preferences.decades}
                                onChangeSelectedDecades={handleDecadesChange}
                            />
                        )}

                        {activeWidget === 'mood' && (
                            <MoodWidget
                                moodConfig={preferences.mood}
                                onChangeMood={handleMoodChange}
                            />
                        )}

                        {activeWidget === 'popularity' && (
                            <PopularityWidget
                                popularityRange={preferences.popularity}
                                onChangePopularity={handlePopularityChange}
                            />
                        )}

                        {/*Playlist más botones*/}
                        <div className="border-t border-gray-200 pt-4 space-y-4">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <h3 className="font-semibold text-black">
                                    Playlist generada
                                </h3>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleGeneratePlaylist}
                                        disabled={playlistLoading}
                                        className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 disabled:opacity-60"
                                    >
                                        {playlistLoading ? 'Generando...' : 'Generar playlist'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleRefreshPlaylist}
                                        disabled={playlistLoading || playlist.length === 0}
                                        className="px-3 py-2 rounded-full bg-gray-200 text-black text-xs font-semibold hover:bg-gray-300 disabled:opacity-60"
                                    >
                                        Refrescar
                                    </button>
                                </div>
                            </div>

                            {playlistError && (
                                <p className="text-sm text-red-600">{playlistError}</p>
                            )}
                            {/*Componente para mostrar la lista de canciones*/}
                            <PlaylistDisplay
                                tracks={playlist}
                                onRemoveTrack={handleRemoveTrack}
                                onToggleFavorite={handleToggleFavorite}
                                isTrackFavorite={isTrackFavorite}
                            />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
