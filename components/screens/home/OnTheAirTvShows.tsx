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
import { globalStyles, margins } from '../../../constants/styles'
import { TMDBTvShows } from '../../../constants/types'
import SquareCard from './SquareCard'

const fetchOnTheAirTvShows = async (signal: AbortSignal) => {
	try {
		const response = await axios.get(
			'https://api.themoviedb.org/3/tv/on_the_air',
			{
				signal,
				headers: { Authorization: process.env.EXPO_PUBLIC_API_KEY },
			}
		)
		return response.data.results
	} catch (error) {
		console.error(
			'Error fetching On The Air Tv Shows: ',
			JSON.stringify(error, null, 2)
		)
	}
}

function OnTheAirTvShows() {
	const { isLoading, data } = useQuery({
		queryKey: ['home', 'OnTheAirTvShows'],
		queryFn: ({ signal }) => fetchOnTheAirTvShows(signal),
	})

	return (
		<>
			<Text
				style={[
					globalStyles.sectionTitle,
					{ marginTop: hp(3), marginHorizontal: margins.side },
				]}
			>
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

export default OnTheAirTvShows

const styles = StyleSheet.create({
	flatListContainer: {
		marginHorizontal: margins.side,
		gap: 10,
		paddingRight: 38,
		paddingTop: 3,
	},
})
