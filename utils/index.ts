export function formatYear(year: string): string {
	const yearRegex = /\b(\d{4})\b/g
	const matches = year.match(yearRegex)

	if (matches && matches.length > 0) {
		// If there are one or more 4-digit year matches, join them with '-'.
		return matches.join('-')
	} else {
		// If there are no 4-digit year matches, return the input as is.
		return year
	}
}

export function getMovieGenreById(genreIds: number[]): string {
	const genreMap: { [id: number]: string } = {
		28: 'Action',
		12: 'Adventure',
		16: 'Animation',
		35: 'Comedy',
		80: 'Crime',
		99: 'Documentary',
		18: 'Drama',
		10751: 'Family',
		14: 'Fantasy',
		36: 'History',
		27: 'Horror',
		10402: 'Music',
		9648: 'Mystery',
		10749: 'Romance',
		878: 'Science Fiction',
		10770: 'TV Movie',
		53: 'Thriller',
		10752: 'War',
		37: 'Western',
	}

	const genres: string[] = []

	for (const id of genreIds) {
		const genre = genreMap[id]
		if (genre) {
			genres.push(genre)
			if (genres.length >= 3) {
				break // Stop after collecting the first 3 genres
			}
		}
	}

	return genres.join(', ') // Combine the first 3 genres with commas
}

export function getTVShowGenreById(genreIds: number[]): string {
	const genreMap: { [id: number]: string } = {
		10759: 'Action & Adventure',
		16: 'Animation',
		35: 'Comedy',
		80: 'Crime',
		99: 'Documentary',
		18: 'Drama',
		10751: 'Family',
		10762: 'Kids',
		9648: 'Mystery',
		10763: 'News',
		10764: 'Reality',
		10765: 'Sci-Fi & Fantasy',
		10766: 'Soap',
		10767: 'Talk',
		10768: 'War & Politics',
		37: 'Western',
	}

	const genres: string[] = []

	for (const id of genreIds) {
		const genre = genreMap[id]
		if (genre) {
			genres.push(genre)
		}
	}

	return genres.join(', ') // Combine the first 3 genres with commas
}
