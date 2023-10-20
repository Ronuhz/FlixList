import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { colors } from '../../constants/styles'
import { useCallback, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import PopularMovies from '../../components/screens/home/PopularMovies'
import { useQueryClient } from '@tanstack/react-query'
import OnTheAirTvShows from '../../components/screens/home/OnTheAirTvShows'
import TvShows from '../../components/screens/home/TvShows'

export default function HomeScreen() {
	const [refreshing, setRefreshing] = useState(false)
	const queryClient = useQueryClient()

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
		marginTop: Platform.OS === 'android' ? 24 : 0,
		backgroundColor: colors.background,
		flex: 1,
	},
})
