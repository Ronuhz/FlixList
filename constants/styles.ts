import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const colors = {
	background: '#15141F',
	// background: '#111111',
	// background: 'black',
	primary: 'darkorange',
	secondary: '#211F30',
	mutedForeground: '#BCBCBC',
	mutedBackground: '#333333',
	placeholder: '#1a1b26',
}

export const margins = {
	side: 20,
}

export const globalStyles = StyleSheet.create({
	sectionTitle: {
		fontFamily: 'Lato-Regular',
		color: '#fff',
		fontSize: hp(3.3),
		marginBottom: hp(1.5),
	},
})
