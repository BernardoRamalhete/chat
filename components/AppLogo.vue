<template>
    <span @mouseleave="logoStartUp">
        <span class="visually-hidden">Loqui</span>
        <canvas 
            ref="logoElement"
            class="logo-canvas"
            aria-hidden
        />
    </span>
</template>

<script setup>
const props = defineProps({
    spread: {
        type: Number,
        default: 0.2
    },
    pallet: {
        type: Array,
        default: ['ffad70', 'f7d297', 'edb9a1', 'e697ac', 'b38dca', '9c76db', '705cb5', '43428e', '2c2142']
    },
    width: {
        type: String,
        default: '300px'
    }
})

const { spread, pallet, width } = toRefs(props)
const logoElement = ref(null)

const logoStartUp = ref(() => {})

const cancelLogoElementWatcher = watch(logoElement, () => {
    if(logoElement.value) {
        const { size } = useLogoBuilder(logoElement.value, 'LOQUI', pallet.value, spread.value)
        logoStartUp.value = size
        size()
        cancelLogoElementWatcher()
    }
})
</script>

<style lang="scss" scoped>
.logo-canvas {
    width: v-bind(width);
    height: 100%;
}
</style>