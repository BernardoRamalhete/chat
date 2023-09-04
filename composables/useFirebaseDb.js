import { addDoc, collection, onSnapshot, query, where, arrayUnion, doc, updateDoc, getDocs, getCountFromServer } from 'firebase/firestore'

export default function() {
    const { $firestore } = useNuxtApp()

    const { user } = useFirebaseAuth()
    const userCookie = useCookie('user')

    const userData = computed(() => {
        return user.value ?? userCookie.value
    })

    if(process.client && userData.value) {
        const chatsQuery = query(collection($firestore, 'chats'), where('users', 'array-contains', userData.value.email))
        const chats = useState('chats', () => [])
        onSnapshot(chatsQuery,  { includeMetadataChanges: true }, async (result) => {
            for(let j = 0; j < result.docs.length; j++) {
                const docData = result.docs[j].data()

                const chatValue = {
                    ...docData,
                    id: result.docs[j].id,
                    users: []
                }
                
                const otherUsers = docData.users.filter(user => user != userData.value.email)
                for(let i = 0; i < otherUsers.length; i++) {
                    const otherUser = otherUsers[i]

                    const userQuery = query(collection($firestore, 'users'), where('email', '==', otherUser))

                    const usersData = await getDocs(userQuery)
                    chatValue.users.push(usersData.docs.length > 0 ? usersData.docs[0].data() : {
                        email: otherUser,
                        name: otherUser,
                        status: 'This user is not using Nuxt Chat yet',
                        image: `https://ui-avatars.com/api/?name=${otherUser.charAt(0)}&background=8338ec&color=fff&length=1`
                    })
                }

                if(!chatValue.is_group) {
                    chatValue.image = chatValue.users[0].image
                    chatValue.name = chatValue.users[0].name
                    chatValue.status = chatValue.users[0].status
                }
                chats.value[j] = chatValue
            }
        })

    }

    const registeredUsersWithProvidedEmail = async (email) => {
        const userQuery = query(collection($firestore, 'users'), where('email', '==', email))
        const registeredUsers = await getDocs(userQuery)
        return Array.from(registeredUsers.docs).map(doc => ({id: doc.id, ...doc.data()}))
    }
    const sendMessage = async (docId, data) => {
        const docRef = doc($firestore, 'chats', docId)
        
        await updateDoc(docRef, {
            messages: arrayUnion(data)
        })
    }
    const create = async (collectionName, data) => {
        try {
            const newDoc = await addDoc(collection($firestore, collectionName), data)
            return newDoc.id
        } catch (error) {
            return error            
        }
    }

    return {
        create, 
        sendMessage,
        registeredUsersWithProvidedEmail
    }
}