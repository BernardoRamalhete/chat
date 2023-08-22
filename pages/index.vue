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
            <figure class="image-container">
                <Icon class="emoji horns" name="fluent-emoji:sign-of-the-horns"/>
                <Icon class="emoji fire" name="fluent-emoji:fire"/>
                <Icon class="emoji whale" name="fluent-emoji:whale"/>
                <Icon class="emoji banana" name="fluent-emoji:banana"/>
                <Icon class="emoji hibiscus" name="fluent-emoji:hibiscus"/>
                <Icon class="emoji smug" name="fluent-emoji:smiling-face-with-sunglasses"/>
                <Icon class="emoji heart" name="fluent-emoji:red-heart"/>
                <Icon class="emoji joystick" name="fluent-emoji:joystick"/>
                <img 
                    class="graph camera" 
                    src="/images/camera.png" 
                    alt=""
                />
                <img 
                    class="graph target" 
                    src="/images/target.png" 
                    alt=""
                />
                <img 
                    class="graph ghost" 
                    src="/images/ghost.png" 
                    alt=""
                />
                <img 
                    class="graph chat" 
                    src="/images/chat.png" 
                    alt=""
                />
                <img 
                    class="graph star" 
                    src="/images/star.png" 
                    alt=""
                />
                <img 
                    class="person right" 
                    src="/images/girl.webp" 
                    alt=""
                />
                <img 
                    class="person left" 
                    src="/images/guy.webp" 
                    alt=""
                />
            </figure>
        </div>
    </main>
</template>

<script setup>
const { user, signIn } = useFirebaseAuth()
watch(user, () => {
    if(user.value != undefined) navigateTo('/chat')
})
</script>

<style lang="scss">

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
                position: relative;
                .person {
                    position: absolute;
                    max-height: 80vh;
                    &.left{ 
                        top: 50%;
                        transform: scaleX(-1) translateY(-50%);
                        left: -30%;
                        filter: drop-shadow(20px 20px 30px rgba($dark_background, 0.4));
                    }
                    &.right {
                        right: -20%;
                        transform: scale(0.8);
                        filter: drop-shadow(-20px 0px 20px rgba($dark_background, 0.3));
                    }
                }

                .graph {
                    position: absolute;
                    &.camera {
                        right: 5%;
                        max-height: 10vh;
                        transform: rotate(-15deg);
                    }

                    &.star {
                        left: 50%;
                        top: 14%;
                        max-height: 12vh;
                        transform: translateX(-50%) rotate(10deg);
                    }

                    &.target {
                        max-height: 10vh;
                        left: 30%;
                        top: -18%;
                    }

                    &.ghost {
                        bottom: 10%;
                        max-height: 14vh;
                        left: 40%;
                        transform: translateX(-50%) rotate(20deg);
                    }

                    &.chat {
                        left: 2%;
                        max-height: 12vh;
                        transform: rotate(-20deg);
                    }
                }

                .emoji {
                    position: absolute;
                    font-size: 80px;
                    filter: drop-shadow(0 0 0 white);

                    &.joystick {
                        top: 0;
                        left: 0;
                    }

                    &.heart {
                        bottom: 0; right: 0;
                    }

                    &.smug {
                        bottom: 0; left: 0;
                    }

                    &.fire {
                        top: 0; right: 0;
                    }

                    &.horns {
                        top: 0; right: 20%;
                    }

                    &.hibiscus {
                        bottom: 0; left: 20%;
                    }

                    &.whale {
                        bottom: 0; right: 20%;
                    }

                    &.banana {
                        top: 0; left: 40%;
                        & > g {
                            stroke: white;
                            stroke-width: 2px;
                            stroke-linejoin: round;
                        }
                    }
                }
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