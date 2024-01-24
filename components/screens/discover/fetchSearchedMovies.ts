import axios from 'axios'

export default async function fetchSearchedMovies(
	query: string,
	page = 1,
	category: 'Tv Series' | 'Movies' | string = 'Movies'
) {
	try {
		const apiCategory = category === 'Movies' ? 'movie' : 'series'

		const response = await axios.get(
			`http://www.omdbapi.com/?apikey=f8feb9de&s=${query}&page=${page}
				&type=${apiCategory}`
		)
		return response.data.Search
	} catch (error) {
		console.error('Error fetching queried movies')
	}
}
