<template>
    <main>
        <div>
            <AppLogo 
                :spread="0.2" 
                :pallet="['FAD2E1', 'CDDAFD', 'BEE1E6']"
            />

            <h1 class="hero-title">
                <AppMorphingText :text="['Private Messages', 'Group Chats', 'All Encrypted']" :morphDuration="1"/>
            </h1>
            <p>
                Instantly connect with your friends and family with out sharing any information without your consent.
            </p>
            <AppButton class="primary">
                Join now
            </AppButton>
        </div>
        <div>

        </div>
    </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.hero-title {
    font-size: 80px;
}
</style>