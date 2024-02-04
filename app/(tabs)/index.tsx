import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import {
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
} from 'react-native'
import OnTheAirTvShows from '../../components/screens/home/OnTheAirTvShows'
import PopularMovies from '../../components/screens/home/PopularMovies'
import TvShows from '../../components/screens/home/TvShows'
import { colors } from '../../constants/styles'

export default function HomeScreen() {
	const [queryClient] = useState(() => new QueryClient())
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
				<QueryClientProvider client={queryClient}>
					<PopularMovies />
					<OnTheAirTvShows />
					<TvShows />
				</QueryClientProvider>
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
