import { useState, useEffect } from 'react'
import {
	TextInput,
	View,
	StyleSheet,
	Platform,
	ActivityIndicator,
} from 'react-native'
import { IOMDBMovie } from '../../../constants/types'
import { Feather } from '@expo/vector-icons'
import fetchSearchedMovies from './fetchSearchedMovies'
import { colors, margins } from '../../../constants/styles'
import CategorySelector from './CategorySelector'

interface Props {
	query: string
	setQuery: React.Dispatch<React.SetStateAction<string>>
	setMovies: React.Dispatch<React.SetStateAction<IOMDBMovie[]>>
}

export default function SearchBar({ query, setQuery, setMovies }: Props) {
	const [loading, setLoading] = useState(false)

	// Debouncing search
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setLoading(true)
			setMovies([])
			fetchSearchedMovies(query, 1)
				.then((movies: IOMDBMovie[]) => {
					setMovies(movies)
					setLoading(false)
				})
				.catch((error) =>
					console.error('Something went wrong during search debounce: ', error)
				)
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
				/>
			</View>
			<CategorySelector />
			{loading && <ActivityIndicator size={'large'} style={styles.spinner} />}
		</>
	)
}

const styles = StyleSheet.create({
	searchBar: {
		backgroundColor: colors.secondary,
		borderRadius: 20,
		marginHorizontal: margins.side,
		paddingHorizontal: 14,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		gap: 16,
	},
	searchBarInput: {
		flex: 1,
		fontSize: 16,
		marginVertical: Platform.OS === 'ios' ? 16 : 12,
		color: '#fff',
		height: '100%',
	},
	spinner: {
		marginVertical: 20,
	},
})
