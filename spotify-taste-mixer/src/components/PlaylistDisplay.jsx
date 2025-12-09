import TrackCard from "./TrackCard";

export default function PlaylistDisplay({ }) {
    if (!tracks || tracks.length === 0) {
        return <p className="text-sm text-black">No hay resultados</p>;
    }

    return (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
                <TrackCard

                />
            ))}
        </div>
    );
}
