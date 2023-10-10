import React, { createContext } from 'react'

export const DiscoverContext = createContext({
	category: 'All',
	setCategory: {} as React.Dispatch<React.SetStateAction<string>>,
})
