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
import { IMovie } from '../../../constants/types'
import HorizontalCard from './HorizontalCard'

const fetchPopularMovies = async (signal: AbortSignal) => {
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
		return response.data.results
	} catch (error) {
		console.error(
			'Error fetching trending movies: ',
			JSON.stringify(error, null, 2)
		)
	}
}

function PopularMovies() {
	const { isLoading, data } = useQuery({
		queryKey: ['home', 'popularMovies'],
		queryFn: ({ signal }) => fetchPopularMovies(signal),
	})

	return (
		<>
			<Text
				style={[globalStyles.sectionTitle, { marginHorizontal: margins.side }]}
			>
				Popular movies
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
				keyExtractor={(item: IMovie) => item.id.toString()}
				contentContainerStyle={styles.flatListContainer}
				renderItem={({ item }) => (
					<HorizontalCard
						title={item.title}
						genre_ids={item.genre_ids}
						backdrop_path={item.backdrop_path}
						href={{
							pathname: '/[id]',
							params: {
								id: item.id,
								poster: item.poster_path,
								type: 'movie',
							},
						}}
					/>
				)}
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
})
