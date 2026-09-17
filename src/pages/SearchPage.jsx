import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/omdb";
import useLocalStorage from "../hooks/useLocalStorage";
import MovieModal from "../components/MovieModal";

function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const urlQuery = searchParams.get('q') || ''

    const [selectedMovie, setSelectedMovie] = useState(null)

    const [query, setQuery] = useState(urlQuery)
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [watchlist, setWatchlist] = useLocalStorage('watchlist', [])

    // Re-fetch whenever the URL's ?q= changes (covers back/forward nav too)
    useEffect(() => {
        if (!urlQuery.trim()) return

        const fetchResults = async () => {
            setLoading(true)
            setError('')
            try {
                const data = await searchMovies(urlQuery)
                if (data.Response === 'True') {
                    setMovies(data.Search)
                } else {
                    setMovies([])
                    setError(data.Error)
                }
            } catch (err) {
                setError('Something went wrong. Please try again.')
            } finally {
                setLoading(false)
            }
        }
        fetchResults()
    }, [urlQuery])

    const handleSearch = (e) => {
        e.preventDefault()
        if (!query.trim()) return
        setSearchParams({ q: query.trim() })
    }

    const addToWatchlist = (movie) => {
        const alreadyAdded = watchlist.some((m) => m.imdbID === movie.imdbID)
        if (alreadyAdded) return

        const newItem = {
            imdbID: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
        }
        setWatchlist([...watchlist, newItem])
    }

    return (
        <div className="search-page p-10 max-w-6xl mx-auto">
            {/* Compact search bar for refining, not the full hero */}
            <form onSubmit={handleSearch} className="mb-8 max-w-md">
                <div className="relative flex items-center">
                    <svg
                        className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for movies.."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full text-white placeholder-gray-400 pl-11 pr-14 py-2.5 rounded-full
                                   bg-cinema-card border border-white/10
                                   focus:outline-none focus:border-cinema-accent transition-colors"
                    />
                    <button
                        type="submit"
                        className="absolute right-1.5 bg-cinema-accent text-white w-8 h-8 rounded-full
                                   flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                    </button>
                </div>
            </form>

            {loading && <p className="text-gray-400 text-center">Loading...</p>}
            {error && <p className="text-red-400 text-center">{error}</p>}
            {!loading && !error && movies.length > 0 && (
                <p className="text-gray-500 text-sm mb-4">
                    Results for "<span className="text-gray-300">{urlQuery}</span>"
                </p>
            )}

            <div className="movie-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-2">
                {movies.map((movie) => {
                    const inWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID)
                    return (
                        <div
                            key={movie.imdbID}
                            onClick={() => {
                                setSelectedMovie(movie.imdbID)
                            }}
                            className="movie-card bg-cinema-card rounded-lg overflow-hidden shadow-md
                                       flex flex-col border border-transparent
                                       hover:border-cinema-accent/40 hover:-translate-y-1 transition-all duration-200
                                       cursor-pointer"
                        >
                            <img
                                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
                                alt={movie.Title}
                                className="w-full aspect-[2/3] object-cover"
                            />
                            <div className="p-3 flex flex-col flex-1">
                                <h3 className="font-display-bebas text-lg tracking-wide text-white truncate">
                                    {movie.Title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">{movie.Year}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        addToWatchlist(movie)
                                    }}
                                    disabled={inWatchlist}
                                    className="mt-auto bg-cinema-accent disabled:bg-gray-600 text-white py-2
                                               rounded-md font-semibold hover:opacity-90 transition"
                                >
                                    {inWatchlist ? 'Added ✓' : 'Add to Watchlist'}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {selectedMovie && (
                <MovieModal
                    imdbID={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </div>
    )
}
export default SearchPage