<script setup lang="ts">
import { ref } from 'vue';

import AppButton from '../Button/Button.vue';

const count = ref(0);
</script>

<template>
  <AppButton @click="count += 1">Count is {{ count }}</AppButton>
</template>
