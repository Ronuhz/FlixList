import { Entypo, FontAwesome } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { colors } from '../../constants/styles'

export default function TabLayout() {
	return (
		<>
			<StatusBar style='auto' />
			<Tabs
				screenOptions={{
					tabBarStyle: {
						backgroundColor: colors.background,
						borderTopColor: colors.background,
					},
					tabBarActiveTintColor: colors.primary,
					tabBarShowLabel: false,
				}}
			>
				<Tabs.Screen
					name='index'
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<Entypo
								name='home'
								color={color}
								size={28}
								style={{ marginBottom: -3 }}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='discover'
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<FontAwesome
								name='search'
								color={color}
								size={28}
								style={{ marginBottom: -3 }}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='user'
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<FontAwesome
								name='user'
								color={color}
								size={28}
								style={{ marginBottom: -3 }}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	)
}
