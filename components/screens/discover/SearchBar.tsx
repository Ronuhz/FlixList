import { useEffect } from 'react'
import { TextInput, View, StyleSheet, Platform } from 'react-native'
import { IOMDBMovie } from '../../../constants/types'
import { Feather } from '@expo/vector-icons'
import { colors } from '../../../constants/colors'
import fetchSearchedMovies from './fetchSearchedMovies'

interface Props {
	query: string
	page: number
	setQuery: React.Dispatch<React.SetStateAction<string>>
	setPage: React.Dispatch<React.SetStateAction<number>>
	setMovies: React.Dispatch<React.SetStateAction<IOMDBMovie[]>>
}

export default function SearchBar({
	query,
	setQuery,
	page,
	setPage,
	setMovies,
}: Props) {
	// Debouncing search
	useEffect(() => {
		setPage(1) // resets the page to 1

		const timeoutId = setTimeout(() => {
			fetchSearchedMovies(query, page).then((movies: IOMDBMovie[]) => {
				setMovies(movies)
			})
		}, 500)

		return () => clearTimeout(timeoutId)
	}, [query])
	return (
		<>
			<View style={styles.searchBar}>
				<Feather name='search' size={24} color='white' />
				<TextInput
					style={styles.searchBarInput}
					value={query}
					onChangeText={setQuery}
					placeholder='Sherlock Holmes'
					placeholderTextColor='#BBB'
					onKeyPress={() => {}}
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	searchBar: {
		backgroundColor: colors.secondary,
		borderRadius: 20,
		marginHorizontal: 24,
		paddingHorizontal: 14,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	searchBarInput: {
		flex: 1,
		fontSize: 16,
		marginVertical: Platform.OS === 'ios' ? 16 : 12,
		color: '#fff',
	},
})
