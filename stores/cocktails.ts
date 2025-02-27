import { defineStore } from 'pinia';
import type { CocktailResponse } from '@/types/cocktail';

export const useCocktailsStore = defineStore('cocktails', {
  state: () => ({
    cocktails: {} as Record<string, CocktailResponse['drinks']>
  }),
  actions: {
    async fetchCocktails(code: string) {
      if (this.cocktails[code]) return;

      try {
        const { public: config } = useRuntimeConfig();
        const response = await $fetch<CocktailResponse>(`${config.apiUrl}${code}`);

        if (response.drinks) {
          this.cocktails[code] = response.drinks.map((drink) => ({
            idDrink: drink.idDrink,
            strDrink: drink.strDrink,
            strCategory: drink.strCategory,
            strAlcoholic: drink.strAlcoholic,
            strGlass: drink.strGlass,
            strInstructions: drink.strInstructions,
            strDrinkThumb: drink.strDrinkThumb
          }));
        }
      } catch (error) {
        console.error(`Ошибка загрузки ${code}:`, error);
      }
    }
  }
});
