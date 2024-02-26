<template>
  <div v-for="Issue in issueList" :key="Issue._id">
    <div class="w-80">
      <NuxtLink :to="`/issue/details-${Issue._id}`">
        <IssueThumbnail
          v-if="Issue.issueImages.length > 1"
          :before-image="Issue.issueImages[0].imageLink"
          :after-image="Issue.issueImages[Issue.issueImages.length-1].imageLink"
          :primary-info="{label:'Date:', value: Issue.dateTaken}"
          :secondary-info="{label:'Severity:' , value:Issue.severity}"
          :tertiary-info="{label:'Status:' , value:Issue.issueStatus}"
        >
          <template #action_section>
            <NuxtLink :to="`/issue/edit/${Issue._id}`">
              <button class="btn btn-ghost" @click="isEditIssue = true">
                Update
              </button>
            </NuxtLink>
          </template>
        </IssueThumbnail>
        <IssueThumbnail
          v-else
          :before-image="Issue.issueImages[Issue.issueImages.length-1].imageLink"
          :primary-info="{label:'Date:', value: Issue.dateTaken}"
          :secondary-info="{label:'Severity:' , value:Issue.severity}"
          :tertiary-info="{label:'Status:' , value:Issue.issueStatus}"
        >
          <template #action_section>
            <NuxtLink :to="`/issue/edit/${Issue._id}`">
              <button class="btn btn-ghost" @click="isEditIssue = true">
                Update
              </button>
            </NuxtLink>
          </template>
        </IssueThumbnail>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { Severity } from '../types/enums';
import issue from '~~/types/issue';

const isEditIssue = useIsEditIssue();
const props = defineProps<{
  issues: issue[];
}>();
const issueList = computed(() => {
  return props.issues.map((issue) => {
    return { ...issue, dateTaken: DateTime.fromISO(issue?.dateTaken as any).toLocaleString(DateTime.DATE_SHORT), severity: issue.severity.toString() === '1' ? Severity.LOW : issue?.severity.toString() === '2' ? Severity.MEDIUM : Severity.HIGH };
  });
});
</script>
