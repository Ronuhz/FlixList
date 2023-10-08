import { Text, StyleSheet } from 'react-native'
import { colors } from '../../constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../../constants/styles'

export default function UserScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={globalStyles.sectionTitle}>User</Text>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.background },
})
