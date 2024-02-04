import { colors } from '@/constants/styles'
import { Category } from '@/constants/types'
import { Dispatch, SetStateAction } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

type Props = {
	setCategory: Dispatch<SetStateAction<Category>>
	category: Category
	selectedCategory: Category
}

const CategoryTab = ({ setCategory, selectedCategory, category }: Props) => {
	return (
		<Pressable onPress={() => setCategory(category)}>
			<Text
				style={[
					styles.category,
					{ color: selectedCategory === category ? colors.primary : 'white' },
				]}
			>
				{category}
			</Text>
		</Pressable>
	)
}

export default CategoryTab

const styles = StyleSheet.create({
	category: {
		color: 'white',
		fontSize: 16,
		fontFamily: 'Lato-Regular',
	},
})
