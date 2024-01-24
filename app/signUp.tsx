import { useSignUp } from '@clerk/clerk-expo'
import { useState } from 'react'
import {
	Pressable,
	View,
	Text,
	StyleSheet,
	Platform,
	ActivityIndicator,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { colors, margins } from '../constants/styles'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { signUpError } from '../constants/types'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import ErrorText from '../components/errorText'

const SignUpScreen = () => {
	const { isLoaded, signUp, setActive } = useSignUp()

	const [username, setUsername] = useState('')
	const [emailAddress, setEmailAddress] = useState('')
	const [password, setPassword] = useState('')

	const [errors, setErrors] = useState<signUpError[]>()
	const [isInputDisabled, setIsInputDisabled] = useState(false)

	const onSignUpPress = async () => {
		if (!isLoaded) {
			return
		}

		setIsInputDisabled(true)

		try {
			const completeSignUp = await signUp.create({
				username,
				emailAddress,
				password,
			})
			await setActive({ session: completeSignUp.createdSessionId })

			if (router.canGoBack()) {
				router.back()
			} else {
				router.push('/(tabs)/')
			}
		} catch (err: any) {
			setErrors(err.errors)
			console.log(JSON.stringify(err, null, 2))
		} finally {
			setIsInputDisabled(false)
		}
	}

	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginVertical: hp(1.5),
					justifyContent: 'space-between',
				}}
			>
				<Text style={styles.title}>Sign up</Text>
				<Pressable
					onPress={() => router.push('/(tabs)/')}
					style={{
						backgroundColor: colors.mutedBackground,
						borderRadius: 60,
						padding: 2,
					}}
				>
					<Ionicons name='ios-close' size={hp(3.5)} color='#fff' />
				</Pressable>
			</View>

			<View style={{ gap: 12 }}>
				<View>
					<TextInput
						style={styles.input}
						autoCapitalize='none'
						value={username}
						placeholder='Username...'
						placeholderTextColor={colors.mutedForeground}
						onChangeText={(username) => setUsername(username)}
						editable={!isInputDisabled}
					/>
					{errors?.map(
						(error, index) =>
							error.meta.paramName === 'username' && (
								<ErrorText key={index} errorMessage={error.message} />
							)
					)}
				</View>
				<View>
					<TextInput
						style={styles.input}
						autoCapitalize='none'
						value={emailAddress}
						placeholder='Email...'
						placeholderTextColor={colors.mutedForeground}
						onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
						editable={!isInputDisabled}
					/>

					{errors?.map(
						(error, index) =>
							error.meta.paramName === 'email_address' && (
								<ErrorText key={index} errorMessage={error.message} />
							)
					)}
				</View>
				<View>
					<TextInput
						style={styles.input}
						autoCapitalize='none'
						value={password}
						placeholder='Password'
						placeholderTextColor={colors.mutedForeground}
						secureTextEntry={true}
						onChangeText={(password) => setPassword(password)}
						editable={!isInputDisabled}
					/>
					{errors?.map(
						(error, index) =>
							error.meta.paramName === 'password' && (
								<ErrorText key={index} errorMessage={error.message} />
							)
					)}
				</View>

				<Pressable
					onPress={onSignUpPress}
					style={styles.signUpButton}
					disabled={isInputDisabled}
				>
					{isInputDisabled ? (
						<ActivityIndicator />
					) : (
						<Text style={styles.signUpButtonText}>Sign up</Text>
					)}
				</Pressable>

				<View
					style={{ flexDirection: 'row', justifyContent: 'center', gap: 2 }}
				>
					<Text style={{ color: colors.mutedForeground }}>
						Already have an account?
					</Text>
					<Pressable onPress={() => router.replace('/signIn')}>
						<Text style={{ color: 'white' }}>Sign in</Text>
					</Pressable>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: margins.side,
		backgroundColor: colors.background,
		flex: 1,
		marginTop: Platform.OS === 'android' ? 20 : 0,
	},
	title: {
		fontSize: hp(4),
		fontWeight: 'bold',
		color: 'white',
	},
	input: {
		backgroundColor: colors.secondary,
		borderRadius: 20,
		paddingHorizontal: 14,
		flexDirection: 'row',
		alignItems: 'center',
		color: '#fff',
		padding: 16,
	},
	signUpButton: {
		backgroundColor: colors.primary,
		borderRadius: 36,
		paddingHorizontal: 14,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
	},
	signUpButtonText: {
		color: 'white',
		fontSize: hp(2.5),
		fontWeight: '600',
	},
})

export default SignUpScreen
