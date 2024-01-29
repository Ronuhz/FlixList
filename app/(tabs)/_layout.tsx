import { Tabs } from 'expo-router'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { colors } from '../../constants/styles'
import { StatusBar } from 'expo-status-bar'

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name']
	color: string
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
	return (
		<>
			<StatusBar backgroundColor={colors.background} />
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
							<TabBarIcon name='search' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='user'
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
					}}
				/>
			</Tabs>
		</>
	)
}
