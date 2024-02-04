import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const ErrorText = ({ errorMessage }: { errorMessage: string }) => {
	return (
		<Animated.Text
			entering={FadeIn}
			exiting={FadeOut}
			style={{ color: 'red', marginTop: hp(0.2) }}
		>
			{errorMessage.replace('Please try another.', '')}
		</Animated.Text>
	)
}

export default ErrorText
