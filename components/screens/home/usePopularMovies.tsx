import {
	Text,
	FlatList,
	Pressable,
	Image,
	StyleSheet,
	View,
} from 'react-native'
import { colors, globalStyles, margins } from '../../../constants/styles'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { getMovieGenreById } from '../../../utils'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { IMovie } from '../../../constants/types'
import { Link } from 'expo-router'

function usePopularMovies() {
	const [movies, setMovies] = useState<IMovie[]>([])

	const fetchPopularMovies = useCallback(async () => {
		try {
			const response = await axios.get(
				'https://api.themoviedb.org/3/movie/popular',
				{
					headers: {
						Authorization: process.env.EXPO_PUBLIC_API_KEY,
					},
				}
			)
			console.log('Fetched trending movies')
			return response.data.results
		} catch (error) {
			console.error('Error fetching trending movies: ', error)
		}
	}, [])

	useEffect(() => {
		fetchPopularMovies().then((trendingMovies: IMovie[]) =>
			setMovies(trendingMovies)
		)
	}, [])

	const PopularMovies = (
		<>
			<Text style={globalStyles.sectionTitle}>Popular movies</Text>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={movies}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={styles.flatListContainer}
				renderItem={({ item, index }) => (
					<Link
						href={{ pathname: '/[id]', params: { id: item.id } }}
						style={{ gap: 6 }}
					>
						<View>
							<Image
								style={styles.backdropImage}
								resizeMode='cover'
								source={{
									uri: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
								}}
							/>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.genres}>
								{getMovieGenreById(item.genre_ids)}
							</Text>
						</View>
					</Link>
				)}
			/>
		</>
	)

	return { PopularMovies, fetchPopularMovies }
}

export default usePopularMovies

const styles = StyleSheet.create({
	flatListContainer: {
		marginHorizontal: margins.side,
		gap: 10,
		paddingRight: 38,
	},
	backdropImage: {
		backgroundColor: colors.placeholder,
		borderRadius: 20,
		width: wp(85),
		height: hp(23),
	},
	title: {
		color: '#fff',
		fontFamily: 'Lato-Regular',
		fontSize: hp(2.3),
		fontWeight: '600',
		marginLeft: 2,
	},
	genres: {
		color: colors.mutedForeground,
		fontFamily: 'Lato-Regular',
		fontSize: hp(1.5),
		marginLeft: 2,
	},
})
