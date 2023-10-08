import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

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

function RootLayoutNav() {
	return (
		<ThemeProvider value={DarkTheme}>
			<Stack>
				<Stack.Screen
					name='(tabs)'
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</ThemeProvider>
	)
}
