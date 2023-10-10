import { memo } from 'react'
import { BlurView } from 'expo-blur'
import { Text, StyleSheet, Image, View, Platform } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Link } from 'expo-router'
import { colors } from '../constants/styles'

interface Props {
	index: number
	title: string
	poster: string
	id: number
}

const BigCard = ({ index, title, poster, id }: Props) => {
	return (
		<Link href={{ pathname: '/[id]', params: { id } }}>
			<View style={styles.card}>
				<Image
					style={styles.cardImage}
					source={{
						uri: `https://image.tmdb.org/t/p/w400/${poster}`,
					}}
				/>
				<BlurView style={styles.titleContainer} tint='dark'>
					<Text style={styles.title}>{title}</Text>
				</BlurView>
			</View>
		</Link>
	)
}

const styles = StyleSheet.create({
	card: {
		width: Platform.OS === 'ios' ? hp(26) : hp(30),
		height: Platform.OS === 'ios' ? hp(40) : hp(45),
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

export default memo(BigCard)
