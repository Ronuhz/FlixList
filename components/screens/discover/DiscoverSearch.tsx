import { colors } from '@/constants/styles'
import DiscoverContext from '@/contexts/discover'
import { Feather } from '@expo/vector-icons'
import { useContext } from 'react'
import { Platform, StyleSheet, TextInput, View } from 'react-native'
import CategoryTab from './CategoryTab'

const DiscoverSearch = () => {
	const { query, category, setQuery, setCategory } = useContext(DiscoverContext)

	return (
		<>
			<View style={styles.searchBar}>
				<Feather name='search' size={24} color='white' />
				<TextInput
					style={styles.searchBarInput}
					value={query}
					onChangeText={setQuery}
					placeholder='Search for a movie or series...'
					placeholderTextColor={colors.mutedForeground}
				/>
			</View>
			<View style={{ flexDirection: 'row', gap: 12 }}>
				<CategoryTab
					setCategory={setCategory}
					selectedCategory={category}
					category='All'
				/>
				<CategoryTab
					setCategory={setCategory}
					selectedCategory={category}
					category='Movies'
				/>
				<CategoryTab
					setCategory={setCategory}
					selectedCategory={category}
					category='Tv Series'
				/>
			</View>
		</>
	)
}

export default DiscoverSearch

const styles = StyleSheet.create({
	searchBar: {
		backgroundColor: colors.secondary,
		borderRadius: 20,
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
