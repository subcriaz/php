<template>
  <svg
    class="fs__icon"
  >
    <use
      :xlink:href="imageURI"
    />
  </svg>
</template>

<script setup lang="ts">
import spriteIcons from '../assets/images/sprite.svg'
const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  size: {
    type: String,
    default: ''
  },
  cursor: {
    type: String,
    default: ''
  },
  hidden: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
});

const imageURI = computed(() => { return spriteIcons + '#' + props.image });
</script>
<style scoped>
.fs__icon {
  @apply
  w-[v-bind(size)] h-[v-bind(size)] stroke-[v-bind(color)] fill-[v-bind(color)] align-middle
}
</style>
