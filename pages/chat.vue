<template>
    <div>
        <pre>{{ userData }}</pre>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})

const { user } = useFirebaseAuth()
const userCookie = useCookie('user')

const userData = computed(() => {
    return user.value || userCookie.value
})
</script>

<style lang="scss" scoped>

</style>