<template>
  <div class="border border-solid rounded border-slate-400 overflow-hidden">
    <div class="container relative">
      <div class="max-w-[520px]">
        <img
          class="min-w-[280px] max-w-full"
          :src="beforeImage"
          alt="Before image of issue"
        >
      </div>
      <div v-if="afterImage" class="absolute inset-0 flex items-start">
        <img
          width="200"
          height="150"
          :src="afterImage"
          alt="After image of issue"
          class="min-w-[80px] basis-[32%] rounded-br h-auto outline outline-2 outline-slate-200"
        >
      </div>
    </div>
    <div v-if="primaryInfo?.label && secondaryInfo?.label && tertiaryInfo.label" class="my-6 flex items-start">
      <div class="flex flex-col gap-4 w-[180px]">
        <div class="flex items-center">
          <p class="fs-issue__tertiary-label ">
            {{ tertiaryInfo?.label }}
            <span :class="issueStatusClasses" class="ml-2">{{ tertiaryInfo?.value }}</span>
          </p>
        </div>
        <div class="flex items-center">
          <p class="fs-issue__secondary-label">
            {{ secondaryInfo?.label }}
            <span :class="severityClasses" class="ml-2">{{ secondaryInfo?.value }}</span>
          </p>
        </div>
        <div class="flex items-center">
          <p class="fs-issue__primary-label">
            {{ primaryInfo?.label }}
            <span class="fs-issue__primary-value relative left-2">
              {{ primaryInfo?.value }}
            </span>
          </p>
        </div>
      </div>
      <div class="divider divider-horizontal relative left-2" />
      <div class="fs-action-section">
        <slot name="action_section">
          <button class="btn btn-ghost btn-block">
            View details
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IssueStatus } from '~~/types/enums';
import { primary, secondary, tertiary } from '~~/types/issueThumbnailProps';
const props = defineProps({
  beforeImage: {
    type: String,
    default: ''
  },
  afterImage: {
    type: String,
    default: ''
  },
  primaryInfo: {
    type: Object as PropType<primary>,
    default: () => ({})
  },
  secondaryInfo: {
    type: Object as PropType<secondary>,
    default: () => ({})
  },
  tertiaryInfo: {
    type: Object as PropType<tertiary>,
    default: () => ({})
  }
});
const severityClasses = computed(() => {
  const severityClasses = [
    'fs-issue__secondary-value'
  ];
  props.secondaryInfo?.value === 'Low'
    ? severityClasses.push('text-opal-700')
    : props.secondaryInfo?.value === 'Medium'
      ? severityClasses.push('text-yellow-700')
      : severityClasses.push('text-red-500');
  return severityClasses;
});
const issueStatusClasses = computed(() => {
  const issueStatusClasses = [
    'fs-issue__tertiary-value'
  ];
  props.tertiaryInfo?.value === IssueStatus.PENDING
    ? issueStatusClasses.push('text-red-300')
    : props.tertiaryInfo?.value === IssueStatus.RESOLVED
      ? issueStatusClasses.push('text-green-300')
      : issueStatusClasses.push('text-blue-400');
  return issueStatusClasses;
})
</script>
<style scoped>
.fs-issue__primary-label,
.fs-issue__secondary-label,
.fs-issue__tertiary-label {
  @apply mx-6 text-sm leading-[15.25px] font-medium text-slate-600;
}
.fs-issue__primary-value,
.fs-issue__secondary-value,
.fs-issue__tertiary-value {
  @apply mt-2 font-medium leading-[16.42px];
}
.fs-issue__primary-value {
  @apply text-slate-800;
}
.fs-action-section {
  @apply mt-4 mr-[14px] mx-auto flex justify-center bg-slate-100 rounded overflow-hidden outline outline-1 outline-slate-400;
}
</style>
