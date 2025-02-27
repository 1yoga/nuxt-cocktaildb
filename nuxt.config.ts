export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  css: ['@/assets/styles/main.scss'],

  runtimeConfig: {
    public: {
      apiUrl: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    }
  },

  compatibilityDate: '2025-02-27'
});