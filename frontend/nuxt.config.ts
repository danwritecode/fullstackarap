// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint'
  ],

  nitro: {
    routeRules: {
      // forward everything under /rpc to your tonic server
      '/rpc/**': { proxy: 'http://localhost:50051/**' },
      // if your tonic server mounts gRPC at root (no /rpc prefix), use:
      // '/rpc/**': { proxy: 'http://localhost:8080/**' },
    },
  },
})
