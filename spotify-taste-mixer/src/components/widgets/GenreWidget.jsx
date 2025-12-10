'use client';

import { useState } from 'react';

// Lista de géneros
const ALL_GENRES = ['acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 'bluegrass',
    'blues', 'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical',
    'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno', 'disco', 'disney',
    'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french', 'funk', 'garage',
    'german', 'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore', 'hardstyle',
    'heavy-metal', 'hip-hop', 'house', 'idm', 'indian', 'indie', 'indie-pop', 'industrial', 'iranian', 'j-dance', 'j-idol',
    'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin', 'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore',
    'minimal-techno', 'movies', 'mpb', 'new-age', 'new-release', 'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop',
    'pop-film', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae',
    'reggaeton', 'road-trip', 'rock', 'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes',
    'singer-songwriter', 'ska', 'sleep', 'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish', 'synth-pop',
    'tango', 'techno', 'trance', 'trip-hop', 'turkish', 'work-out', 'world-music']

// Buscar y seleccionar géneros
export default function GenreWidget({ selectedGenres, onChangeSelectedGenres }) {
    // Texto del buscador
    const [filter, setFilter] = useState('');

    // Filtrar géneros según el texto del buscador
    const filteredGenres = ALL_GENRES.filter((g) =>
        g.toLowerCase().includes(filter.toLowerCase())
    );

    // Comprobar si un género está seleccionado
    function isSelected(genre) {
        return selectedGenres.includes(genre);
    }

    function toggleGenre(genre) {
        let newSelection;
        if (isSelected(genre)) {
            newSelection = selectedGenres.filter((g) => g !== genre);
        } else {
            if (selectedGenres.length >= 5) {
                return;
            }
            newSelection = [...selectedGenres, genre];
        }
        onChangeSelectedGenres(newSelection);
    }

    return (
        <div className="space-y-4">
            <div>
                <input
                    type="text"
                    placeholder="Filtrar géneros..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="text-black w-full border border-gray-300 rounded-full px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300"
                />
                <p className="mt-1 text-xs text-gray-500">
                    Selecciona hasta 5 géneros.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {filteredGenres.map((genre) => (
                    <button
                        key={genre}
                        type="button"
                        onClick={() => toggleGenre(genre)}
                        className={
                            'px-3 py-1 rounded-full text-xs border transition ' +
                            (isSelected(genre)
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                : 'border-gray-200 text-gray-700 hover:bg-gray-50')
                        }
                    >
                        {genre}
                    </button>
                ))}

                {filteredGenres.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No hay géneros que coincidan con "{filter}".
                    </p>
                )}
            </div>

            {selectedGenres.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        Géneros seleccionados:
                    </h3>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                        {selectedGenres.map((genre) => (
                            <li key={genre}>{genre}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
