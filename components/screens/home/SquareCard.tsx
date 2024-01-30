import { colors, mediaCards } from '@/constants/styles'
import { MediaCardProps } from '@/constants/types'
import { getTVShowGenreById } from '@/utils'
import { Link } from 'expo-router'
import { View, Image, Text, StyleSheet } from 'react-native'
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const SquareCard = ({
	href,
	title,
	backdrop_path,
	genre_ids,
}: MediaCardProps) => {
	const formattedTitle = title.length > 15 ? title.slice(0, 15) + '...' : title
	const convertedGenres = getTVShowGenreById(genre_ids)
	const genres =
		convertedGenres.length > 24
			? convertedGenres.slice(0, 24) + '...'
			: convertedGenres

	return (
		<Link href={href as never}>
			<View style={{ gap: 6 }}>
				<Image
					style={styles.coverImage}
					resizeMode='cover'
					source={{
						uri: `https://image.tmdb.org/t/p/w500/${backdrop_path}`,
					}}
				/>
				<Text style={mediaCards.title}>{formattedTitle}</Text>
				<Text style={mediaCards.genres}>{genres}</Text>
			</View>
		</Link>
	)
}

const styles = StyleSheet.create({
	coverImage: {
		height: hp(20),
		width: hp(20),
		borderRadius: 20,
		backgroundColor: colors.placeholder,
	},
})

export default SquareCard
