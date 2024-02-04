import { Category, TMDBSearch } from '@/constants/types'
import axios from 'axios'

export default async function fetchSearch(
	query: string,
	page: number,
	category: Category,
	signal: AbortSignal
) {
	const apiSearchCategory =
		category === 'Movies' ? 'movie' : category === 'Tv Series' ? 'tv' : 'multi'

	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/search/${apiSearchCategory}?query=${query}&include_adult=true&language=en-US&page=${page}`,
			{ signal, headers: { Authorization: process.env.EXPO_PUBLIC_API_KEY } }
		)

		return response.data.results as TMDBSearch[]
	} catch (error) {
		console.log(error)
	}
}
