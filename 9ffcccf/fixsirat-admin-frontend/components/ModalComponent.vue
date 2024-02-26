<template>
  <div v-if="show" class="nsx-modal-container">
    <div class="nsx-modal-content">
      <div class="nsx-modal-header">
        <span class="text-2xl leading-7 font-semibold">{{ title }}</span>
        <div class="nsx-modal-close-icon" @click="$emit('secondaryAction')">
          <IconComponent image="cross" size="16px" />
        </div>
      </div>
      <div class="nsx-modal-body">
        <slot />
      </div>
      <div class="w-2/3 m-auto mb-12">
        <button v-if="primaryLabel" class="btn btn-warning btn-block" @click="$emit('primaryAction')">
          {{ primaryLabel }}
        </button>
        <button v-if="secondaryLabel" class="btn btn-success btn-block mt-4" @click="$emit('secondaryAction')">
          {{ secondaryLabel }}
        </button>
      </div>
      <div class="mx-2 bg-blue-100 overflow-hidden">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const layer2 = useRuntimeConfig().public.zIndex.layer2;
defineProps({
  title: {
    type: String,
    default: 'Warning!'
  },
  primaryLabel: {
    type: String,
    default: ''
  },
  secondaryLabel: {
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: false
  }
});
defineEmits<{
  (e: 'primaryAction'): void
  (e: 'secondaryAction'): void
}>();
</script>

<style scoped>
.nsx-modal-container {
  @apply fixed flex justify-center items-center left-0 top-0 w-full h-full bg-gray-800/60 z-[v-bind(layer2)];
}
.nsx-modal-content {
  @apply  w-4/5 md:w-3/4 lg:w-1/2 min-h-[25%] bg-gray-100 pb-4 rounded-lg overflow-hidden;
}
.nsx-modal-header {
  @apply relative p-6 border border-b-slate-300;
}
.nsx-modal-close-icon {
  @apply absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer;
}
.nsx-modal-body {
  @apply m-auto flex flex-col items-start justify-center w-2/3 overflow-hidden pt-20 pb-10;
}
</style>
