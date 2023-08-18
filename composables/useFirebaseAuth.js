import { GoogleAuthProvider, signInWithPopup  } from 'firebase/auth'

export default function() {
    const { $auth } = useNuxtApp()

    const provider = new GoogleAuthProvider()

    const user = useState('user', () => null)

    const signIn = async () => {
        return signInWithPopup($auth, provider)
            .then((result) => {
                user.value = result.user
            })
            .catch((error) => {
                const errorCode = error.errorCode
                const errorMessage = error.errorMessage

                console.log(`${errorCode}: ${errorMessage}`)
            })
    }

    return {
        user,
        signIn
    }
}