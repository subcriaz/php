<template>
  <div class="nsx-base-layer">
    <div class="self-end">
      <button v-if="!isAuthenticated" class="btn btn-ghost" @click="handleLogin()">
        login
      </button>
      <div v-else>
        <UserWidget :name="user?.name" :email="user?.email" :picture="user?.avatar" />
      </div>
    </div>
    <div class="nsx-inner-layer">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { layer0, layer1 } = useRuntimeConfig().public.zIndex;
const auth0 = process.client ? useAuth0() : undefined;
const user = useUser().value;
const handleLogin = () => {
  auth0?.loginWithRedirect({
    appState: {
      target: useRoute().path
    }
  });
};

const isAuthenticated = computed(() => {
  return auth0?.isAuthenticated.value
});
watchEffect(() => {
  if (isAuthenticated.value) {
    fetchUser();
  }
})

function fetchUser () {
  user.name = auth0!.user.value.name as string;
  user.email = auth0!.user.value.email as string;
  user.avatar = auth0!.user.value.picture as string;
}
</script>

<style scoped>
.nsx-base-layer{
@apply max-w-7xl min-h-[80vh] flex flex-col items-center my-0 mx-auto px-4 pt-4 z-[v-bind(layer0)]
}
.nsx-inner-layer{
  @apply max-w-full z-[v-bind(layer1)]
}
</style>
