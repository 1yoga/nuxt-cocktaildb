import { defineStore } from 'pinia';
import type { CocktailResponse } from '@/types/cocktail';

export const useCocktailsStore = defineStore('cocktails', {
  state: () => ({
    cocktails: {} as Record<string, CocktailResponse['drinks']>,
    error: {} as Record<string, string>,
  }),
  actions: {
    async fetchCocktails(code: string) {
      if (this.cocktails[code] || this.error[code]) return;

      try {
        const response = await $fetch<CocktailResponse>(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`
        );

        if (response?.drinks) {
          this.cocktails[code] = response.drinks;
        } else {
          this.error[code] = "404"; // Если API вернул `null`, это 404
        }
      } catch (err) {
        this.error[code] = 'Failed to load data. Please try again later.';
      }
    }
  }
});
