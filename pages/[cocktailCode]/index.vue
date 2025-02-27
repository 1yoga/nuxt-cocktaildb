<template>
  <div class="content">
    <template v-if="drink">
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCocktailsStore } from '@/stores/cocktails';
import type { Cocktail } from '@/types/cocktail';

const route = useRoute();
const store = useCocktailsStore();
const drink = ref<Cocktail | null>(null);
const ingredients = ref<{ name: string; measure: string }[]>([]);

onMounted(async () => {
  const cocktailCode = route.params.cocktailCode as string;
  await store.fetchCocktails(cocktailCode);
  const data = store.cocktails[cocktailCode];

  if (data?.length) {
    drink.value = data[0];
    ingredients.value = [];

    for (let i = 1; i <= 10; i++) {
      const ingredient = drink.value[`strIngredient${i}` as keyof Cocktail];
      const measure = drink.value[`strMeasure${i}` as keyof Cocktail];

      if (ingredient) {
        ingredients.value.push({ name: ingredient as string, measure: measure as string || '' });
      }
    }
  }
});
</script>
