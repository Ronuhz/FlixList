export type IMovie = {
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

export type IOMDBMovie = {
	Poster: string
	Title: string
	Type: 'movie' | 'series' | 'episode'
	Year: string
	imdbID: string
}

type TMDBSearch = {
	adult: boolean
	backdrop_path?: string | null
	id: number
	name?: string
	original_language: string
	original_name?: string
	overview: string
	poster_path?: string | null
	media_type: 'tv' | 'person' | 'movie'
	genre_ids: number[]
	popularity: number
	first_air_date?: string
	vote_average: number
	vote_count: number
	origin_country?: string[]
	release_date?: string
	title?: string
	known_for_department?: string
	profile_path?: string | null
	known_for?: MediaItem[]
	video?: boolean
}

export type TMDBMovieDetails = {
	adult: boolean
	backdrop_path: string
	belongs_to_collection: {
		id: number
		name: string
		poster_path: string
		backdrop_path: string
	}
	budget: number
	genres: {
		id: number
		name: string
	}[]
	homepage: string
	id: number
	imdb_id: string
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: {
		id: number
		logo_path: string | null
		name: string
		origin_country: string
	}[]
	production_countries: {
		iso_3166_1: string
		name: string
	}[]
	release_date: string
	revenue: number
	runtime: number
	spoken_languages: {
		english_name: string
		iso_639_1: string
		name: string
	}[]
	status: string
	tagline: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export type TMDBSeriesDetails = {
	adult: boolean
	backdrop_path: string
	created_by: any[] // You can replace 'any' with the appropriate type if needed
	episode_run_time: number[]
	first_air_date: string
	genres: { id: number; name: string }[]
	homepage: string
	id: number
	in_production: boolean
	languages: string[]
	last_air_date: string
	last_episode_to_air: {
		id: number
		name: string
		overview: string
		vote_average: number
		vote_count: number
		air_date: string
		episode_number: number
		episode_type: string
		production_code: string
		runtime: number
		season_number: number
		show_id: number
		still_path: string | null
	}
	name: string
	next_episode_to_air: {
		id: number
		name: string
		overview: string
		vote_average: number
		vote_count: number
		air_date: string
		episode_number: number
		episode_type: string
		production_code: string
		runtime: number
		season_number: number
		show_id: number
		still_path: string | null
	}
	networks: {
		id: number
		logo_path: string
		name: string
		origin_country: string
	}[]
	number_of_episodes: number
	number_of_seasons: number
	origin_country: string[]
	original_language: string
	original_name: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: {
		id: number
		logo_path: string
		name: string
		origin_country: string
	}[]
	production_countries: {
		iso_3166_1: string
		name: string
	}[]
	seasons: {
		air_date: string
		episode_count: number
		id: number
		name: string
		overview: string
		poster_path: string
		season_number: number
		vote_average: number
	}[]
	// Add more fields as needed
}

export type SignUpError = {
	code: string
	message: string
	longMessage: string
	meta: {
		paramName:
			| 'email_address'
			| 'username'
			| 'password'
			| 'identifier'
			| 'code'
			| 'password_confirm'
	}
}

export type MediaCardProps = {
	href: {
		pathname: string
		params: { id: number; poster: string; type: 'movie' | 'tv' }
	}
	title: string
	backdrop_path: string
	genre_ids: number[]
}

export type Category = 'All' | 'Movies' | 'Tv Series'
