<template>
  <div class="container">
    <Menu />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/Menu.vue';
import '@/assets/styles/main.scss';
</script>
