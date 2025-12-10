'use client';

import { useState } from 'react';
import { spotifyRequest } from '@/lib/spotify'

// Buscar y seleccionar artistas
export default function ArtistWidget({ selectedArtists, onChangeSelectedArtists }) {
    // Texto del buscador
    const [query, setQuery] = useState('');
    // Resultados de la búsqueda
    const [results, setResults] = useState([]);
    // Estado de carga y error
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    //Buscar artistas en Spotify
    async function handleSearch(e) {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            setLoading(true);
            setError('');

            const data = await spotifyRequest(`https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(
                query
            )}&limit=10`)

            setResults(data.artists.items || []);
        } catch (err) {
            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }

    // Comprobar si un artista está seleccionado
    function isSelected(id) {
        return selectedArtists.some((a) => a.id === id);
    }

    // Añadir o quitar artista de la selección
    function toggleArtist(artist) {
        let newSelection;
        if (isSelected(artist.id)) {
            newSelection = selectedArtists.filter((a) => a.id !== artist.id);
        } else {
            newSelection = [
                ...selectedArtists,
                { id: artist.id, name: artist.name },
            ];
        }
        onChangeSelectedArtists(newSelection);
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    placeholder="Busca un artista (ej. Aitana)"
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
                <p className="text-sm text-black">Buscando artistas...</p>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {results.map((artist) => (
                    <button
                        key={artist.id}
                        type="button"
                        onClick={() => toggleArtist(artist)}
                        className={
                            'flex items-center gap-3 p-2 rounded border text-left transition ' +
                            (isSelected(artist.id)
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-gray-200 hover:bg-gray-50')
                        }
                    >
                        {artist.images && artist.images[0] && (
                            <img
                                src={artist.images[0].url}
                                alt={artist.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        )}
                        <div className="text-sm font-medium text-black">
                            {artist.name}
                        </div>
                    </button>
                ))}
            </div>

            {/*Mostrar artistas seleccionados*/}
            {selectedArtists.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-black mb-1">
                        Artistas seleccionados:
                    </h3>
                    <ul className="text-sm text-black list-disc list-inside">
                        {selectedArtists.map((artist) => (
                            <li key={artist.id}>{artist.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
