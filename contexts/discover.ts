import { Category } from '@/constants/types'
import React, { createContext } from 'react'

type DiscoverContextType = {
	query: string
	setQuery: React.Dispatch<React.SetStateAction<string>>
	category: Category
	setCategory: React.Dispatch<React.SetStateAction<Category>>
}
const DiscoverContext = createContext<DiscoverContextType>({
	query: '',
	setQuery: {} as React.Dispatch<React.SetStateAction<string>>,
	category: 'All',
	setCategory: {} as React.Dispatch<React.SetStateAction<Category>>,
})

export default DiscoverContext
