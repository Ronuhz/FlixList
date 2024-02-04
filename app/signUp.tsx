import { useSignUp } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { CodeField, Cursor } from 'react-native-confirmation-code-field'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ErrorText from '../components/ErrorText'
import { colors, margins } from '../constants/styles'
import { SignUpError } from '../constants/types'

const CELL_COUNT = 6

const SignUpScreen = () => {
	const { isLoaded, signUp, setActive } = useSignUp()

	const [username, setUsername] = useState('')
	const [emailAddress, setEmailAddress] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [pendingVerification, setPendingVerification] = useState(false)
	const [code, setCode] = useState('')

	const [errors, setErrors] = useState<SignUpError[]>()

	const onSignUpPress = async () => {
		if (!isLoaded) {
			return
		}

		try {
			await signUp.create({
				username,
				emailAddress,
				password,
			})

			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

			setPendingVerification(true)
		} catch (err: any) {
			setErrors(err.errors)
			console.log(JSON.stringify(err, null, 2))
		} finally {
			if (password != passwordConfirm) {
				setErrors((prev) => [
					...(prev ?? []),
					{
						code: 'form_param_nil',
						message: 'Passwords do not match.',
						longMessage: 'Passwords do not match.',
						meta: { paramName: 'password_confirm' },
					},
				])

				return
			}
		}
	}

	const onPressVerify = async () => {
		if (!isLoaded) {
			return
		}

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			})

			await setActive({ session: completeSignUp.createdSessionId })

			if (router.canGoBack()) {
				router.back()
			} else {
				router.push('/(tabs)/')
			}
		} catch (err: any) {
			setErrors(err.errors)
			console.error(JSON.stringify(err, null, 2))
		}
	}

	return (
		<View style={styles.container}>
			{!pendingVerification && (
				<>
					{/* HEADER */}
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

					{/* INPUT FIELDS */}
					<View style={{ gap: 12 }}>
						<View>
							<TextInput
								style={styles.input}
								autoCapitalize='none'
								value={username}
								placeholder='Username...'
								placeholderTextColor={colors.mutedForeground}
								onChangeText={(username) => setUsername(username)}
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
							/>
							{errors?.map(
								(error, index) =>
									error.meta.paramName === 'password' && (
										<ErrorText key={index} errorMessage={error.message} />
									)
							)}
						</View>

						<View>
							<TextInput
								style={styles.input}
								autoCapitalize='none'
								value={passwordConfirm}
								placeholder='Confirm password'
								placeholderTextColor={colors.mutedForeground}
								secureTextEntry={true}
								onChangeText={(passwordConfirm) =>
									setPasswordConfirm(passwordConfirm)
								}
							/>
							{errors?.map(
								(error, index) =>
									error.meta.paramName === 'password_confirm' && (
										<ErrorText key={index} errorMessage={error.message} />
									)
							)}
						</View>

						<Pressable onPress={onSignUpPress} style={styles.signUpButton}>
							<Text style={styles.signUpButtonText}>Sign up</Text>
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
				</>
			)}

			{pendingVerification && (
				<>
					{/* HEADER */}
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginVertical: hp(1.5),
							justifyContent: 'flex-end',
						}}
					>
						<Pressable
							onPress={() => router.push('/(tabs)/')}
							style={{
								backgroundColor: colors.mutedBackground,
								borderRadius: 60,
								padding: 2,
							}}
						>
							<Ionicons name='close' size={hp(3.5)} color='#fff' />
						</Pressable>
					</View>

					{/* BODY */}
					<View style={{ alignItems: 'center', gap: 24 }}>
						<View style={{ alignItems: 'center', gap: 8 }}>
							<Text style={styles.title}>Verify Your Email</Text>
							<Text style={{ color: colors.mutedForeground }}>
								A 6-digit code has been sent to{' '}
								<Text style={{ fontWeight: 'bold', color: 'white' }}>
									{emailAddress}
								</Text>
							</Text>
						</View>

						<View>
							<CodeField
								value={code}
								onChangeText={setCode}
								cellCount={CELL_COUNT}
								keyboardType='number-pad'
								textContentType='oneTimeCode'
								renderCell={({ index, symbol, isFocused }) => (
									<Text
										key={index}
										style={[styles.cell, isFocused && styles.focusCell]}
									>
										{symbol || (isFocused ? <Cursor /> : null)}
									</Text>
								)}
							/>
							{errors?.map(
								(error, index) =>
									error.meta.paramName === 'code' && (
										<ErrorText key={index} errorMessage={error.longMessage} />
									)
							)}
						</View>

						<Pressable
							onPress={onPressVerify}
							style={[styles.signUpButton, { width: '100%' }]}
						>
							<Text style={styles.signUpButtonText}>Verify</Text>
						</Pressable>
					</View>
				</>
			)}
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
	cell: {
		width: hp(6.5),
		height: hp(6.5),
		fontSize: 26,
		borderWidth: 1,
		textAlign: 'center',
		backgroundColor: colors.secondary,
		borderRadius: 12,
		color: '#fff',
		lineHeight: 45,
	},
	focusCell: {
		borderColor: colors.primary,
	},
})

export default SignUpScreen
