<template>
  <div>
    <div
      v-if="loading == true || loading == null"
      class="overflow-hidden flex flex-col items-center"
    >
      <div v-if="temporaryIssue.beforeImage && temporaryIssue.afterImage">
        <ComparisonSlider :before-image="temporaryIssue.beforeImage" :after-image="temporaryIssue.afterImage" />
      </div>
      <div v-else>
        <IssueThumbnail :before-image="temporaryIssue.beforeImage" />
      </div>
      <div class="mt-16 text-center w-full">
        <h4>Additional information</h4>
        <form class="form mb-4" @submit.prevent="formValidateHandler()">
          <div>
            <label for="issueType" class="label">
              <span :class="['label-text', issueTypeInputClasses.label]">Issue Type</span>
            </label>
            <select
              id="issueType"
              v-model="temporaryIssue.issueType"
              name="issueType"
              :class="['select', 'w-[98%]', issueTypeInputClasses.input]"
            >
              <option value="" disabled>
                Select Issue Type
              </option>
              <option>Pothole</option>
              <option>Mosque</option>
            </select>
          </div>
          <div>
            <label for="severity" class="label">
              <span :class="['label-text', severityInputClasses.label]">Severity level</span>
            </label>
            <select
              id="severity"
              v-model="temporaryIssue.severity"
              name="severity"
              :class="['select', 'w-[98%]', severityInputClasses.input]"
            >
              <option value="" disabled>
                Select Severity Level
              </option>
              <option v-for="severity in severityOptions" :key="severity" :value="severity">
                {{ severity }}
              </option>
            </select>
          </div>
          <div>
            <label for="address" class="label">
              <span :class="['label-text text-gray-700']">Address(Optional)</span>
            </label>
            <input
              id="address"
              v-model="temporaryIssue.address"
              :class="[
                'input',
                'input-bordered',
                'w-[98%]',
                'input-success'
              ]"
              type="text"
              name="address"
            >
          </div>
          <div v-if="isEditissue">
            <label for="fixTime" class="label">
              <span :class="'label-text text-gray-700'">Time Taken to Fix</span>
            </label>
            <select
              id="fixTime"
              v-model="temporaryIssue.fixTime"
              name="fixTime"
              class="select select-success w-[98%] max-h-16 ]"
            >
              <option value="" disabled>
                Select Hours
              </option>
              <option v-for="hour in hours" :key="hour" :value="hour">
                {{ hour }}
              </option>
            </select>
          </div>
          <div v-if="isEditissue">
            <label for="issueStatus" class="label">
              <span :class="['label-text','text-gray-700' ]">Issue Status</span>
            </label>
            <select
              id="issueStatus"
              v-model="temporaryIssue.issueStatus"
              name="issueStatus"
              class="select w-[98%] select-success"
            >
              <option value="" disabled>
                Select Issue Status
              </option>
              <option v-for="status in issueStatusOptions" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
          </div>
          <div>
            <label
              for="issueDescription"
              class="label"
            >
              <span :class="['label-text','text-gray-700' ]">Issue Description(Optional)</span>
            </label>
            <textarea
              id="issueDescription"
              v-model="temporaryIssue.issueDescription"
              class="
                textarea
                textarea-bordered
                textarea-lg
                w-[98%]
                text-base
                textarea-success"
              name="issueDescription"
              placeholder="Describe issue..."
            />
          </div>
          <div id="location" class="h-96 mx-auto ">
            <label for="location" class="label">
              <span class="label-text text-gray-700">Location</span>
            </label>
            <MapComponent />
          </div>
          <div class="flex flex-col justify-center gap-6">
            <Teleport v-if="showModal" to="body">
              <ModalComponent :show="showModal" primary-label="continue" secondary-label="cancel" @secondary-action="() => showModal = false" @primary-action="handleContinue">
                <p>All progress would be lost!</p>
              </ModalComponent>
            </Teleport>
            <button v-show="!showModal" class="btn btn-success btn-block" @click.prevent="showModal = true">
              Cancel
            </button>
            <button :class="submitBtnClasses">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div v-if="submitError" class="absolute top-0 right-0 hideAlert">
        <div class="alert alert-error shadow-lg">
          <div>
            <span>Error submitting issue!</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading == false" class="mt-10">
      <div class="alert alert-success shadow-lg">
        <span>{{ isEditissue ?'Issue updated successfully!': 'Issue reported successfully!' }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue';
import formValidate from '~~/types/formValidation';
import issueRequestBody from '~~/types/issueBody';
import postPutRequestType from '~~/types/postPutRequest';
import { IssueStatus, Severity } from '~~/types/enums';

definePageMeta({
  middleware: ['auth']
})
const auth0 = process.client ? useAuth0() : undefined;
const showModal = ref(false)
const route = useRoute();
const temporaryIssue = useTemporaryIssue();
const isEditissue = useIsEditIssue();
const loading = ref<boolean | null>(null);
const submitError = ref(false);
const formValidations: formValidate = reactive({
  severityReq: null,
  issueTypeReq: null
});
const hours = Array.from({ length: 100 }, (_, index) => index + 1);
const issueStatusOptions = Object.values(IssueStatus);
const severityOptions = Object.values(Severity);

onMounted(() => {
  window.addEventListener('beforeunload', pageReloadHanlder)
  if (!temporaryIssue.value.beforeImage) {
    navigateTo('/')
  }
}
);
onUnmounted(() => {
  window.removeEventListener('beforeunload', pageReloadHanlder);
})
function pageReloadHanlder (e: { preventDefault: () => void; returnValue: string; }) {
  e.preventDefault();
  if (e) {
    e.returnValue = ''; // Legacy method for cross browser support
  }
  return '';
}
const formValidateHandler = (): boolean | undefined => {
  if (temporaryIssue.value.severity) {
    formValidations.severityReq = false;
  } else {
    formValidations.severityReq = true;
  }
  if (temporaryIssue.value.issueType) {
    formValidations.issueTypeReq = false;
  } else {
    formValidations.issueTypeReq = true;
  }
  if (temporaryIssue.value.severity && temporaryIssue.value.issueType) {
    loading.value = true;
    submitIssueToServer();
    return true;
  }
};

async function submitIssueToServer (): Promise<void> {
  const token = await auth0!.getAccessTokenSilently();
  loading.value = true;
  const config = useRuntimeConfig();
  let url = config.public.apiBase + '/issues';
  const body: issueRequestBody = {
    reporter: useUser().value.email,
    userName: useUser().value.name,
    severity: temporaryIssue.value.severity,
    mapURL: mapUrl.value,
    issueType: temporaryIssue.value.issueType
  }
  const requestOptions: postPutRequestType = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body
  }
  if (isEditissue.value) {
    body.imageLink = temporaryIssue.value.afterImage || body.imageLink;

    body.issueDescription = temporaryIssue.value.issueDescription || (delete body.issueDescription, undefined);

    body.address = temporaryIssue.value.address || (delete body.address, undefined);

    body.fixTime = temporaryIssue.value.fixTime || body.fixTime;

    body.issueStatus = temporaryIssue.value.issueStatus || body.issueStatus;
    requestOptions.method = 'PUT';
    url = url + '/' + route.query.id;
  } else {
    body.imageLink = temporaryIssue.value.beforeImage;
    body.issueDescription = temporaryIssue.value.issueDescription || '';
    body.address = temporaryIssue.value.address || '';
    body.location = {
      coordinates: [temporaryIssue.value.lat, temporaryIssue.value.lng]
    }
  }
  const { error } = await useFetch(url, requestOptions
  );
  if (error.value) {
    submitError.value = true;
    loading.value = null;
  } else {
    loading.value = false;
    cleanup();
    setTimeout(() => { isEditissue.value = false; navigateTo('/') }, 1000)
  }
}
function handleContinue () {
  navigateTo('/')
}

