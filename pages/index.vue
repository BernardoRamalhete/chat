<template>
    <main class="wrapper">
        <div class="content-section">
            <AppLogo 
                class="logo"
                :spread="0.2" 
                :pallet="['ff006e', '3a86ff', '8338ec']"
            />
            <div class="hero">
                <h1 class="hero-title">
                    <AppMorphingText :text="['Private Chats', 'Group Chats', 'All Encrypted']" :morphDuration="1"/>
                </h1>
                <p class="hero-text">
                    Instantly connect with your friends and family while safeguarding your privacy and personal data. No more sharing information without your consent.
                </p>
                <span class="hero-cta">
                    <AppButton class="primary" @click="signIn">
                        Join now
                    </AppButton>
                </span>
            </div>
        </div>
        <div class="image-section">
            <div class="image-top"></div>
            <div class="button">
                <AppButton class="primary" @click="signIn">
                    Login With 
                    <Icon name="logos:google-icon" aria-hidden/>
                    <span class="visually-hidden">Google</span>
                </AppButton>
            </div>
            <div class="image-container"></div>
        </div>
    </main>
</template>

<script setup>
const { user, signIn } = useFirebaseAuth()
watch(user, () => {
    if(user.value != undefined) navigateTo('/chat')
})
</script>

<style lang="scss" scoped>

.wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 60px;
    height: 100%;

    .content-section {
        position: relative;
        padding-top: 120px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .logo {
            position: absolute;
            top: -20px;
            left: -64px;
        }
        .hero {
            margin-block: auto;
            max-width: 90%;
            &-title {
                font-size: 72px;
                white-space: nowrap;
            }
            &-text {
                margin: 0 0 48px 4px;
                font-size: 20px;
            }
            &-cta {
                display: flex;
                justify-content: flex-end;
            }
        }
    }

    .image-section {
        display: grid;
        grid-template-columns: 1fr 300px;
        grid-template-rows: max-content auto;
        .image {
            &-top {
                background-color: $light_pink;
                width: 100%;
                height: 80%;
                top: 20%;
                border-radius: 40px 40px 0 0;
                position: relative;
                &:after {
                    content: '';
                    background-color: $light_pink;
                    background-color: red;
                    width: 40px;
                    aspect-ratio: 1;
                    position: absolute;
                    left: 100%;
                    bottom: 0;
                    background-image: radial-gradient(circle at 125% -25%, 
                        $light_background calc(70% + 2px), 
                        $light_pink 70%
                    );
                }
            }
            &-container {
                background-color: $light_pink;
                grid-column: 1/3;
                border-radius: 0 40px 40px 40px;
            }
        }

        .button {
            padding: 28px 28px 28px 48px;
            background-color: $light_background;
            border-radius: 32px;
            position: relative;
            z-index: 1;
        }
    }
}
</style>