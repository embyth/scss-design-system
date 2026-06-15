<script setup lang="ts">
defineProps<{
  defaultChecked?: boolean;
}>();

defineEmits<{
  change: [];
}>();
</script>

<template>
  <label class="switch">
    <input class="switch_input" type="checkbox" :checked="defaultChecked" @change="$emit('change')" />
    <span class="switch_slider" />
  </label>
</template>

<style src="./Switch.styles.scss" lang="scss"></style>
