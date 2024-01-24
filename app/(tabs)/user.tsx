import { Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../constants/styles'
import { useEffect } from 'react'
import { SignedIn, useAuth, useUser } from '@clerk/clerk-expo'
import { usePathname, router, useNavigation, useRouter } from 'expo-router'
import SignOutButton from '../../components/signOutButton'

export default function UserScreen() {
	const { isLoaded, isSignedIn, user } = useUser()
	const pathname = usePathname()

	if (!isLoaded) {
		return
	}

	useEffect(() => {
		if (pathname === '/user' && !isSignedIn) router.push('/signUp')
	}, [pathname])

	return (
		<SafeAreaView style={styles.container}>
			<SignedIn>
				<Text style={{ color: 'white', fontSize: 32 }}>
					Welcome {user?.username}
				</Text>
				<SignOutButton />
			</SignedIn>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.background },
})
