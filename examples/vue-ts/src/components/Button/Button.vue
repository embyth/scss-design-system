<script setup lang="ts">
defineEmits<{
  click: [];
}>();
</script>

<template>
  <button type="button" class="button" @click="$emit('click')">
    <slot />
  </button>
</template>

<style src="./Button.styles.scss" lang="scss"></style>
