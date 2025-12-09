'use client';

const opciones = [
    { id: 'artists', label: 'Artistas' },
    { id: 'tracks', label: 'Canciones' },
    { id: 'genres', label: 'Géneros' },
    { id: 'decades', label: 'Décadas' },
    { id: 'mood', label: 'Mood' },
    { id: 'popularity', label: 'Popularidad' },
];

export default function Menu({ activeWidget, onChangeWidget }) {
    return (
        <nav className="space-y-2">
            <ul className="list-none m-0 p-0">
                {opciones.map((opcion) => {
                    const activo = activeWidget === opcion.id;

                    return (
                        <li key={opcion.id} className="py-1">
                            <button
                                type="button"
                                onClick={() => onChangeWidget(opcion.id)}
                                className={
                                    'w-full text-left px-3 py-2 rounded text-sm ' +
                                    (activo
                                        ? 'font-bold underline text-black bg-gray-100'
                                        : 'text-black hover:bg-gray-100')
                                }
                            >
                                {opcion.label}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
