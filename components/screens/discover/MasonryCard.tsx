import { colors } from '@/constants/styles'
import { TMDBSearch } from '@/constants/types'
import { formatYear } from '@/utils'
import { Image, StyleSheet, Text, View } from 'react-native'

// TODO: Switch from online image to local asset
const IMAGE_NOT_FOUND =
	'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'

type Props = { item: TMDBSearch; index: number }

const MasonryCard = ({ item, index }: Props) => {
	const year = formatYear(item.release_date || item.first_air_date || '')

	return (
		<View
			style={[
				styles.container,
				index % 2 === 0 ? { marginRight: 5 } : { marginLeft: 5 },
			]}
		>
			<Image
				source={{
					uri: item.poster_path
						? `https://image.tmdb.org/t/p/w300/${item.poster_path}.jpg`
						: IMAGE_NOT_FOUND,
				}}
				style={[styles.poster]}
				resizeMode='cover'
			/>
			<Text style={styles.title}>
				{item.name || item.title}
				{year && <Text style={styles.year}> ({year})</Text>}
			</Text>
		</View>
	)
}

export default MasonryCard

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	poster: {
		backgroundColor: colors.placeholder,
		borderRadius: 20,
		width: '100%',
		height: undefined,
		aspectRatio: 0.75,
	},
	title: {
		color: '#fff',
		fontSize: 16,
		fontFamily: 'Lato-Regular',
		marginTop: 4,
		gap: 10,
	},
	year: {
		color: colors.mutedForeground,
	},
})
