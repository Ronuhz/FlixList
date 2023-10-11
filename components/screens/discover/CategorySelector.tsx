import {
	View,
	Text,
	Pressable,
	StyleSheet,
	Dimensions,
	LayoutChangeEvent,
} from 'react-native'
import { colors, margins } from '../../../constants/styles'
import { SetStateAction, useCallback, useContext, useState } from 'react'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { DiscoverContext } from '../../../contexts/discover'

const CATEGORIES = ['All', 'Movies', 'Tv Series']

interface TabProps {
	title: string
	activeCategory: string
	onTabPress: (tab: string) => void
	onLayout: (event: LayoutChangeEvent) => void
}

const Tab = ({ title, activeCategory, onTabPress, onLayout }: TabProps) => {
	const isActive = activeCategory === title

	return (
		<Pressable
			onLayout={onLayout}
			style={{
				gap: 4,
				marginRight: 24,
			}}
			onPress={() => onTabPress(title)}
		>
			<Text
				style={[
					styles.categoryTitle,
					{ color: isActive ? colors.primary : '#fff' },
				]}
			>
				{title}
			</Text>
		</Pressable>
	)
}

interface TabLayout {
	tab: string
	x: number
	y: number
	width: number
	height: number
}

const CategorySelector = () => {
	const [activeCategory, setActiveCategory] = useState('All')
	const [tabLayouts, setTabLayouts] = useState<TabLayout[]>([])
	const { setCategory } = useContext(DiscoverContext)

	const animatedStyle = useAnimatedStyle(() => {
		const layout = tabLayouts.find((layout) => layout.tab === activeCategory)
		return {
			transform: [{ translateX: withTiming(layout?.x || 0) }],
			width: withTiming(layout?.width ? layout?.width / 2 : 0),
		}
	})

	const onTabPress = useCallback((tab: string) => {
		setActiveCategory(tab)
		setCategory(tab)
	}, [])

	const onLayout = useCallback((event: LayoutChangeEvent, tab: string) => {
		const layout = event.nativeEvent.layout
		setTabLayouts((currentLayouts) => [
			...currentLayouts.filter((l) => l.tab !== tab),
			{ tab, ...layout },
		])
	}, [])

	return (
		<View
			style={{
				marginHorizontal: margins.side,
				marginBottom: 20,
			}}
		>
			<View style={{ flexDirection: 'row' }}>
				{CATEGORIES.map((item) => (
					<Tab
						key={item}
						title={item}
						activeCategory={activeCategory}
						onTabPress={onTabPress}
						onLayout={(event) => onLayout(event, item)}
					/>
				))}
			</View>
			<Animated.View
				style={[
					animatedStyle,
					{
						borderBottomWidth: 2,
						borderBottomColor: colors.primary,
						position: 'absolute',
						bottom: -4,
						borderRadius: 16,
					},
				]}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	categoryTitle: {
		color: '#fff',
		fontSize: 16,
		fontFamily: 'Lato-Regular',
	},
})

export default CategorySelector
