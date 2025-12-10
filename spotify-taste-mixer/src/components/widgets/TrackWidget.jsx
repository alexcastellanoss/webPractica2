'use client';

import { useState } from 'react';
import { spotifyRequest } from '@/lib/spotify';

export default function TrackWidget({ selectedTracks, onChangeSelectedTracks }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSearch(e) {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            setLoading(true);
            setError('');

            const data = await spotifyRequest(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
                query
            )}&limit=10`)

            setResults(data.tracks.items || []);
        } catch (err) {
            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }

    function isSelected(id) {
        return selectedTracks.some((t) => t.id === id);
    }

    function toggleTrack(track) {
        let newSelection;

        if (isSelected(track.id)) {
            newSelection = selectedTracks.filter((t) => t.id !== track.id);
        } else {
            newSelection = [
                ...selectedTracks,
                {
                    id: track.id,
                    name: track.name,
                    artist: track.artists?.[0]?.name || '',
                    imageUrl: track.album?.images?.[0]?.url || '',
                },
            ];
        }
        onChangeSelectedTracks(newSelection);
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    placeholder="Busca una canción (ej. Mon Amour)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="text-black flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300"
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600"
                >
                    Buscar
                </button>
            </form>

            {loading && (
                <p className="text-sm text-black">Buscando canciones...</p>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {results.map((track) => (
                    <button
                        key={track.id}
                        type="button"
                        onClick={() => toggleTrack(track)}
                        className={
                            'flex items-center gap-3 p-2 rounded border text-left transition ' +
                            (isSelected(track.id)
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-gray-200 hover:bg-gray-50')
                        }
                    >
                        {track.album?.images?.[0]?.url && (
                            <img
                                src={track.album.images[0].url}
                                alt={track.name}
                                className="w-10 h-10 rounded object-cover"
                            />
                        )}

                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-black">
                                {track.name}
                            </span>
                            <span className="text-xs text-black">
                                {track.artists?.map((a) => a.name).join(', ')}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {selectedTracks.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-black mb-1">
                        Canciones seleccionadas:
                    </h3>
                    <ul className="text-sm text-black list-disc list-inside">
                        {selectedTracks.map((track) => (
                            <li key={track.id}>
                                {track.name} - {track.artist}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
