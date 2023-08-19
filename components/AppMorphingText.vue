<template>
    <div class="morphing-container">
        <span ref="textElementOne" class="text"/>
        <span ref="textElementTwo" class="text"/>
        <svg id="filters">
            <defs>
                <filter id="threshold">
                    <!-- Basically just a threshold effect - pixels with a high enough opacity are set to full opacity, and all other pixels are set to completely transparent. -->
                    <feColorMatrix in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                                            0 1 0 0 0
                                            0 0 1 0 0
                                            0 0 0 255 -140" />
                </filter>
            </defs>
        </svg>
        <span class="visually-hidden">{{ accessibilityText }}</span>
    </div>
</template>

<script setup>
//Implementation based on the solution found by Valgo @ code pen
//Source: https://codepen.io/Valgo/pen/PowZaNY
const props = defineProps({
    text: {
        type: Array,
        required: true
    },
    morphDuration: {
        type: Number,
        default: 3
    },
    cooldownDuration: {
        type: Number,
        default: 0.5
    }
})

const { text, morphDuration, cooldownDuration } = toRefs(props)

const accessibilityText = computed(() => {
    return text.value.join(' ')
})

const textElementOne = ref(null)
const textElementTwo = ref(null)
const textIndex = ref(text.value.length - 1)
const time = ref(new Date())
const morphStep = ref(0)
const cooldown = ref(cooldownDuration.value)

function runMorph() {
    morphStep.value -= cooldown.value
    cooldown.value = 0

    let morphFraction = morphStep.value / morphDuration.value

    if(morphFraction > 1) {
        cooldown.value = cooldownDuration.value
        morphFraction = 1
    }

    setMorphPhase(morphFraction)
}

function setMorphPhase(morphFraction) {
    textElementTwo.value.style.filter = `blur(${Math.min(8 / morphFraction - 8, 100)}px)`
    textElementTwo.value.style.opacity = `${Math.pow(morphFraction, 0.4) * 100}%`

    morphFraction = 1 - morphFraction
    textElementOne.value.style.filter = `blur(${Math.min(8 / morphFraction - 8, 100)}px)`
    textElementOne.value.style.opacity = `${Math.pow(morphFraction, 0.4) * 100}%`

    textElementOne.value.textContent = text.value[textIndex.value % text.value.length]
    textElementTwo.value.textContent = text.value[(textIndex.value + 1) % text.value.length]
}

function runCooldown() {
    morphStep.value = 0
    textElementTwo.value.style.filter = ''
    textElementTwo.value.style.opacity = '100%'

    textElementOne.value.style.filter = ''
    textElementOne.value.style.opacity = '0%'
}

function animate() {
    requestAnimationFrame(animate)

    let now = new Date()
    const shouldIncrementIndex = cooldown.value > 0
    const timeDelta = (now - time.value) / 1000
    time.value = now

    cooldown.value -= timeDelta

    if(cooldown.value <= 0) {
        if(shouldIncrementIndex) {
            textIndex.value++
        }

        runMorph()
        return
    }

    runCooldown()
}

onMounted(() => {
    textElementOne.value.textContent = text.value[textIndex.value % text.value.length]
    textElementTwo.value.textContent = text.value[(textIndex.value + 1) % text.value.length]
    animate()
})
</script>

<style lang="scss" scoped>
.morphing-container {
    filter: url(#threshold) blur(0.6px);
    .text {
        position: absolute;
    }
}
</style>