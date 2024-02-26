<template>
  <div class="dropdown dropdown-end dropdown-hovers">
    <label tabindex="0" class="btn btn-circle">
      <div class="avatar">
        <div class="w-[48px] rounded-full">
          <img :src="props?.picture" :alt="props?.name">
        </div>
      </div>
    </label>
    <ul tabindex="0" class="user-details">
      <li> {{ props?.name }} </li>
      <li> {{ props?.email }} </li>
      <li>
        <button class="btn btn-ghost btn-xs" @click="handleLogout()">
          logout
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
const auth0 = process.client ? useAuth0() : undefined;
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  picture: {
    type: String,
    default: ''
  }
});

const handleLogout = () => {
  auth0?.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
}
</script>

<style scoped>
.user-details {
  @apply dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box max-w-max
}
</style>
