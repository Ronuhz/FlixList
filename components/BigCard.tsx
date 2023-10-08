import { BlurView } from 'expo-blur'
import { View, Text, StyleSheet, Image } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, { FadeIn } from 'react-native-reanimated'
import { colors } from '../constants/colors'

interface Props {
	index: number
	title: string
	poster: string
}

const BigCard = ({ index, title, poster }: Props) => {
	return (
		<Animated.View style={styles.card} entering={FadeIn.delay(index * 80)}>
			<Image
				style={styles.cardImage}
				source={{
					uri: `https://image.tmdb.org/t/p/w400/${poster}`,
				}}
			/>
			<BlurView style={styles.titleContainer} tint='dark'>
				<Text style={styles.title}>{title}</Text>
			</BlurView>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	card: {
		width: hp(26),
		height: hp(40),
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
		maxWidth: 190,
	},
	title: {
		color: '#fff',
		fontFamily: 'Lato-Regular',
		fontSize: 18,
	},
})

export default BigCard
