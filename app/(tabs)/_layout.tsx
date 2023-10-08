import { Tabs } from 'expo-router'
import { colors } from '../../constants/colors'
import { FontAwesome, Entypo } from '@expo/vector-icons'

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name']
	color: string
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
	return (
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
						<TabBarIcon name='play-circle' color={color} />
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
	)
}
