<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const cocktails = ['margarita', 'mojito', 'a1', 'kir'];
const route = useRoute();
const router = useRouter();

const goTo = (code: string) => {
  router.push(`/${code}`);
};
</script>

<template>
  <nav class="menu">
    <ul>
      <li
        v-for="code in cocktails"
        :key="code"
        :class="{ active: route.params.cocktailCode === code }"
        @click="goTo(code)"
      >
        {{ code.charAt(0).toUpperCase() + code.slice(1) }}
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.menu {
  width: 200px;
  background: #f5f5f5;
  padding: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  cursor: pointer;
  padding: 10px;
  transition: 0.3s;
  &.active {
    background: #ddd;
    font-weight: bold;
  }
}
</style>
