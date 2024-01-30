import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors, globalStyles, margins } from '../../../constants/styles'
import { TMDBTvShows } from '../../../constants/types'
import SquareCard from './SquareCard'

const fetchTvShows = async (signal: AbortSignal) => {
	try {
		const response = await axios.get(
			'https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&screened_theatrically=true&sort_by=popularity.desc',
			{
				signal,
				headers: { Authorization: process.env.EXPO_PUBLIC_API_KEY },
			}
		)

		return response.data.results
	} catch (error) {
		console.error('Error fetching Tv Shows: ', JSON.stringify(error, null, 2))
	}
}

function TvShows() {
	const { isLoading, data } = useQuery({
		queryKey: ['home', 'tvShows'],
		queryFn: ({ signal }) => fetchTvShows(signal),
	})

	return (
		<>
			<Text
				style={[
					globalStyles.sectionTitle,
					{ marginTop: hp(3), marginHorizontal: margins.side },
				]}
			>
				TV shows
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
				renderItem={({ item, index }) => (
					<SquareCard
						key={index}
						href={{
							pathname: '/[id]',
							params: {
								id: item.id,
								poster: item.backdrop_path ?? '',
								type: 'tv',
							},
						}}
						backdrop_path={item.backdrop_path}
						title={item.name}
						genre_ids={item.genre_ids}
					/>
				)}
			/>
		</>
	)
}

export default TvShows

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
