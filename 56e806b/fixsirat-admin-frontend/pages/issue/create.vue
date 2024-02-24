<template>
  <div>
    <CameraComponent @capture="(capturedImg)=> temporaryIssue.cameraImage = capturedImg" />
    <div class="mt-6 flex justify-between">
      <NuxtLink to="/">
        <button class="btn btn-warning" @click="navigateTo('/')">
          Back
        </button>
      </NuxtLink>
      <NuxtLink>
        <button
          v-if="temporaryIssue.cameraImage"
          class="btn btn-warning"
          @click="submitImage()"
        >
          Next
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import uploadCapturedImage from '~~/utils/uploadCapturedImage';
const temporaryIssue = useTemporaryIssue();
async function submitImage () {
  try {
    const data = await uploadCapturedImage(temporaryIssue.value.cameraImage);
    if (data) {
      temporaryIssue.value.beforeImage = data;
      await navigateTo('/issue/preview')
    }
  } catch (error) {
    alert(`error: ${error}`)
  }
}
</script>
