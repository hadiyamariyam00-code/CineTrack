import useLocalStorage from "../hooks/useLocalStorage"

function WatchedPage() {
    const [watched, setWatched] = useLocalStorage('watched', [])

    const removeFromWatched = (imdbID) => {
        setWatched(watched.filter((m) => m.imdbID !== imdbID))
    }

    const setRating = (imdbID, rating) => {
        setWatched(watched.map((m) => m.imdbID === imdbID ? { ...m, myRating: rating } : m))
    }

    const setNotes = (imdbID, notes) => {
        setWatched(watched.map((m) => m.imdbID === imdbID ? { ...m, notes: notes } : m))
    }

    if (watched.length === 0) {
        return (
            <div className="watched-page p-8 max-w-6xl mx-auto text-center">
                <p className="text-gray-400 text-lg mt-12">
                    You haven't watched anything yet.. <br /> Mark a movie as watched from your watchlist!
                </p>
            </div>
        )
    }

    return (
        <div className="watched-page p-8 max-w-6xl mx-auto">
        
<div className="movie-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {watched.map((movie) => (
        <div key={movie.imdbID} className="movie-card bg-cinema-card rounded-lg overflow-hidden shadow-md flex flex-col border border-transparent hover:border-cinema-accent/40 transition-all duration-200">
            {movie.poster !== 'N/A' ? (
                <img src={movie.poster} alt={movie.title} className="w-full h-72 object-cover" />
            ) : (
                <div className="w-full h-72 bg-gray-800 flex items-center justify-center text-gray-500 text-sm text-center px-2">
                    No Image Available
                </div>
            )}
            <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-display-oswald text-lg text-white line-clamp-2 min-h-[3.5rem]">{movie.title}</h3>
                <p className="text-gray-400 text-sm">{movie.year}</p>

                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setRating(movie.imdbID, star)}
                            className="cursor-pointer text-2xl"
                            style={{ color: star <= movie.myRating ? '#00E054' : '#4b5563' }}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <textarea
                    placeholder="What did you think?"
                    value={movie.notes}
                    onChange={(e) => setNotes(movie.imdbID, e.target.value)}
                    className="bg-cinema-bg text-white text-sm p-2 rounded-md border border-gray-700 focus:outline-none focus:border-cinema-accent resize-none h-16"
                    rows={2}
                />

                <button
                    onClick={() => removeFromWatched(movie.imdbID)}
                    className="mt-auto bg-transparent border border-gray-600 text-gray-300 py-2 rounded-md font-semibold hover:border-red-400 hover:text-red-400 transition"
                >
                    Remove
                </button>
            </div>
        </div>
    ))}
</div>
        </div>
    )
}

export default WatchedPage