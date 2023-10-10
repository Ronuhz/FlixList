import { Text, FlatList, StyleSheet } from 'react-native'
import { globalStyles, margins } from '../../../constants/styles'
import HorizontalCard from '../../HorizontalCard'
import { useEffect, useState } from 'react'
import { IMovie } from '../../../constants/types'
import axios from 'axios'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const fetchUpcomingMovies = async () => {
	try {
		const response = await axios.get(
			'https://api.themoviedb.org/3/movie/upcoming',
			{ headers: { Authorization: process.env.EXPO_PUBLIC_API_KEY } }
		)
		console.log('Fetched upcoming movies')
		return response.data.results
	} catch (error) {
		console.error('Error fetching upcoming movies: ', error)
	}
}

export default function Upcoming() {
	const [movies, setMovies] = useState<IMovie[]>([])

	useEffect(() => {
		fetchUpcomingMovies().then((upcomingMovies: IMovie[]) =>
			setMovies(upcomingMovies)
		)
	}, [])

	return (
		<>
			<Text style={globalStyles.sectionTitle}>Upcoming</Text>
			<FlatList
				data={movies}
				horizontal
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item, index }) => (
					<HorizontalCard
						key={index}
						index={index}
						title={item.title}
						poster={item.backdrop_path}
						releaseDate={item.release_date}
					/>
				)}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.flatListContainer}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	flatListContainer: {
		gap: 12,
		marginHorizontal: margins.side,
		paddingRight: 40,
		height: hp(26),
	},
})
