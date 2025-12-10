import TrackCard from "./TrackCard";

// Mostrar la lista de canciones
export default function PlaylistDisplay({ tracks, onRemoveTrack, onToggleFavorite, isTrackFavorite, }) {
    if (!tracks || tracks.length === 0) {
        return <p className="text-sm text-black">No hay resultados</p>;
    }

    return (
        // Grid responsive
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
                <TrackCard
                    key={track.id}
                    track={track}
                    onRemove={() => onRemoveTrack(track.id)}
                    onToggleFavorite={() => onToggleFavorite(track)}
                    isFavorite={isTrackFavorite(track.id)}
                />
            ))}
        </div>
    );
}
