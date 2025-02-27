<template>
  <div class="menu">
    <div
      v-for="cocktail in cocktails"
      :key="cocktail"
      class="menu-item"
      :class="{ active: route.params.cocktailCode === cocktail }"
      @click="goTo(cocktail)"
    >
      {{ cocktail }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const cocktails = ['margarita', 'mojito', 'a1', 'kir'];
const route = useRoute();
const router = useRouter();

const goTo = (code: string) => {
  router.push(`/${code}`);
};
</script>
