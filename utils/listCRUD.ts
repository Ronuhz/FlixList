import { db } from '@/firebaseConfig'
import { useAuth } from '@clerk/clerk-expo'
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from 'firebase/firestore'

export async function addToList() {
	const { isLoaded, isSignedIn, userId } = useAuth()

	if (!isLoaded || !isSignedIn) {
		return
	}
}

export async function getListContent(pageSize: number, lastDocSnapshot = null) {
	const { isLoaded, isSignedIn, userId } = useAuth()

	if (!isLoaded || !isSignedIn) {
		return { listsData: [], lastDocSnapshot: null }
	}

	try {
		let q = query(
			collection(db, 'lists'),
			where('userId', '==', userId),
			orderBy('createdAt'),
			limit(pageSize)
		)

		if (lastDocSnapshot) {
			q = query(q, startAfter(lastDocSnapshot))
		}

		const listsSnapshot = await getDocs(q)
		const listsData = listsSnapshot.docs.map((doc) => doc.data())
		const lastVisible = listsSnapshot.docs[listsSnapshot.docs.length - 1]

		return { listsData, lastDocSnapshot: lastVisible }
	} catch (error) {
		console.warn(error)
		return { listsData: [], lastDocSnapshot: null }
	}
}
