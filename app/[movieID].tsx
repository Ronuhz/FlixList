import {
	View,
	Text,
	Image,
	ActivityIndicator,
	StyleSheet,
	Pressable,
	ImageBackground,
} from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useEffect, useState } from 'react'
import { colors, margins } from '../constants/styles'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { TMDBMovieDetails } from '../constants/types'
import { BlurView } from 'expo-blur'
import { ScrollView } from 'react-native-gesture-handler'

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
	const { movieID: id, poster } = useLocalSearchParams()

	const [posterLoading, setPosterLoading] = useState(false)
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

			<ImageBackground
				source={{ uri: `https://image.tmdb.org/t/p/original/${poster}` }}
				resizeMode='cover'
				style={styles.backgroundImage}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<BlurView tint='dark' intensity={90} style={styles.blurContainer}>
						{/* Upper Row */}
						<View style={styles.upperRowContainer}>
							<View style={styles.voteAverageContainer}>
								<Text style={styles.voteAverage}>
									IMDB {details?.vote_average.toFixed(1)}
								</Text>
							</View>

							<Text
								style={styles.voteCount}
							>{`(${details?.vote_count} votes)`}</Text>
						</View>

						<Text style={styles.title}>{details?.title}</Text>

						{/* Genres */}
						<ScrollView
							horizontal
							bounces={false}
							contentContainerStyle={styles.genreScrollViewContainer}
						>
							{details?.genres.map((genre) => (
								<View key={genre.id} style={styles.genreContainer}>
									<Text style={styles.genreName}>{genre.name}</Text>
								</View>
							))}
						</ScrollView>

						{/* Body */}
						<Text style={styles.overview}>{details?.overview}</Text>
					</BlurView>
				</ScrollView>
			</ImageBackground>
		</View>
	)
}

export default details

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: wp(100),
		height: hp(66),
	},
	blurContainer: {
		flexGrow: 1,
		overflow: 'hidden',
		marginTop: hp(62),
		paddingHorizontal: margins.side,
		// borderTopLeftRadius: 32,
		// borderTopRightRadius: 32,
		borderRadius: 32,
		paddingBottom: 30,
	},
	upperRowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
		marginVertical: hp(1.5),
	},
	voteAverageContainer: {
		backgroundColor: '#FFD700',
		borderRadius: 16,
		paddingVertical: 6,
		paddingHorizontal: 10,
	},
	voteAverage: {
		alignSelf: 'center',
		fontSize: hp(1.7),
		fontWeight: 'bold',
	},
	voteCount: { fontSize: hp(1.8), color: colors.mutedForeground },
	title: {
		color: '#fff',
		fontFamily: 'Lato-Regular',
		fontSize: hp(3.4),
		marginBottom: hp(1.4),
	},
	genreScrollViewContainer: {
		flexDirection: 'row',
		gap: 8,
		marginBottom: hp(1.5),
	},
	genreContainer: {
		backgroundColor: '#3D3D3D',
		borderRadius: 16,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	genreName: {
		alignSelf: 'center',
		fontSize: hp(1.7),
		fontWeight: 'bold',
		color: colors.mutedForeground,
	},
	overview: {
		color: '#fff',
		fontSize: hp(2),
		fontWeight: '200',
	},
	container: { flex: 1, backgroundColor: colors.background },
})
