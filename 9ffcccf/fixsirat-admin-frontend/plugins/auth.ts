import { createAuth0 } from '@auth0/auth0-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const auth0 = createAuth0({
    domain: config.public.auth0Domain,
    clientId: config.public.auth0ClientId,
    authorizationParams: {
      audience: config.public.auth0Audience,
      redirect_uri: config.public.auth0CallbackUrl
    }
  })
  if (process.client) {
    nuxtApp.vueApp.use(auth0)
  }
  addRouteMiddleware('auth', () => {
    if (process.client) {
      auth0.checkSession()
      if (!auth0.isAuthenticated.value) {
        auth0.loginWithRedirect({
          appState: {
            target: useRoute().path
          }
        })
      }
    }
  })
})
