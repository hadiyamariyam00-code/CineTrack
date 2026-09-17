import { useEffect, useState } from "react"
import { getMovieById } from "../api/omdb"

function MovieModal({ imdbID, onClose }) {
    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getMovieById(imdbID).then((data) => {
            setDetails(data)
            setLoading(false)
        })
    }, [imdbID])

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="relative bg-cinema-card rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {loading ? (
                    <p className="text-gray-400 p-8 text-center">Loading details...</p>
                ) : details ? (
                    <div className="flex flex-col sm:flex-row gap-4 p-6">
                        {details.Poster !== 'N/A' ? (
                            <img src={details.Poster} alt={details.Title} className="w-full sm:w-48 h-72 object-cover rounded-md flex-shrink-0" />
                        ) : (
                            <div className="w-full sm:w-48 h-72 bg-gray-800 flex items-center justify-center text-gray-500 text-sm rounded-md flex-shrink-0">
                                No Image
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            <h2 className="font-display-bebas text-2xl text-white">{details.Title} <span className="text-gray-400 text-lg">({details.Year})</span></h2>
                            <p className="text-cinema-cta text-sm font-semibold">{details.Genre}</p>
                            <p className="text-gray-400 text-sm">{details.Runtime} • {details.Rated}</p>
                            <p className="text-white text-sm mt-2">{details.Plot}</p>
                            <p className="text-gray-400 text-sm mt-2"><span className="text-gray-300 font-semibold">Cast:</span> {details.Actors}</p>
                            <p className="text-gray-400 text-sm"><span className="text-gray-300 font-semibold">Director:</span> {details.Director}</p>
                            <p className="text-cinema-accent text-sm mt-2 font-semibold">IMDb: {details.imdbRating} ★</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-400 p-8 text-center">Could not load details.</p>
                )}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-8 h-8 hover:bg-black/80 transition"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}

export default MovieModal