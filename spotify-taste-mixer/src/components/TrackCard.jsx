export default function TrackCard({ track }) {
    return (
        <div className="track-card">
            {/*Practica anterior (cambiar)*/}
            {track.imageUrl && (
                <img src={track.imageUrl} alt={track.name} />
            )}

            <div>
                <h3>
                    {track.name}
                </h3>
                <p>
                    {track.artist}
                </p>
            </div>
        </div>
    )
}