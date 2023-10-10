import {
	StyleSheet,
	SafeAreaView,
	Platform,
	ScrollView,
	RefreshControl,
} from 'react-native'
import Upcoming from '../../components/screens/home/Upcoming'
import Trending from '../../components/screens/home/Trending'
import { colors } from '../../constants/styles'
import { useState } from 'react'

export default function HomeScreen() {
	const [refreshing, setRefreshing] = useState(false)

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => {
							setRefreshing(true)
							setTimeout(() => {
								setRefreshing(false)
								console.log('refresh')
							}, 2000)
						}}
					/>
				}
			>
				<Upcoming />
				<Trending />
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: Platform.OS === 'android' ? 24 : 0,
		backgroundColor: colors.background,
		flex: 1,
	},
})
