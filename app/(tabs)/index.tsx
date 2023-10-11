import {
	StyleSheet,
	SafeAreaView,
	Platform,
	Text,
	View,
	Image,
	Pressable,
} from 'react-native'
import Upcoming from '../../components/screens/home/Upcoming'
import Trending from '../../components/screens/home/Trending'
import { colors, globalStyles, margins } from '../../constants/styles'
import { FlatList } from 'react-native-gesture-handler'
import { trendingData } from '../../constants/data'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { getMovieGenreById } from '../../utils'

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={globalStyles.sectionTitle}>Popular movies</Text>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={trendingData}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{
					marginHorizontal: margins.side,
					gap: 10,
					paddingRight: 38,
				}}
				renderItem={({ item, index }) => (
					<Pressable style={{ gap: 6 }}>
						<Image
							style={{
								backgroundColor: colors.placeholder,
								borderRadius: 20,
								width: wp(85),
								height: hp(23),
							}}
							resizeMode='cover'
							source={{
								uri: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
							}}
						/>
						<Text
							style={{
								color: '#fff',
								fontFamily: 'Lato-Regular',
								fontSize: hp(2.3),
								fontWeight: '600',
								marginLeft: 2,
							}}
						>
							{item.title}
						</Text>
						<Text
							style={{
								color: colors.mutedForeground,
								fontFamily: 'Lato-Regular',
								fontSize: hp(1.5),
								marginLeft: 2,
							}}
						>
							{getMovieGenreById(item.genre_ids)}
						</Text>
					</Pressable>
				)}
			/>
			{/* <Upcoming />
			<Trending /> */}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		marginTop: Platform.OS === 'android' ? 24 : 0,
		backgroundColor: colors.background,
		flex: 1,
	},
})
