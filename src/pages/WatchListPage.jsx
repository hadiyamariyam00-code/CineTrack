import useLocalStorage from "../hooks/useLocalStorage"
// import { getMovieById } from "../api/omdb"

function WatchListPage() {
    const [watchlist, setWatchlist] = useLocalStorage('watchlist', [])
    const [watched, setWatched] = useLocalStorage('watched', [])

    const removeFromWatchList = (imdbID) => {
        setWatchlist(watchlist.filter((m) => m.imdbID !== imdbID))
    }

    const markAsWatched = async (movie) => {
        const alreadyWatched = watched.some((m) => m.imdbID === movie.imdbID)
        if (!alreadyWatched) {
            const watchedItem = { ...movie, myRating: 0, notes: '' }
            setWatched([...watched, watchedItem])
        }
        removeFromWatchList(movie.imdbID)
    }

    if (watchlist.length === 0) {
        return (
            <div className="watchlist-page p-8 max-w-6xl mx-auto text-center">
                <p className="text-gray-400 text-lg mt-12">
                    Your watchlist is empty.. <br /> Search for a movie to add one!
                </p>
            </div>
        )
    }

    return (
        <div className="watchlist-page p-8 max-w-6xl mx-auto">
            
            <div className="movie-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {watchlist.map((movie) => (
                    <div key={movie.imdbID} className="movie-card bg-cinema-card rounded-lg overflow-hidden shadow-md flex flex-col border border-transparent hover:border-cinema-accent/40 hover:-translate-y-1 transition-all duration-200">
                        {movie.poster !== 'N/A' ? (
                            <img src={movie.poster} alt={movie.title} className="w-full h-72 object-cover" />
                        ) : (
                            <div className="w-full h-72 bg-gray-800 flex items-center justify-center text-gray-500 text-sm text-center px-2">
                                No Image Available
                            </div>
                        )}
                        <div className="p-4 flex flex-col gap-2 flex-1">
                            <h3 className="font-display-bebas text-xl text-white">{movie.title}</h3>
                            <p className="text-gray-400 text-sm">{movie.year}</p>
                            <button
                                onClick={() => markAsWatched(movie)}
                                className="mt-auto bg-cinema-accent text-cinema-bg py-2 rounded-md font-semibold hover:opacity-90 transition"
                            >
                                Mark as Watched
                            </button>
                            <button
                                onClick={() => removeFromWatchList(movie.imdbID)}
                                className="bg-transparent border border-gray-600 text-gray-300 py-2 rounded-md font-semibold hover:border-red-400 hover:text-red-400 transition"
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

export default WatchListPage