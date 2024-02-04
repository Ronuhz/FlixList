import { useSignIn } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
	ActivityIndicator,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ErrorText from '../components/ErrorText'
import { colors, margins } from '../constants/styles'
import { SignUpError } from '../constants/types'

const signIn = () => {
	const { isLoaded, setActive, signIn } = useSignIn()

	const [emailAddress, setEmailAddress] = useState('')
	const [password, setPassword] = useState('')

	const [errors, setErrors] = useState<SignUpError[]>()
	const [isInputDisabled, setIsInputDisabled] = useState(false)

	const onSignInPress = async () => {
		if (!isLoaded) {
			return
		}

		setIsInputDisabled(true)

		try {
			const completeSignIn = await signIn.create({
				identifier: emailAddress,
				password,
			})

			await setActive({ session: completeSignIn.createdSessionId })

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
				<Text style={styles.title}>Sign in</Text>
				<Pressable
					onPress={() => router.replace('/(tabs)/')}
					style={{
						backgroundColor: colors.mutedBackground,
						borderRadius: 60,
						padding: 2,
					}}
				>
					<Ionicons name='close' size={hp(3.5)} color='#fff' />
				</Pressable>
			</View>

			<View style={{ gap: 12 }}>
				<View>
					<TextInput
						style={styles.input}
						autoCapitalize='none'
						value={emailAddress}
						placeholder='Email or username...'
						placeholderTextColor={colors.mutedForeground}
						onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
						editable={!isInputDisabled}
					/>
					{errors?.map(
						(error, index) =>
							error.meta.paramName === 'identifier' && (
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
					onPress={onSignInPress}
					style={styles.signUpButton}
					disabled={isInputDisabled}
				>
					{isInputDisabled ? (
						<ActivityIndicator />
					) : (
						<Text style={styles.signUpButtonText}>Sign in</Text>
					)}
				</Pressable>

				<View
					style={{ flexDirection: 'row', justifyContent: 'center', gap: 2 }}
				>
					<Text style={{ color: colors.mutedForeground }}>
						Don't have an account yet?
					</Text>
					<Pressable onPress={() => router.replace('/signUp')}>
						<Text style={{ color: 'white' }}>Sign up</Text>
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

export default signIn
