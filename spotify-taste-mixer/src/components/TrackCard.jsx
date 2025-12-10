'use client';

export default function TrackCard({ track, onRemove, onToggleFavorite, isFavorite }) {
    return (
        <div className="p-0.5 rounded-2xl bg-linear-to-br from-emerald-500/80 via-transparent to-emerald-500/80">
            <div className="bg-[#181818] rounded-2xl p-3">
                <div className="grid grid-cols-[64px_1fr] gap-3 items-center text-white">
                    {track.imageUrl && (
                        <img
                            src={track.imageUrl}
                            alt={track.name}
                            className="w-16 h-16 rounded-xl object-cover"
                        />
                    )}

                    <div className="space-y-2">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold m-0">{track.name}</h3>
                            <p className="text-xs text-gray-300 m-0">{track.artist}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs">
                            <button
                                type="button"
                                onClick={onToggleFavorite}
                                className={
                                    'px-2 py-1 rounded-full border flex items-center gap-1 ' +
                                    (isFavorite
                                        ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                                        : 'border-gray-500 bg-transparent text-gray-300 hover:bg-white/10')
                                }
                            >
                                <span>{isFavorite ? '★' : '☆'}</span>
                                <span>Favorito</span>
                            </button>

                            <button
                                type="button"
                                onClick={onRemove}
                                className="px-2 py-1 rounded-full border border-red-500 text-red-300 hover:bg-red-500/20"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
