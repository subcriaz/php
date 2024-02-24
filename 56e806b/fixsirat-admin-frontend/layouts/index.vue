<template>
  <div>
    <div class="fixed bottom-8 right-1">
      <NuxtLink to="/issue/create">
        <button class="btn btn-lg btn-circle btn-warning mr-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </NuxtLink>
    </div>
    <slot/>
  </div>
</template>
