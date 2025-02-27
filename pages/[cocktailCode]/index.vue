<template>
  <div class="content">
    <!-- Показываем 404, если коктейль не найден -->
    <template v-if="isNotFound">
      <p class="error-message">404 – Drink Not Found 🍹</p>
    </template>

    <!-- Показываем ошибку API -->
    <template v-else-if="errorMessage">
      <p class="error-message">{{ errorMessage }}</p>
    </template>

    <!-- Показываем сам коктейль -->
    <template v-else-if="drink">
      <h1 class="drink-title">{{ drink.strDrink }}</h1>
      <p><strong>Category:</strong> {{ drink.strCategory ?? 'N/A' }}</p>
      <p><strong>Type:</strong> {{ drink.strAlcoholic ?? 'N/A' }}</p>
      <p><strong>Glass:</strong> {{ drink.strGlass ?? 'N/A' }}</p>
      <p><strong>Instructions:</strong> {{ drink.strInstructions ?? 'No instructions available' }}</p>

      <h2>Ingredients:</h2>
      <div class="ingredients">
        <div v-for="(ingredient, index) in ingredients" :key="index">
          <span>{{ ingredient.measure }} - {{ ingredient.name }}</span>
        </div>
      </div>

      <img
        class="drink-image"
        v-if="drink.strDrinkThumb"
        :src="drink.strDrinkThumb"
        alt="Drink Image"
        loading="lazy"
      />
    </template>

    <p v-else>Loading drink data...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCocktailsStore } from '@/stores/cocktails';
import type { Cocktail } from '@/types/cocktail';

const route = useRoute();
const router = useRouter();
const store = useCocktailsStore();
const drink = ref<Cocktail | null>(null);
const ingredients = ref<{ name: string; measure: string }[]>([]);
const errorMessage = computed(() => store.error[route.params.cocktailCode as string] || null);
const isNotFound = computed(() => store.error[route.params.cocktailCode as string] === "404");

// Загружаем коктейль
onMounted(async () => {
  const cocktailCode = route.params.cocktailCode as string;
  await store.fetchCocktails(cocktailCode);

  if (store.error[cocktailCode] === "404") {
    router.push('/error');
    return;
  }

  if (!store.error[cocktailCode]) {
    const data = store.cocktails[cocktailCode];
    if (data?.length) {
      drink.value = data[0]; // Берём первый вариант напитка
      ingredients.value = [];

      for (let i = 1; i <= 10; i++) {
        const ingredient = drink.value[`strIngredient${i}` as keyof Cocktail];
        const measure = drink.value[`strMeasure${i}` as keyof Cocktail];

        if (ingredient) {
          ingredients.value.push({ name: ingredient as string, measure: measure as string || '' });
        }
      }
    }
  }
});
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  padding: 20px;
}
</style>
