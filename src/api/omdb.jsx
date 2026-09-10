const API_KEY = '50c2a215'

export async function searchMovies(query) {
    const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
    )
    return response.json()
}