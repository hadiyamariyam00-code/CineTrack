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

    const ratingCounts = [1, 2, 3, 4, 5].map((star) => ({
        star,
        count: ratedMovies.filter((m) => m.myRating === star).length,
    }))
    const maxCount = Math.max(...ratingCounts.map((r) => r.count), 1)

    const topRated = ratedMovies.length > 0
        ? ratedMovies.reduce((best, m) => (m.myRating > best.myRating ? m : best), ratedMovies[0])
        : null

    return (
        <div className="stats-page p-8 max-w-4xl mx-auto">
            

            <div className="grid grid-cols-2 gap-6 mb-10">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-cinema-card rounded-lg p-6 text-center shadow-md border-l-4 border-cinema-accent">
                        <p className="text-3xl font-display-bebas text-white mb-2">{stat.value}</p>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            {ratedMovies.length > 0 && (
                <div className="bg-cinema-card rounded-lg p-6 shadow-md mb-10">
                    <h3 className="font-display-oswald text-xl text-white mb-4">Rating Breakdown</h3>
                    <div className="flex flex-col gap-2">
                        {ratingCounts.reverse().map(({ star, count }) => (
                            <div key={star} className="flex items-center gap-3">
                                <span className="text-gray-400 text-sm w-10">{star}★</span>
                                <div className="flex-1 bg-cinema-bg rounded-full h-4 overflow-hidden">
                                    <div
                                        className="h-full bg-cinema-accent rounded-full transition-all"
                                        style={{ width: `${(count / maxCount) * 100}%` }}
                                    />
                                </div>
                                <span className="text-gray-400 text-sm w-6 text-right">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {topRated && (
                <div className="bg-cinema-card rounded-lg p-6 shadow-md flex items-center gap-6">
                    {topRated.poster !== 'N/A' ? (
                        <img src={topRated.poster} alt={topRated.title} className="w-24 h-36 object-cover rounded-md" />
                    ) : (
                        <div className="w-24 h-36 bg-gray-800 rounded-md flex items-center justify-center text-gray-500 text-xs text-center px-1">
                            No Image
                        </div>
                    )}
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Your Top Pick</p>
                        <h3 className="font-display-oswald text-2xl text-white">{topRated.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{topRated.year}</p>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} style={{ color: star <= topRated.myRating ? '#00E054' : '#4b5563' }}>★</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StatsPage