import TrackCard from "./TrackCard";

export default function PlaylistDisplay({ tracks }) {
    if (!tracks || tracks.length === 0) {
        return <p>No hay canciones</p>
    }

    return (
        <div className="playlist-display">
            {tracks.map((track) => (<TrackCard key={track.id} track={track} />))}
        </div>
    )
}