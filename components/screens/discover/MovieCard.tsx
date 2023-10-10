import { View, Image, Text, StyleSheet } from 'react-native'
import { IOMDBMovie } from '../../../constants/types'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../../../constants/styles'
import { formatYear } from '../../../utils'

interface Props {
	item: IOMDBMovie
	index: number
}

export default function MovieCard({ item, index }: Props) {
	let isEven = index % 2 === 0
	const year = formatYear(item.Year)

	return (
		<View
			style={[
				style.container,
				{ paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 },
			]}
		>
			<Image
				source={{ uri: item.Poster }}
				style={[style.poster, { height: index % 3 === 0 ? hp(25) : hp(30) }]}
				resizeMode='cover'
			/>
			<Text style={style.title}>
				{item.Title}
				<Text style={style.year}> ({year})</Text>
			</Text>
		</View>
	)
}

const style = StyleSheet.create({
	container: {
		width: '100%',
		marginBottom: 20,
	},
	poster: {
		backgroundColor: colors.placeholder,
		borderRadius: 20,
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
