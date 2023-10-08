import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const globalStyles = StyleSheet.create({
	sectionTitle: {
		fontFamily: 'Lato-Regular',
		color: '#fff',
		fontSize: hp(3.3),
		marginBottom: 20,
		marginHorizontal: 24,
	},
})
