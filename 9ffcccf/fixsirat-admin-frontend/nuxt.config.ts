// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/eslint-module'],
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },
  sourcemap: {
    server: true,
    client: true
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api/v1',
      mapZoom: 15,
      mapMinZoom: 5,
      mapMaxZoom: 20,
      auth0Domain: process.env.AUTH0_DOMAIN || 'dev-1zz1znw2z7diutlg.us.auth0.com',
      auth0ClientId: process.env.AUTH0_CLIENT_ID || '8TCYHYymZ4hY0S2vKgKv2zQl1Tdlbsji',
      auth0CallbackUrl: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3001/callback',
      auth0Audience: process.env.AUTH0_AUDIENCE || 'https://fixsirat-app.com',
      zIndex: {
        layer0: 0,
        layer1: 1,
        layer2: 2
      }
    }
  }
})
