// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint',
  ],

  vite: {
    plugins: [
      tailwindcss()
    ],
  },

  css: ['~/assets/tailwind.css'],

  nitro: {
    routeRules: {
      '/rpc/**': { proxy: 'http://localhost:50051/**' },
    },
  },
})
