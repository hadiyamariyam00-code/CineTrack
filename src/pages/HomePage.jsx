import { useState } from "react";
import { useNavigate } from "react-router-dom";
import interstellarBg from "../assets/interstellar-bg.jpg";

function HomePage() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (!query.trim()) return
        navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }

    return (
        <div
            className="relative flex flex-col items-center justify-center text-center px-6 pt-16 pb-20"
            style={{
                minHeight: '75vh',
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(10,10,15,0.9) 100%), url(${interstellarBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <p className="italic text-gray-300 text-sm mb-4 opacity-70">
                "We are the explorers, the wanderers, the pioneers."
            </p>
            <h1 className="text-font-display text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                Track every movie you watch.
            </h1>
            <h3 className="text-gray-400 text-xl mb-8">
                Search, save, and rate every film you've seen.
            </h3>

            <form onSubmit={handleSearch} className="w-full max-w-md">
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
                        className="w-full text-white placeholder-gray-400 pl-11 pr-14 py-3 rounded-full
                                   bg-white/10 backdrop-blur-md border border-white/15
                                   focus:outline-none focus:border-cinema-accent transition-colors"
                    />
                    <button
                        type="submit"
                        className="absolute right-1.5 bg-cinema-cta text-white w-9 h-9 rounded-full
                                   flex items-center justify-center hover:opacity-90 hover:scale-105
                                   transition-all shadow-md shadow-cinema-cta/30"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                    </button>
                </div>
                
            </form>
        </div>
    )
}
export default HomePage