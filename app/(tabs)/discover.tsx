import { Text, StyleSheet, Platform, SafeAreaView } from 'react-native'
import { colors, globalStyles, margins } from '../../constants/styles'
import { useState, useEffect } from 'react'
import { IOMDBMovie } from '../../constants/types'
import SearchBar from '../../components/screens/discover/SearchBar'
import fetchSearchedMovies from '../../components/screens/discover/fetchSearchedMovies'
import MasonryList from '@react-native-seoul/masonry-list'
import MovieCard from '../../components/screens/discover/MovieCard'
import { DiscoverContext } from '../../contexts/discover'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

function DiscoverScreen() {
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(2)
	const [query, setQuery] = useState('')
	const [movies, setMovies] = useState<IOMDBMovie[]>([])
	const [category, setCategory] = useState('Movies')

	const fetchMoreMovies = () => {
		if (loading) return

		setLoading(true)
		fetchSearchedMovies(query, page, category).then((movies: IOMDBMovie[]) => {
			setLoading(false)

			if (!movies || movies.length === 0) return

			setMovies((prev) => [...prev, ...movies])
			setPage((prev) => prev + 1)
		})
	}

	//reset page when changing category
	useEffect(() => {
		setPage(2)
	}, [category])

	return (
		<DiscoverContext.Provider value={{ category, setCategory }}>
			<SafeAreaView style={styles.container}>
				<Text style={[globalStyles.sectionTitle, { width: wp(70) }]}>
					Find Movies, Tv series, and more..
				</Text>
				<SearchBar query={query} setQuery={setQuery} setMovies={setMovies} />

				{movies && (
					<MasonryList
						data={movies}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.masonryListContainer}
						renderItem={({ item, i }) => (
							<MovieCard index={i} item={item as IOMDBMovie} />
						)}
						onEndReachedThreshold={0.1}
						onEndReached={fetchMoreMovies}
						refreshControl={false}
					/>
				)}
			</SafeAreaView>
		</DiscoverContext.Provider>
	)
}

export default DiscoverScreen

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: colors.background,
		marginTop: Platform.OS === 'android' ? 24 : 0,
	},
	masonryListContainer: { marginHorizontal: margins.side },
})
