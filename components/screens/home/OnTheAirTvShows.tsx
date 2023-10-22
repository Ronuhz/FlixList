import {
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	ActivityIndicator,
} from 'react-native'
import { TMDBTvShows } from '../../../constants/types'
import axios from 'axios'
import { colors, globalStyles, margins } from '../../../constants/styles'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { FlatList } from 'react-native-gesture-handler'
import { getTVShowGenreById } from '../../../utils'
import { Link } from 'expo-router'
import { useQuery } from '@tanstack/react-query'

const fetchOnTheAirTvShows = async (signal: AbortSignal) => {
	try {
		const response = await axios.get(
			'https://api.themoviedb.org/3/tv/on_the_air',
			{
				signal,
				headers: { Authorization: process.env.EXPO_PUBLIC_API_KEY },
			}
		)

		console.log('Fetched On The Air Tv Shows')
		return response.data.results
	} catch (error) {
		console.error('Error fetching On The Air Tv Shows: ', error)
	}
}

function OnTheAirTvShows() {
	const { isLoading, data } = useQuery({
		queryKey: ['home', 'OnTheAirTvShows'],
		queryFn: ({ signal }) => fetchOnTheAirTvShows(signal),
	})

	return (
		<>
			<Text style={[globalStyles.sectionTitle, { marginTop: hp(3) }]}>
				On The Air
			</Text>
			{isLoading && (
				<View style={{ marginVertical: hp(1.5) }}>
					<ActivityIndicator />
				</View>
			)}
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={data}
				keyExtractor={(item: TMDBTvShows) => item.id.toString()}
				contentContainerStyle={styles.flatListContainer}
				renderItem={({ item, index }) => {
					const title =
						item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name

					const convertedGenres = getTVShowGenreById(item.genre_ids)
					const genres =
						convertedGenres.length > 24
							? convertedGenres.slice(0, 24) + '...'
							: convertedGenres

					return (
						<Link
							href={{
								pathname: '/(tabs)/[id]',
								params: {
									id: item.id,
									poster: item.backdrop_path,
									type: 'tv',
								},
							}}
							style={{ gap: 6 }}
						>
							<View style={{ gap: 6 }}>
								<Image
									style={styles.coverImage}
									resizeMode='cover'
									source={{
										uri: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
									}}
								/>
								<Text style={styles.title}>{title}</Text>
								<Text style={styles.genres}>{genres}</Text>
							</View>
						</Link>
					)
				}}
			/>
		</>
	)
}

export default OnTheAirTvShows

const styles = StyleSheet.create({
	flatListContainer: {
		marginHorizontal: margins.side,
		gap: 10,
		paddingRight: 38,
		paddingTop: 3,
	},
	coverImage: {
		height: hp(20),
		width: hp(20),
		borderRadius: 20,
		backgroundColor: colors.placeholder,
	},
	title: {
		// 12 characters max
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
