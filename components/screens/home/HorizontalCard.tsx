import { colors, mediaCards } from '@/constants/styles'
import { MediaCardProps } from '@/constants/types'
import { getMovieGenreById } from '@/utils'
import { Link } from 'expo-router'
import { StyleSheet, View, Image, Text } from 'react-native'
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const HorizontalCard = ({
	href,
	backdrop_path,
	title,
	genre_ids,
}: MediaCardProps) => {
	const formattedTitle = title.length > 35 ? title.slice(0, 35) + '...' : title

	return (
		<Link href={href as never}>
			<View style={{ gap: 6 }}>
				<Image
					style={styles.coverImage}
					resizeMode='cover'
					source={{
						uri: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
					}}
				/>
				<Text style={mediaCards.title}>{formattedTitle}</Text>
				<Text style={mediaCards.genres}>{getMovieGenreById(genre_ids)}</Text>
			</View>
		</Link>
	)
}

const styles = StyleSheet.create({
	coverImage: {
		backgroundColor: colors.placeholder,
		borderRadius: 20,
		width: wp(85),
		height: hp(23),
		maxWidth: 350,
	},
})

export default HorizontalCard
