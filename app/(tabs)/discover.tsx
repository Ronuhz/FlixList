import DiscoverSearch from '@/components/screens/discover/DiscoverSearch'
import MasonryCard from '@/components/screens/discover/MasonryCard'
import fetchSearch from '@/components/screens/discover/fetchSearch'
import { Category } from '@/constants/types'
import DiscoverContext from '@/contexts/discover'
import { mergePages } from '@/utils'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { MasonryFlashList } from '@shopify/flash-list'
import {
	QueryClient,
	QueryClientProvider,
	useInfiniteQuery,
} from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors, globalStyles, margins } from '../../constants/styles'

// Wraps the screen with the QueryClientProvider
export default function Wrapper() {
	const [queryClient] = useState(() => new QueryClient())
	useReactQueryDevTools(queryClient)

	return (
		<QueryClientProvider client={queryClient}>
			<DiscoverScreen />
		</QueryClientProvider>
	)
}

// TODO: Implement category change functionality
function DiscoverScreen() {
	const [query, setQuery] = useState('')
	const [category, setCategory] = useState<Category>('All')

	const { data, fetchNextPage } = useInfiniteQuery({
		queryKey: ['search', query, category],
		queryFn: ({ pageParam = 1, signal }) =>
			fetchSearch(query, pageParam, category, signal),
		getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
			lastPage?.length ?? 0 > 0 ? lastPageParam + 1 : undefined,
		initialPageParam: 1,
	})

	return (
		<DiscoverContext.Provider
			value={{ query, setQuery, category, setCategory }}
		>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<Text style={[globalStyles.sectionTitle, { maxWidth: wp(70) }]}>
						Find Movies, Tv series, and more...
					</Text>
					<DiscoverSearch />
				</View>
				<MasonryFlashList
					data={mergePages(data)}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					estimatedItemSize={280}
					contentContainerStyle={{ paddingHorizontal: margins.side }}
					renderItem={({ item, index }) => (
						<MasonryCard key={index} item={item} index={index} />
					)}
					onEndReachedThreshold={0.8}
					onEndReached={fetchNextPage}
				/>
			</SafeAreaView>
		</DiscoverContext.Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		paddingTop: 20,
	},
	header: { paddingHorizontal: margins.side, marginBottom: 20 },
})
