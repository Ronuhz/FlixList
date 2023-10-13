import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
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

function useTvShows() {
	const [tvShows, setTvShows] = useState<TMDBTvShows[]>([])

	const fetchTvShows = useCallback(async () => {
		try {
			const response = await axios.get(
				'https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&screened_theatrically=true&sort_by=popularity.desc',
				{
					headers: { Authorization: process.env.EXPO_PUBLIC_API_KEY },
				}
			)

			console.log('Fetched Tv Shows')
			return response.data.results
		} catch (error) {
			console.error('Error fetching Tv Shows: ', error)
		}
	}, [])

	useEffect(() => {
		fetchTvShows().then((tvShows: TMDBTvShows[]) => setTvShows(tvShows))
	}, [])

	const TvShows = (
		<>
			<Text style={[globalStyles.sectionTitle, { marginTop: hp(3) }]}>
				TV shows
			</Text>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={tvShows}
				keyExtractor={(item) => item.id.toString()}
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
							href={{ pathname: '/[id]', params: { id: item.id } }}
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

	return { TvShows, fetchTvShows }
}

export default useTvShows

const styles = StyleSheet.create({
	flatListContainer: {
		marginHorizontal: margins.side,
		gap: 10,
		paddingRight: 38,
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
