import { addDoc, collection, onSnapshot } from 'firebase/firestore'

export default function() {
    const { $firestore } = useNuxtApp()

    const create = async (collectionName, data) => {
        try {
            const newDoc = await addDoc(collection($firestore, collectionName), data)
            return newDoc.id
        } catch (error) {
            return error            
        }
    }

    const firestoreData = useState('firestore_data', () => new Map())
    const subscribe = async(collectionName) => {
        onSnapshot(collection($firestore, 'chats'), (result) => {
            firestoreData.value.set(collectionName, result.docs.map(item => item.data()))
            console.log(firestoreData)
        })
    }

    return {
        create, 
        subscribe,
        firestoreData
    }
}