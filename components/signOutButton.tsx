import { useAuth } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { Pressable, Text } from 'react-native'

const SignOutButton = () => {
	const { isLoaded, signOut } = useAuth()

	if (!isLoaded) {
		return
	}

	const onSignOut = async () => {
		signOut()
		router.push('/(tabs)/')
	}

	return (
		<Pressable onPress={onSignOut}>
			<Text style={{ color: 'red', fontSize: 24 }}>Sign out</Text>
		</Pressable>
	)
}

export default SignOutButton
