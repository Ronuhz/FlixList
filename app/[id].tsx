import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const details = () => {
	const { id } = useLocalSearchParams()

	return (
		<View style={{ flex: 1 }}>
			<Text style={{ color: '#fff', fontSize: 32 }}>{id}</Text>
		</View>
	)
}

export default details
