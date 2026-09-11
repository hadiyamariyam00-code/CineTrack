const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

console.log("API KEY:", API_KEY)

export async function searchMovies(query) {
    const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
    )
    return response.json()
}

export async function getMovieById(imdbID) {
    const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
    )
    return response.json()
}