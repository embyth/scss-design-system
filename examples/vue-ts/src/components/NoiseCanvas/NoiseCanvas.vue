<script setup lang="ts">
import { useTemplateRef } from 'vue';

import { AbstractionAnimation, Config } from '../../abstraction';
import { ThemeMode, useAppTheme } from '../../composables/useAppTheme';
import { useCanvas } from '../../composables/useCanvas';

const abstraction = new AbstractionAnimation();
const { mode } = useAppTheme();

const canvasReference = useTemplateRef<HTMLCanvasElement>('canvas');

useCanvas(canvasReference, abstraction.draw.bind(abstraction), {
  backgroundColor: () => (mode.value === ThemeMode.DARK ? Config.backgroundColorDark : Config.backgroundColor),
});
</script>

<template>
  <canvas ref="canvas" class="noise-abstraction" />
</template>

<style src="./NoiseCanvas.styles.scss" lang="scss"></style>
