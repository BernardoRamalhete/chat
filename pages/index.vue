<template>
    <div>
        <button @click="signIn">Sign in with google</button>
        <pre>{{ user }}</pre>
        <button @click="mockThings">Create docs</button>
        <pre>{{ result }}</pre>
        <pre>
            {{ firestoreData.get('chats').length }}
        </pre>
    </div>
</template>

<script setup>
const { user, signIn } = useFirebaseAuth()
const { create, subscribe, firestoreData } = useFirebaseDb()

const result = ref('Nothing new yet')
async function mockThings() {

    const data = {
        users: [
            {
                name: 'User 1',
                email: 'user1@email.com',
                picture: 'https://picsum.photos/seed/dog/200'
            },
            {
                name: 'User 2',
                email: 'user2@email.com',
                picture: 'https://picsum.photos/seed/cat/200'
            }
        ],
        messages: [
            {
                text: 'Hello',
                author: 'user1@email.com'
            },
            {
                text: 'Hi',
                author: 'user2@email.com'
            },
            {
                text: 'How u doing?',
                author: 'user2@email.com'
            }
        ] 
    }
    result.value = await create('chats', data)
}

onMounted(() => {
    subscribe('chats')
})
</script>

<style lang="scss" scoped>
div {
    border: 1px solid $pure_black;
}
</style>