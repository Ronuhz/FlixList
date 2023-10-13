import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { colors } from '../../constants/styles'
import usePopular from '../../components/screens/home/usePopularMovies'
import { useCallback, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import useTvShows from '../../components/screens/home/useTvShows'
import useOnTheAirTvShows from '../../components/screens/home/useOnTheAirTvShows'

export default function HomeScreen() {
	const [refreshing, setRefreshing] = useState(false)
	const { PopularMovies, fetchPopularMovies } = usePopular()
	const { TvShows, fetchTvShows } = useTvShows()
	const { OnTheAirTvShows, fetchOnTheAirTvShows } = useOnTheAirTvShows()

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		fetchPopularMovies().finally(() =>
			fetchTvShows().finally(() =>
				fetchOnTheAirTvShows().finally(() => setRefreshing(false))
			)
		)
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				{PopularMovies}
				{OnTheAirTvShows}
				{TvShows}
			</ScrollView>
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
