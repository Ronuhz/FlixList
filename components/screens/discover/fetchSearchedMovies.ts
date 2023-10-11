import axios from 'axios'

export default async function fetchSearchedMovies(
	query: string,
	page = 1,
	category: 'All' | 'Tv Series' | 'Movies' | string = 'All'
) {
	try {
		const apiCategory =
			category === 'Movies'
				? 'movie'
				: category === 'Tv Series'
				? 'series'
				: 'all'

		const response = await axios.get(
			`http://www.omdbapi.com/?apikey=f8feb9de&s=${query}&page=${page}${
				apiCategory !== 'all' ? `&type=${apiCategory}` : ''
			}`
		)
		return response.data.Search
	} catch (error) {
		console.error('Error fetching queried movies')
	}
}
