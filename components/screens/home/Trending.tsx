import { Text, StyleSheet, Platform, Dimensions } from 'react-native'
import { globalStyles, margins } from '../../../constants/styles'
import BigCard from '../../BigCard'
import { IMovie } from '../../../constants/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FlatList } from 'react-native-gesture-handler'

const fetchTrendingMovies = async () => {
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
}

export default function Trending() {
	const [movies, setMovies] = useState<IMovie[]>([])

	useEffect(() => {
		fetchTrendingMovies().then((trendingMovies: IMovie[]) =>
			setMovies(trendingMovies)
		)
	}, [])

	return (
		<>
			<Text style={globalStyles.sectionTitle}>Trending</Text>
			<FlatList
				data={movies}
				horizontal
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item, index }) => (
					<BigCard
						key={index}
						index={index}
						title={item.title}
						poster={item.poster_path}
						id={item.id}
					/>
				)}
				contentContainerStyle={styles.flatListContainer}
				showsHorizontalScrollIndicator={false}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	flatListContainer: {
		gap: 12,
		marginHorizontal: margins.side,
		paddingRight: 40,
		height: Platform.OS === 'ios' ? hp(40) : hp(45),
		paddingTop: Platform.OS === 'ios' ? 2.5 : 0, //fixes card overflow on IOS
	},
})
