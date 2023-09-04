import { GoogleAuthProvider, signInWithPopup  } from 'firebase/auth'

export default function() {
    const { $auth } = useNuxtApp()

    const provider = new GoogleAuthProvider()

    const user = useState('user', () => null)

    const signIn = async () => {
        return signInWithPopup($auth, provider)
            .then(async (result) => {
                const userCookie = useCookie('user')
                const { registeredUsersWithProvidedEmail, create } = useFirebaseDb()

                let data = {
                    email: result.user.email,
                    image: result.user.photoURL,
                    name: result.user.displayName,
                    status: "Hey there, I'm using Nuxt Chat"
                }

                const fireBaseRegisteredUsers = await registeredUsersWithProvidedEmail(result.user.email)
                if(fireBaseRegisteredUsers.length == 0) {
                    data.id = await create('users', data)
                } else {
                    data = fireBaseRegisteredUsers[0]
                }
                userCookie.value = data
                user.value = data
                navigateTo('/chat')
            })
            .catch((error) => {
                const errorCode = error.errorCode ?? '500'
                const errorMessage = error.errorMessage ?? error

                console.log(`${errorCode}: ${errorMessage}`)
            })
    }

    return {
        user,
        signIn
    }
}