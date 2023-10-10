import { Text, StyleSheet, Platform, SafeAreaView } from 'react-native'
import { colors, globalStyles, margins } from '../../constants/styles'
import { useState, useContext } from 'react'
import { IOMDBMovie } from '../../constants/types'
import SearchBar from '../../components/screens/discover/SearchBar'
import fetchSearchedMovies from '../../components/screens/discover/fetchSearchedMovies'
import MasonryList from '@react-native-seoul/masonry-list'
import MovieCard from '../../components/screens/discover/MovieCard'
import { DiscoverContext } from '../../contexts/discover'

function DiscoverScreen() {
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(2)
	const [query, setQuery] = useState('Avengers')
	const [movies, setMovies] = useState<IOMDBMovie[]>([])

	const fetchMoreMovie = () => {
		if (loading) return

		setLoading(true)
		fetchSearchedMovies(query, page).then((movies: IOMDBMovie[]) => {
			setLoading(false)

			if (!movies || movies.length === 0) return

			setMovies((prev) => [...prev, ...movies])
			setPage((prev) => prev + 1)
		})
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={[globalStyles.sectionTitle, styles.title]}>
				Find Movies, Tv series, and more..
			</Text>
			<SearchBar query={query} setQuery={setQuery} setMovies={setMovies} />

			{!movies || (
				<MasonryList
					data={movies}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.masonryListContainer}
					renderItem={({ item, i }) => (
						<MovieCard index={i} item={item as IOMDBMovie} />
					)}
					onEndReachedThreshold={0.1}
					onEndReached={fetchMoreMovie}
					refreshControl={false}
				/>
			)}
		</SafeAreaView>
	)
}

export default DiscoverScreen

const styles = StyleSheet.create({
	title: { maxWidth: 283, marginTop: Platform.OS === 'android' ? 24 : 0 },
	container: {
		flexGrow: 1,
		backgroundColor: colors.background,
	},
	masonryListContainer: { marginHorizontal: margins.side },
})
