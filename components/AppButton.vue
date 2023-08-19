<template>
    <button class="main-button">
        <slot/>
    </button>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.main-button {
    padding: 12px 40px;
    border-radius: 60px;
    background-color: transparent;
    color: $title_color;
    border: none;
    transition: all 0.4s ease;
    cursor: pointer;
    &:focus {
        outline: transparent;
    }

    &.primary {
        background-color: $primary_blue;
        color: $light_background;
        font-weight: 600;
        font-size: 20px;
        position: relative;
        background-size: 100% 300%;
        background-image: $primary_button_gradient;
        box-shadow: $primary_button_box_shadow;
        &:hover {
            background-position: 0 100%;
        }
    }
}
</style>