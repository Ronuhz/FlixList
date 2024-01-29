import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ImageBackground,
	Image,
	ScrollView,
} from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useEffect, useState } from 'react'
import { colors, margins } from '../constants/styles'
import axios from 'axios'
import { TMDBMovieDetails, TMDBSeriesDetails } from '../constants/types'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'

const fetchDetails = async (id: string, type: string = 'movie') => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/${type}/${id}`,
			{
				headers: { Authorization: process.env.EXPO_PUBLIC_API_KEY },
			}
		)
		console.log(`Fetching ${type} details`)

		if (type === 'movie') {
			return response.data as TMDBMovieDetails
		} else return response.data as TMDBSeriesDetails
	} catch (error) {
		console.error(`Error while fetching ${type} details: `, error)
	}
}

const Details = () => {
	const { id, poster, type } = useLocalSearchParams()
	const { back } = useRouter()
	const [details, setDetails] = useState<
		TMDBMovieDetails | TMDBSeriesDetails | undefined
	>(undefined)

	useEffect(() => {
		fetchDetails(id as string, type as string).then((details) =>
			setDetails(details)
		)
	}, [])

	const isMovie = type === 'movie'

	const title = isMovie
		? (details as TMDBMovieDetails)?.title
		: (details as TMDBSeriesDetails)?.name

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerTransparent: true,
					headerTitle: '',
					headerLeft: (props) => {
						return (
							<Pressable
								onPress={back}
								style={{ left: -10, top: -10, padding: 20 }}
							>
								<Animated.View entering={FadeIn}>
									<BlurView
										experimentalBlurMethod='dimezisBlurView'
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
										<Ionicons name='chevron-back' size={hp(4.2)} color='#fff' />
									</BlurView>
								</Animated.View>
							</Pressable>
						)
					},
				}}
			/>

			<ImageBackground
				source={{
					uri: `https://image.tmdb.org/t/p/original/${poster}`,
				}}
				resizeMode='cover'
				style={styles.backgroundImage}
			>
				{details && (
					<ScrollView showsVerticalScrollIndicator={false} bounces={false}>
						<Animated.View entering={SlideInDown.springify().damping(18)}>
							<BlurView
								experimentalBlurMethod='dimezisBlurView'
								tint='dark'
								intensity={90}
								style={styles.blurContainer}
							>
								{/* Upper Row */}
								{isMovie && (
									<View style={styles.upperRowContainer}>
										{/* Rating */}
										<View style={styles.voteAverageContainer}>
											<Text style={styles.voteAverage}>
												TMDB{' '}
												{(details as TMDBMovieDetails)?.vote_average.toFixed(1)}
											</Text>
										</View>

										{/* Votes */}
										<Text style={styles.voteCount}>{`(${
											(details as TMDBMovieDetails)?.vote_count ?? ''
										} votes)`}</Text>
									</View>
								)}

								{/* Title */}
								<Text
									style={[styles.title, { marginTop: !isMovie ? hp(1.5) : 0 }]}
								>
									{title}
								</Text>

								{/* Genres */}
								{details.genres.length > 0 && (
									<ScrollView
										horizontal
										bounces={false}
										contentContainerStyle={styles.genreScrollViewContainer}
										showsHorizontalScrollIndicator={false}
									>
										{/* Genre Pills */}
										{details?.genres.map((genre, index) => (
											<View key={genre.id} style={styles.genreContainer}>
												<Text style={styles.genreName}>{genre.name}</Text>
											</View>
										))}
									</ScrollView>
								)}

								{/* Body */}
								<Text style={styles.overview}>{details?.overview}</Text>

								{/* Tv Show Exclusive */}
								{!isMovie && (
									<View>
										{/* Network */}
										{(details as TMDBSeriesDetails)?.networks.length > 0 && (
											<>
												<Text style={styles.networkTitle}>
													{`${
														(details as TMDBSeriesDetails)?.networks.length ===
														1
															? 'Network'
															: 'Networks'
													}`}
												</Text>
												<View style={styles.networkList}>
													{(details as TMDBSeriesDetails)?.networks.map(
														(network) => (
															<View
																key={network.id}
																style={styles.genreContainer}
															>
																<Text style={styles.genreName}>
																	{network.name}
																</Text>
															</View>
														)
													)}
												</View>
											</>
										)}

										{/* Seasons */}
										{(details as TMDBSeriesDetails)?.seasons.length > 0 && (
											<>
												<Text style={styles.seasonTitle}>Seasons</Text>
												<View style={{ gap: 8 }}>
													{(details as TMDBSeriesDetails)?.seasons.map(
														(season) => (
															<View key={season.id} style={styles.seasonCard}>
																<Text style={styles.seasonName}>
																	{season.name}
																</Text>
																{season.overview.length > 0 && (
																	<Text style={styles.seasonOverview}>
																		{season.overview}
																	</Text>
																)}
															</View>
														)
													)}
												</View>
											</>
										)}
									</View>
								)}
							</BlurView>
						</Animated.View>
					</ScrollView>
				)}
			</ImageBackground>
		</View>
	)
}

export default Details

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
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
		paddingBottom: 30,
	},
	upperRowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
		marginVertical: hp(1.5),
	},
	voteAverageContainer: {
		backgroundColor: '#1CB8D8',
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
	container: { flex: 1, backgroundColor: 'black' },
	networkTitle: {
		color: '#fff',
		fontFamily: 'Lato-Regular',
		fontSize: hp(3),
		marginVertical: hp(1),
	},
	networkList: {
		flexDirection: 'row',
		gap: 8,
	},
	seasonTitle: {
		color: '#fff',
		fontFamily: 'Lato-Regular',
		fontSize: hp(3),
		marginVertical: hp(1),
	},
	seasonCard: {
		borderRadius: 8,
		backgroundColor: colors.mutedBackground,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	seasonName: {
		color: '#fff',
		fontFamily: 'Lato-Regular',
		fontSize: hp(2.2),
		marginBottom: hp(1),
	},
	seasonOverview: {
		color: colors.mutedForeground,
		fontFamily: 'Lato-Regular',
		fontSize: hp(1.8),
	},
})
