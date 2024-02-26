<template>
  <div class="container space-y-4">
    <NuxtLink :to="`/`">
      <span class="text-blue-700 flex mt-2">
        <IconComponent image="icon-back" class="text-blue-700 mt-1.5" size="28px" /><p class="text-2xl">View all cases</p></span>
    </NuxtLink>
    <div>
      <div v-if="selectedIssue.issueImages.length > 1" class="md:ml-auto mr-auto">
        <ComparisonSlider :before-image="selectedIssue.issueImages[0].imageLink" :after-image="selectedIssue.issueImages[selectedIssue.issueImages.length - 1].imageLink" />
      </div>
      <div v-else>
        <IssueThumbnail :before-image="selectedIssue.issueImages[0].imageLink" />
      </div>
    </div>
    <div v-if="selectedIssue.address" class="text-gray-800 text-xl">
      Situated at <span class="font-bold text-gray-900">{{ selectedIssue.address }}</span>.
    </div>
    <div class="text-gray-800 text-xl lg:text-2xl">
      The severity of this issue was <span :class="severityColor(severity)" class="font-bold">{{ selectedIssue.severity }}</span>
      <span v-if="selectedIssue.fixTime">. It took <span class="font-bold text-gray-900">{{ selectedIssue.fixTime }} hours</span> to fix it.</span>
      <span v-else>. The status of this issue is <span class="font-bold text-gray-900">{{ selectedIssue.issueStatus }} .</span></span>
    </div>
    <div class="flex gap-2 justify-center lg:flex-col">
      <button class="btn btn-outline btn-sm mt-2 h-10 lg:btn-wide">
        <IconComponent image="icon-play" class="text-black" size="24px" />
        Fixing Video
      </button>
      <button class="btn btn-sm mt-2 h-10 lg:btn-wide">
        Try Cold Asphalt
      </button>
    </div>
    <div>
      <h5 class="font-medium lg:text-2xl">
        Case History
      </h5>
      <p class="text-gray-800 lg:text-lg">
        We keep track of certain cases to help you see how our product perform in a long run.
      </p>
      <div class="carousel carousel-center p-4 space-x-4 rounded-box">
        <div v-for="(image, index) in selectedIssueImages" :key="index" class="carousel-item max-w-auto flex-col">
          <img :src="image.imageLink" alt="Issue Images" class="rounded-box min-w-[280px] max-w-[350px] h-auto">
          <p class="w-[220px] h-12 text-gray-700">
            Taken on
            {{ formatDate(image.dateTaken) }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <div v-if="error">
        Error while retrieving relevant cases!
      </div>
      <div v-else>
        <div v-if="issueList!.length">
          <h5 class="block font-medium lg:text-2xl">
            Relevant Cases
          </h5>
          <div class="carousel carousel-center p-4 space-x-4 rounded-box">
            <ListComponent :issues="issueList!.slice(0, 5)" />
          </div>
        </div>
        <h5 v-else class="font-medium lg:text-2xl">
          No Relevant Cases Found
        </h5>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DateTime } from 'luxon';
import { Severity } from '~~/types/enums';
import issue from '~~/types/issue';
const route = useRoute();
const selectedIssueImages = ref([]);
const issueList = useIssues();
const selectedIssue = ref();
const config = useRuntimeConfig();
const { data: selectedDbIssue } = await useFetch<issue>(config.public.apiBase + '/issues/' + route.params.id)
selectedIssue.value = selectedDbIssue.value;
selectedIssueImages.value = selectedIssue?.value.issueImages;
(function (): void {
  if (selectedIssue?.value.severity.toString() === '1') {
    selectedIssue.value.severity = Severity.LOW;
  } else if (selectedIssue?.value.severity.toString() === '2') {
    selectedIssue.value.severity = Severity.MEDIUM;
  } else {
    selectedIssue.value.severity = Severity.HIGH;
  }
})();
function severityColor (severity: Severity) {
  if (severity === Severity.LOW) {
    return 'text-opal-700';
  } else if (severity === Severity.MEDIUM) {
    return 'text-yellow-700';
  } else {
    return 'text-red-500';
  }
}
const formatDate = (date: Date) => {
  const luxonDate = DateTime.fromJSDate(new Date(date));
  const formattedDate = luxonDate.toLocaleString({
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  return formattedDate;
};

const { data: DBissues, error } = await useFetch(
  config.public.apiBase + '/issues'
);
if (DBissues.value !== null) {
  const { data } = DBissues.value;
  if (data && data.length > 0) {
    issueList.value = data;
  }
}
</script>
