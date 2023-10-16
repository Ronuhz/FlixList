import {
	View,
	Text,
	Image,
	ActivityIndicator,
	StyleSheet,
	Pressable,
} from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useEffect, useState } from 'react'
import { colors } from '../constants/styles'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { TMDBMovieDetails } from '../constants/types'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

const fetchDetails = async (id: string) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}`,
			{
				headers: { Authorization: process.env.EXPO_PUBLIC_API_KEY },
			}
		)

		return response.data
	} catch (error) {
		console.error('Error while fetching movie/series details: ', error)
	}
}

const details = () => {
	const [posterLoading, setPosterLoading] = useState(false)
	const { movieID: id, poster } = useLocalSearchParams()
	const [details, setDetails] = useState<TMDBMovieDetails>()

	const { back } = useRouter()

	useEffect(() => {
		fetchDetails(id as string).then((data) => setDetails(data))
	}, [])

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerTransparent: true,
					headerTitle: '',
					animation: 'slide_from_right',
					headerLeft: (props) => {
						return (
							<Pressable onPress={back}>
								<BlurView
									tint='dark'
									intensity={40}
									style={{
										borderRadius: 60,
										overflow: 'hidden',
										width: hp(4.6),
										height: hp(4.6),
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Ionicons
										name='ios-chevron-back'
										size={hp(4.2)}
										color='#fff'
									/>
								</BlurView>
							</Pressable>
						)
					},
				}}
			/>

			{/* Poster */}
			<View style={{ width: wp(100), height: hp(30) }}>
				<Image
					style={{ flex: 1 }}
					resizeMode='cover'
					source={{ uri: `https://image.tmdb.org/t/p/original/${poster}` }}
					loadingIndicatorSource={{
						uri: `https://subzfresh.com/wp-content/uploads/2022/04/apple_158989157.jpg`,
					}}
					onLoadStart={() => setPosterLoading(true)}
					onLoadEnd={() => setPosterLoading(false)}
				/>
				{posterLoading && (
					<ActivityIndicator
						style={{
							position: 'absolute',
							right: '50%',
							bottom: '40%',
							transform: [{ translateX: 10 }],
						}}
					/>
				)}
			</View>

			<Text style={{ color: '#fff', fontSize: 32 }}>{details?.title}</Text>
		</View>
	)
}

export default details

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.background },
})
