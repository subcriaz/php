<template>
  <div class="relative">
    <div class="absolute">
      <img width="520" height="520" :src="afterImage">
      <div
        class="fs__slider-label right-4 bottom-4"
      >
        AFTER
      </div>
    </div>
    <div class="fs__before-img">
      <img width="520" height="520" :src="beforeImage">
      <div
        class="fs__slider-label left-4 bottom-4"
      >
        BEFORE
      </div>
    </div>
    <div class="absolute inset-0">
      <input
        v-model="inputRange"
        type="range"
        min="0"
        max="100"
        class="fs__slider-thumb"
      >
    </div>
    <div
      class="fs__sliding-line"
    >
      <div
        class="mr-2"
      >
        <svg
          width="9"
          height="14"
          viewBox="0 0 9 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1L1 7L8 13"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div
        class="min-w-[12px] h-14 bg-white rounded-sm"
      />
      <div
        class="ml-2"
      >
        <svg
          width="9"
          height="14"
          viewBox="0 0 9 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L8 7L1 13"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  beforeImage: {
    type: String,
    default: ''
  },
  afterImage: {
    type: String,
    default: ''
  }
});
const inputRange = ref(50);
const slideValue = computed(() => {
  return inputRange.value + '%';
});
</script>
<style scoped>
.fs__slider-label {
  @apply absolute text-slate-300 font-semibold flex items-center
}
.fs__before-img {
  clip-path: polygon(
    0 0,
    v-bind(slideValue) 0,
    v-bind(slideValue) 100%,
    0 100%
  );
  @apply relative
}
.fs__slider-thumb {
  @apply bg-transparent w-full h-16 top-1/2 relative -translate-y-1/2 z-20 appearance-none opacity-0
}
.fs__sliding-line {
  @apply
  absolute left-[v-bind(slideValue)] inset-y-0 bg-white w-[3px] flex justify-center items-center
}
</style>