watch(loading, () => {
  if (loading.value) {
    formValidations.severityReq = false;
    formValidations.issueTypeReq = false;
  }
});
watch(temporaryIssue.value.severity, () => {
  if (loading.value) {
    formValidations.severityReq = false;
  } else {
    temporaryIssue.value.severity
      ? (formValidations.severityReq = false)
      : (formValidations.severityReq = true);
  }
});
watch(temporaryIssue.value.issueType, () => {
  if (loading.value) {
    formValidations.issueTypeReq = false;
  } else {
    temporaryIssue.value.issueType
      ? (formValidations.issueTypeReq = false)
      : (formValidations.issueTypeReq = true);
  }
});
const mapUrl = computed(() => {
  temporaryIssue.value.mapURL = `https://www.google.com/maps/search/?api=1&query=${temporaryIssue.value.lat},${temporaryIssue.value.lng}`;
  return temporaryIssue.value.mapURL;
});
const getInputClasses = (req: boolean | null) => {
  return req
    ? { input: 'select-error', label: 'text-red-400' }
    : { input: 'select-success', label: 'text-gray-700' };
};

const severityInputClasses = computed(() => {
  return getInputClasses(formValidations.severityReq);
});

const issueTypeInputClasses = computed(() => {
  return getInputClasses(formValidations.issueTypeReq);
});
const submitBtnClasses = computed(() => {
  const submitBtnClasses = ['btn', 'btn-warning', 'btn-block'];
  loading.value && submitBtnClasses.push('loading');
  submitError.value && submitBtnClasses.push('btn-error');
  return submitBtnClasses;
});
</script>

<style scoped>
.form {
  @apply mt-4 space-y-6;
}

.hideAlert {
  animation: hideAnimation 0s ease-in 3s;
  animation-fill-mode: forwards;
}

@keyframes hideAnimation {
  to {
    visibility: hidden;
    width: 0;
    height: 0;
  }
}
</style>
