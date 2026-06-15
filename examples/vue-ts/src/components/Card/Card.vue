<script setup lang="ts">
import { ThemeMode, useAppTheme } from '../../composables/useAppTheme';
import AppCounter from '../Counter/Counter.vue';
import GitHub from '../GitHub/GitHub.vue';
import AppSwitch from '../Switch/Switch.vue';

const { toggle, mode } = useAppTheme();

const openRepository = (): void => {
  window.open('https://github.com/embyth/scss-design-system', '_blank');
};
</script>

<template>
  <div class="app-container">
    <div class="app-content">
      <div class="card">
        <h1 class="card_title">SASS Design System</h1>
        <p class="card_paragraph">
          This design system is a collection of pre-built, reusable assets—components, patterns, guidance, and code—that
          allows its users to build consistent digital experiences faster. By using the pre-built and universal assets,
          the time teams spend designing and building is minimized. Instead of building and re-building basic elements,
          they can spend that time customizing their products to address specific client use cases.
        </p>
        <div class="card_controls">
          <AppSwitch :default-checked="mode === ThemeMode.DARK" @change="toggle" />
          <AppCounter />
          <GitHub @click="openRepository" />
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./Card.styles.scss" lang="scss"></style>
