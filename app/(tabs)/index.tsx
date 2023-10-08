import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../constants/colors'
import Upcoming from '../../components/screens/home/Upcoming'
import Trending from '../../components/screens/home/Trending'

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Upcoming />
			<Trending />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		flex: 1,
	},
})
