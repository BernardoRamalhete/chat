export default defineNuxtRouteMiddleware(() => {
    const { user } = useFirebaseAuth()
    const userCookie = useCookie('user')
    if(user.value == undefined && userCookie.value == undefined) {
        return navigateTo('/')
    }
})