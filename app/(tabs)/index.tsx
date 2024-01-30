import {
	StyleSheet,
	SafeAreaView,
	RefreshControl,
	ScrollView,
} from 'react-native'
import { colors } from '../../constants/styles'
import { useCallback, useState } from 'react'
import PopularMovies from '../../components/screens/home/PopularMovies'
import { useQueryClient } from '@tanstack/react-query'
import OnTheAirTvShows from '../../components/screens/home/OnTheAirTvShows'
import TvShows from '../../components/screens/home/TvShows'

export default function HomeScreen() {
	const queryClient = useQueryClient()
	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = useCallback(async () => {
		setRefreshing(true)
		await queryClient
			.invalidateQueries({ queryKey: ['home'] })
			.finally(() => setRefreshing(false))
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<PopularMovies />
				<OnTheAirTvShows />
				<TvShows />
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		backgroundColor: colors.background,
		flex: 1,
	},
})
