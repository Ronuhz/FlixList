import axios from 'axios'

export default async function fetchSearchedMovies(query: string, page = 1) {
	try {
		const response = await axios.get(
			`http://www.omdbapi.com/?apikey=f8feb9de&s=${query}&page=${page}`
		)

		return response.data.Search
	} catch (error) {
		console.error('Error fetching queried movies')
	}
}
