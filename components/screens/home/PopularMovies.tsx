import {
	Text,
	FlatList,
	Image,
	StyleSheet,
	View,
	ActivityIndicator,
} from 'react-native'
import { colors, globalStyles, margins } from '../../../constants/styles'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { getMovieGenreById } from '../../../utils'
import axios from 'axios'
import { IMovie } from '../../../constants/types'
import { Link } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import Animated, { FadeIn } from 'react-native-reanimated'

const fetchPopularMovies = async (signal: AbortSignal) => {
	await new Promise((resolve) => setTimeout(resolve, 2000))
	try {
		const response = await axios.get(
			'https://api.themoviedb.org/3/movie/popular',
			{
				signal,
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
}

function PopularMovies() {
	const { isLoading, data } = useQuery({
		queryKey: ['home', 'popularMovies'],
		queryFn: ({ signal }) => fetchPopularMovies(signal),
	})

	return (
		<>
			<Text style={globalStyles.sectionTitle}>Popular movies</Text>
			{isLoading && (
				<View style={{ marginVertical: hp(1.5) }}>
					<ActivityIndicator />
				</View>
			)}
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={data}
				keyExtractor={(item: IMovie) => item.id.toString()}
				contentContainerStyle={styles.flatListContainer}
				renderItem={({ item, index }) => {
					const title =
						item.title.length > 35
							? item.title.slice(0, 35) + '...'
							: item.title

					return (
						<Link
							href={{
								pathname: '/(tabs)/[id]',
								params: {
									id: item.id,
									poster: item.poster_path,
									type: 'movie',
								},
							}}
							style={{ gap: 6 }}
						>
							<Animated.View entering={FadeIn}>
								<Animated.Image
									style={styles.backdropImage}
									resizeMode='cover'
									source={{
										uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`,
									}}
								/>
								<Text style={styles.title}>{title}</Text>
								<Text style={styles.genres}>
									{getMovieGenreById(item.genre_ids)}
								</Text>
							</Animated.View>
						</Link>
					)
				}}
			/>
		</>
	)
}

export default PopularMovies

const styles = StyleSheet.create({
	flatListContainer: {
		marginHorizontal: margins.side,
		gap: 10,
		paddingRight: 38,
		paddingTop: 3,
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
