<template>
  <div class="relative max-w-max">
    <canvas ref="canvasElement" class="hidden" />
    <div class="relative bg-slate-200 max-w-[720px]">
      <img
        v-show="image || beforeImgProp"
        ref="imgElement"
        :src="image || beforeImgProp"
        alt="captured image"
        class="fs__captured-img"
      >
      <video
        v-if="cameraActive"
        ref="videoElement"
        :class="videoElementClasses"
        playsinline
      />
    </div>
    <div
      v-if="cameraActive"
      class="absolute left-1/2 bottom-4 -translate-x-1/2 fs__camera-btn--outlines"
      @click="takePhoto()"
    >
      <button class="btn btn-circle btn-xs btn-ghost fs__camera-btn" />
    </div>
    <div v-else class="absolute top-4 right-4">
      <button class="btn btn-circle btn-ghost btn-xs" @click="retake()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import cameraConstraints from 'types/cameraConstaints';
const props = defineProps({
  beforeFixedMode: {
    type: Boolean,
    default: true
  },
  beforeImgProp: {
    type: String,
    default: ''
  }
});
const emit = defineEmits<{
  (e: 'capture', capturedImg: string): void
}>();

const imgElement = ref<HTMLImageElement | null>(null);
const canvasElement = ref<HTMLCanvasElement | null>(null);
const videoElement = ref<HTMLVideoElement | null>(null);
const geoID = ref<number | null>(null);
const isStreaming = ref(false);
const image = ref('');
const temporaryIssue = useTemporaryIssue();
onMounted(() => {
  if (!('geolocation' in navigator)) {
    alert('Geolocation is not available!');
  } else if (props.beforeFixedMode && image.value) {
    return true;
  } else {
    startCameraStreaming();
  }
});
onBeforeUnmount(() => {
  if (isStreaming.value) {
    stopStreamedVideo(videoElement.value as HTMLVideoElement)
  }
})
function startCameraStreaming () {
  const constraints: cameraConstraints = {
    video: {
      width: { ideal: 720 },
      height: { ideal: 720 },
      facingMode: 'environment'
    },
    audio: false
  };
  AccessCamera(constraints);
  if (props.beforeFixedMode) {
    getLocation();
  }
}
async function AccessCamera (constraints: cameraConstraints) {
  let stream = null;
  isStreaming.value = true;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.value!.srcObject = stream;
    videoElement.value!.onloadedmetadata = () => {
      videoElement.value!.play();
    };
  } catch (err) {
    alert('Error while fetching device Camera!');
  }
}

function getLocation () {
  const geoLocationOptions = {
    enableHighAccuracy: true,
    maximumAge: 0
  };
  geoID.value = navigator.geolocation.watchPosition(
    (position) => {
      temporaryIssue.value.lat = position.coords.latitude;
      temporaryIssue.value.lng = position.coords.longitude;
    },
    (err) => {
      alert('Error while fetching device location!', err.message);
    },
    geoLocationOptions
  );
}
function stopStreamedVideo (videoElem: HTMLVideoElement) {
  const stream = videoElem.srcObject;
  let tracks;
  if (stream) {
    tracks = stream.getTracks();

    tracks.forEach((track: { stop: () => void }) => {
      track.stop();
    });

    videoElem.srcObject = null;
  }
}
function takePhoto () {
  if (canvasElement.value) {
    canvasElement.value.width = videoElement.value!.videoWidth;
    canvasElement.value.height = videoElement.value!.videoHeight;
    const ctx: CanvasRenderingContext2D | null =
      canvasElement.value!.getContext('2d');
    ctx!.drawImage(
      videoElement.value as HTMLVideoElement,
      0,
      0,
      canvasElement.value.width,
      canvasElement.value.height
    );
    imgElement.value!.src = canvasElement.value.toDataURL('image/png', 1.0);
    image.value = imgElement.value?.src;
    stopStreamedVideo(videoElement.value as HTMLVideoElement);
    emit('capture', image.value);
    isStreaming.value = false;
    clearMapId(geoID.value as number);
  }
}
function clearMapId (mapId: number) {
  navigator.geolocation.clearWatch(mapId);
}
function retake () {
  cleanUp();
  isStreaming.value = true;
  startCameraStreaming();
}
function cleanUp () {
  image.value = '';
  emit('capture', image.value);
  temporaryIssue.value.lat = 0;
  temporaryIssue.value.lng = 0;
}

const cameraActive = computed(() => {
  return (props.beforeFixedMode && isStreaming.value) || (!props.beforeFixedMode && props.beforeImgProp && isStreaming.value);
});
const videoElementClasses = computed(() => {
  const togglingClasses = ['fs__streaming'];
  if (!props.beforeFixedMode && props.beforeImgProp) {
    togglingClasses.push('fs__streaming--absolute', 'opacity-40');
  }
  return togglingClasses;
});
</script>

<style scoped>
.fs__streaming--absolute {
  @apply absolute top-0;
}
.fs__camera-btn--outlines {
  @apply border-4 rounded-full border-slate-100 border-solid flex items-center cursor-pointer;
}
.fs__camera-btn {
  @apply m-2 bg-slate-100 hover:bg-slate-100;
}
@media screen and (orientation: landscape) {
  .fs__captured-img,
  .fs__streaming {
    max-height: 100vh;
  }
}
</style>
