import useLocalStorage from "../hooks/useLocalStorage"

function StatsPage() {
    const [watchlist] = useLocalStorage('watchlist', [])
    const [watched] = useLocalStorage('watched', [])

    const totalWatched = watched.length
    const totalWatchlist = watchlist.length
    const totalTracked = totalWatched + totalWatchlist

    const ratedMovies = watched.filter((m) => m.myRating > 0)
    const averageRating =
        ratedMovies.length > 0
            ? (ratedMovies.reduce((sum, m) => sum + m.myRating, 0) / ratedMovies.length).toFixed(1)
            : 'N/A'

    const stats = [
        { label: 'Total Watched', value: totalWatched },
        { label: 'Total in Watchlist', value: totalWatchlist },
        { label: 'Total Movies Tracked', value: totalTracked },
        { label: 'Average Rating', value: averageRating !== 'N/A' ? `${averageRating} ★` : 'N/A' },
    ]

    return (
        <div className="stats-page p-8 max-w-4xl mx-auto">
            <h2 className="font-display text-3xl text-cinema-accent mb-8 tracking-wide">Your Stats</h2>
            <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-cinema-card rounded-lg p-6 text-center shadow-md border-l-4 border-cinema-cta">
                        <p className="text-3xl font-display text-white mb-2">{stat.value}</p>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StatsPage