import { memo } from 'react'
import { Image, Text, StyleSheet, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../constants/styles'

interface Props {
	index: number
	title: string
	poster: string
	releaseDate: string
}

function HorizontalCard({ index, title, poster, releaseDate }: Props) {
	return (
		<View style={styles.card}>
			<Image
				style={styles.cardImage}
				source={{
					uri: `https://image.tmdb.org/t/p/w500/${poster}`,
				}}
			/>

			<BlurView style={styles.titleContainer} tint='dark'>
				<Text style={styles.title}>{title}</Text>
			</BlurView>
			<BlurView style={styles.releaseDateContainer} tint='dark'>
				<Text style={styles.releaseDate}>Release: {releaseDate}</Text>
			</BlurView>
		</View>
	)
}

export default memo(HorizontalCard)

const styles = StyleSheet.create({
	card: {
		width: hp(40),
		height: hp(26),
		alignSelf: 'center',
	},
	cardImage: {
		flex: 1,
		borderRadius: 30,
		backgroundColor: colors.placeholder,
	},
	titleContainer: {
		position: 'absolute',
		alignSelf: 'center',
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 20,
		overflow: 'hidden',
		bottom: 10,
		maxWidth: 300,
	},
	title: { color: '#fff', fontFamily: 'Lato-Regular', fontSize: 18 },
	releaseDateContainer: {
		position: 'absolute',
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 20,
		overflow: 'hidden',
		top: 10,
		right: 12,
	},
	releaseDate: { color: '#fff', fontFamily: 'Lato-Regular', fontSize: 18 },
})
