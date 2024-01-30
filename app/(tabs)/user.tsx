import { Text, StyleSheet, Image, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, globalStyles, margins } from '../../constants/styles'
import { useEffect } from 'react'
import { SignedIn, useUser } from '@clerk/clerk-expo'
import { usePathname, router } from 'expo-router'
import SignOutButton from '../../components/SignOutButton'
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import * as ImagePicker from 'expo-image-picker'
import { Feather } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'

export default function UserScreen() {
	const { isLoaded, isSignedIn, user } = useUser()
	const pathname = usePathname()

	if (!isLoaded) {
		return
	}

	useEffect(() => {
		if (pathname === '/user' && !isSignedIn) router.push('/signUp')
	}, [pathname])

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 0.2,
			base64: true,
		})

		if (!result.canceled) {
			try {
				await user?.setProfileImage({
					file: `data:image/jpeg;base64,${result.assets[0].base64 as string}`,
				})
			} catch (error: any) {
				console.log(JSON.stringify(error, null, 2))
			}
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<SignedIn>
				{/* HEADER */}
				<View style={styles.header}>
					<Text style={[globalStyles.sectionTitle]}>Profile</Text>
					<SignOutButton />
				</View>

				{/* PORFILE INFO */}
				<View style={styles.profileInfoContainer}>
					<Pressable onPress={pickImage}>
						<Image
							source={{ uri: user?.imageUrl }}
							resizeMode='cover'
							height={hp(12)}
							width={hp(12)}
							style={{ borderRadius: 60 }}
						/>
						<BlurView
							tint='dark'
							experimentalBlurMethod='dimezisBlurView'
							style={styles.profilePictureEditContainer}
						>
							<Feather name='edit-2' size={hp(2.5)} color={'white'} />
						</BlurView>
					</Pressable>
					<Text style={styles.username}>@{user?.username}</Text>
				</View>

				<Text style={[globalStyles.sectionTitle, styles.myList]}>My List</Text>
			</SignedIn>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		flex: 1,
	},
	header: {
		marginHorizontal: margins.side,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	profileInfoContainer: {
		marginHorizontal: margins.side,
		alignItems: 'center',
		gap: 5,
	},
	profilePictureEditContainer: {
		position: 'absolute',
		padding: 8,
		borderRadius: 60,
		overflow: 'hidden',
		borderColor: 'black',
		borderWidth: 0.5,
		bottom: 0,
		right: 0,
	},
	username: { color: colors.mutedForeground, fontSize: hp(2.5) },
	myList: { marginHorizontal: margins.side },
})
