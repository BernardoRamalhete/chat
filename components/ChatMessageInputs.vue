<template>
    <div class="chat-inputs">
        <AppQuillEditor @update:model="getMessageValue"/>
        <button class="img">
            <span class="visually-hidden">Attach image</span>
            <Icon name="ph:image"/>
        </button>
        <button class="send">
            <span class="visually-hidden">Send message</span>
            <Icon name="quill:send"/>
        </button>
    </div>
</template>

<script setup>

const message = ref('')

function getMessageValue(value) {
    message.value = value
    console.log(message.value)
}
</script>

<style lang="scss" scoped>
.chat-inputs {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    #quill-editor {
        flex-grow: 1;
    }
    button {
        position: absolute;
        padding: 8px;
        border: none;
        background-color: transparent;
        font-size: 20px;
        color: $text_color;
        &:focus {
            outline: transparent;
        }
        &.img {
            right: 48px;
        }

        &.send {
            right: 8px;
        }
    }
}
</style>