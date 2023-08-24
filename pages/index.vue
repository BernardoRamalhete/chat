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
    overflow: hidden;
    margin-inline: auto;
    max-width: 2500px;

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
                button {
                    z-index: 4;
                }
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
                &:after {
                    content: '';
                    position: absolute;
                    width: 110%;
                    height: 60%;
                    bottom: -12%;
                    left: 55%;
                    transform: translateX(-50%);
                    background-image: linear-gradient(to top, rgba($light_background, 0.5) 30%, transparent);
                    z-index: 2;
                    border-radius: 0 0 40px 40px;
                }
                .person {
                    position: absolute;
                    max-height: 80vh;
                    max-width: 35vw;
                    z-index: 3;
                    &.left{ 
                        top: 50%;
                        transform: scaleX(-1) translateY(-50%);
                        left: -20%;
                        filter: drop-shadow(10px 20px 30px rgba($dark_background, 0.4));
                    }
                    &.right {
                        right: -22%;
                        transform: scale(0.8);
                        filter: drop-shadow(-20px 0px 20px rgba($dark_background, 0.3));
                    }
                }

                .graph {
                    position: absolute;
                    z-index: 2;
                    &.camera {
                        right: -4%;
                        top: -1%;
                        max-height: 10vh;
                        max-width: 7vw;
                        transform: rotate(-15deg);
                    }

                    &.star {
                        left: 50%;
                        top: 14%;
                        max-height: 12vh;
                        max-width: 8vw;
                        transform: translateX(-50%) rotate(10deg);
                    }

                    &.target {
                        max-height: 10vh;
                        max-width: 8vw;
                        left: 30%;
                        top: -15%;
                    }

                    &.ghost {
                        bottom: 20%;
                        max-height: 14vh;
                        max-width: 10vw;
                        left: 52%;
                        transform: translateX(-50%) rotate(-15deg);
                    }

                    &.chat {
                        left: 2%;
                        max-height: 12vh;
                        max-width: 8vw;
                        transform: rotate(-20deg);
                    }
                }

                .emoji {
                    position: absolute;
                    font-size: min(6vw, 100px);
                    z-index: 2;
                    filter: drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white) drop-shadow(1px 0 0 white) drop-shadow(-1px 0 0 white) drop-shadow(0 -1px 0 white) drop-shadow(0 1px 0 white) blur(0.5px);

                    &.joystick {
                        bottom: 25%;
                        left: 0;
                        transform: rotate(-10deg);
                    }

                    &.heart {
                        bottom: 40%;
                        right: -5%;
                        transform: rotate(20deg);
                        font-size: min(8vw, 140px); 
                    }

                    &.smug {
                        bottom: 12%; 
                        left: -14%;
                        font-size: min(10vw, 180px);
                        transform: rotate(-30deg);
                        opacity: 0.7;
                    }

                    &.fire {
                        bottom: 5%; 
                        left: 5%;
                        font-size: min(7vw, 120px);
                        transform: rotate(30deg);
                    }

                    &.horns {
                        bottom: 3%; 
                        right: -5%;
                        transform: rotate(15deg);
                    }

                    &.hibiscus {
                        bottom: -3%; 
                        left: 30%;
                        font-size: min(8vw, 140px);
                        transform: rotate(20deg);
                    }

                    &.whale {
                        bottom: 12%; 
                        right: 20%;
                        font-size: min(8vw, 140px);
                        transform: rotate(12deg);

                    }

                    &.banana {
                        bottom: -5%; 
                        left: 60%;
                        transform: rotate(15deg);
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