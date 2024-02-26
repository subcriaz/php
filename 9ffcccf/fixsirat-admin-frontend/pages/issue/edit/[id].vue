<template>
  <div v-if="pending">
    loading...
  </div>
  <div v-else>
    <CameraComponent
      :before-img-prop="temporaryIssue.cameraImage || temporaryIssue.afterImage || selectedIssueImage"
      :before-fixed-mode="false"
      @capture="(capturedImg) => (temporaryIssue.cameraImage = capturedImg)"
    />
    <div class="mt-6 flex justify-between">
      <NuxtLink to="/">
        <button class="btn btn-warning">
          Back
        </button>
      </NuxtLink>
      <NuxtLink>
        <button v-if="isSkip" class="btn btn-warning" @click="skip()">
          Skip
        </button>
        <button v-else class="btn btn-warning" @click="submitImage()">
          Next
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Severity } from '~~/types/enums';
import issue from '~~/types/issue';

const route = useRoute();
const temporaryIssue = useTemporaryIssue();
const config = useRuntimeConfig();
onMounted(() => {
  useIsEditIssue().value = true;
  temporaryIssue.value.cameraImage = '';
})
const { data, pending } = await useFetch<issue>(config.public.apiBase + '/issues/' + route.params.id)
const selectedIssue = data.value;
temporaryIssue.value.address = selectedIssue!.address!;
temporaryIssue.value.issueDescription = selectedIssue!.issueDescription!;
temporaryIssue.value.fixTime = selectedIssue!.fixTime!;
temporaryIssue.value.issueType = selectedIssue!.issueType!;
temporaryIssue.value.issueStatus = selectedIssue!.issueStatus!;
temporaryIssue.value.lat = selectedIssue!.location.coordinates[0];
temporaryIssue.value.lng = selectedIssue!.location.coordinates[1];
const selectedIssueImage = computed(() => {
  return selectedIssue?.issueImages[selectedIssue?.issueImages.length - 1].imageLink;
});
(function (): void {
  if (selectedIssue?.severity.toString() === '1') {
    temporaryIssue.value.severity = Severity.LOW;
  } else if (selectedIssue?.severity.toString() === '2') {
    temporaryIssue.value.severity = Severity.MEDIUM;
  } else {
    temporaryIssue.value.severity = Severity.HIGH;
  }
})();
const isSkip = computed(() => !temporaryIssue.value.cameraImage);
async function skip () {
  if (isSkip) {
    if (!temporaryIssue.value.afterImage) {
      if (selectedIssue!.issueImages.length > 1) {
        temporaryIssue.value.beforeImage = selectedIssue!.issueImages[selectedIssue!.issueImages.length - 2].imageLink;
        temporaryIssue.value.afterImage = selectedIssue!.issueImages[selectedIssue!.issueImages.length - 1].imageLink;
      } else {
        temporaryIssue.value.beforeImage = selectedIssue!.issueImages[selectedIssue!.issueImages.length - 1].imageLink;
      }
    }
  }
  await navigateToPreview({ route: '/issue/preview', query: selectedIssue?._id })
}
async function submitImage () {
  try {
    const data = await uploadCapturedImage(temporaryIssue.value.cameraImage);
    if (data) {
      temporaryIssue.value.afterImage = data;
      temporaryIssue.value.beforeImage = selectedIssueImage.value!;
      await navigateToPreview({ route: '/issue/preview', query: selectedIssue?._id })
    }
  } catch (error) {
    alert(`error while uploading image: ${error}`);
  }
}
async function navigateToPreview (pathObj:{route: string, query: string}) {
  await navigateTo({
    path: pathObj.route,
    query: {
      id: pathObj.query
    }
  });
}
</script>
