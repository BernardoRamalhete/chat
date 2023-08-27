<template>
    <div 
        id="quill-editor"
        ref="editorElement"
        class="editor"
    />
</template>

<script setup>
import 'quill/dist/quill.bubble.css'

const emits = defineEmits(['update:model'])

const editorElement = ref(null)

onMounted(() => {
    const nuxtApp = useNuxtApp()

    const Quill = nuxtApp.$useQuill()

    const editor = new Quill(editorElement.value, {
        theme: 'bubble',
        isolateCharacter: true,
        modules: {
            toolbar: [
                ['bold', 'italic', 'strike']
            ],
            magicUrl: {
                // Regex used to check URLs during typing
                urlRegularExpression: /(https?:\/\/|www\.)[\w-.]+\.[\w-.]+(\/([\S]+)?)?/gi,
                // Regex used to check URLs on paste
                globalRegularExpression: /(https?:\/\/|www\.)[\w-.]+\.[\w-.]+(\/([\S]+)?)?/gi
            }
        },
        placeholder: 'Message...'
    }).on('text-change', () => {
        emits('update:model', editorElement.value.querySelector('.ql-editor').innerHTML)
    })
})
</script>

<style lang="scss" scoped>
</style>