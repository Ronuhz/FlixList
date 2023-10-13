export interface IMovie {
	adult: boolean
	backdrop_path: string
	genre_ids: number[]
	id: number
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	release_date: string
	title: string
	video: string
	vote_average: number
	vote_count: number
}

export type TMDBTvShows = {
	backdrop_path: string
	first_air_date: string
	genre_ids: number[]
	id: number
	name: string
	origin_country
	original_language: string
	original_name: string
	overview: string
	popularity: number
	poster_path: string
	vote_average: number
	vote_count: number
}

export interface IOMDBMovie {
	Poster: string
	Title: string
	Type: 'movie' | 'series' | 'episode'
	Year: string
	imdbID: string
}
