import { ClerkProvider } from '@clerk/clerk-expo'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Platform } from 'react-native'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		'Lato-Regular': require('../assets/fonts/Lato/Lato-Regular.ttf'),
	})

	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) return null

	return <RootLayoutNav />
}

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key)
		} catch (err) {
			return null
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value)
		} catch (err) {
			return
		}
	},
}

function RootLayoutNav() {
	return (
		<ClerkProvider
			tokenCache={tokenCache}
			publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
		>
			<ThemeProvider value={DarkTheme}>
				<Stack>
					<Stack.Screen
						name='(tabs)'
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='signUp'
						options={{
							presentation: 'modal',
							headerShown: false,
							gestureEnabled: false,
							animation: Platform.OS === 'android' ? 'none' : 'default',
						}}
					/>

					<Stack.Screen
						name='signIn'
						options={{
							presentation: 'modal',
							headerShown: false,
							gestureEnabled: false,
							animation: Platform.OS === 'android' ? 'none' : 'default',
						}}
					/>
					<Stack.Screen name='[id]' />
				</Stack>
			</ThemeProvider>
		</ClerkProvider>
	)
}
