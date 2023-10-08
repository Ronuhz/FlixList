import { Text, StyleSheet, Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../constants/colors'
import { globalStyles } from '../../constants/styles'
import { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { IOMDBMovie } from '../../constants/types'
import SearchBar from '../../components/screens/discover/SearchBar'
import fetchSearchedMovies from '../../components/screens/discover/fetchSearchedMovies'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function DiscoverScreen() {
	const [page, setPage] = useState(1)
	const [query, setQuery] = useState('What')
	const [movies, setMovies] = useState<IOMDBMovie[]>([])

	const fetchMoreMovie = () => {
		setPage((prev) => prev + 1)
		fetchSearchedMovies(query, page).then((movies: IOMDBMovie[]) => {
			if (!movies || movies.length === 0) return

			setMovies((prev) => (!prev ? movies : prev.concat(movies)))
		})
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={[globalStyles.sectionTitle, { maxWidth: 283 }]}>
				Find Movies, Tv series, and more.. {page}
			</Text>
			<SearchBar
				page={page}
				setPage={setPage}
				query={query}
				setQuery={setQuery}
				setMovies={setMovies}
			/>
			<FlatList
				data={movies}
				contentContainerStyle={{
					flexGrow: 1,
					marginHorizontal: 24,
					marginTop: 20,
					gap: 20,
				}}
				renderItem={({ item, index }) => (
					<View
						style={{
							width: hp(20),
							height: hp(35),
						}}
					>
						<Image
							source={{ uri: item.Poster }}
							style={{
								flex: 1,
								backgroundColor: colors.placeholder,
								borderRadius: 20,
							}}
							resizeMode='cover'
						/>
						<Text
							style={{
								color: '#fff',
								fontSize: 16,
							}}
						>
							{item.Title}
						</Text>
					</View>
				)}
				onEndReachedThreshold={0.1}
				onEndReached={fetchMoreMovie}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: colors.background,
	},
})
