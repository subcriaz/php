<template>
  <NuxtLayout name="index">
    <div class="h-screen">
      <div v-if="error">
        Server unreachable. Try again...!
      </div>
      <div v-else>
        <div v-if="issueList!.length">
          <h3 class="text-center mt-12 mb-16">
            Reported issues
          </h3>
          <div ref="scrollComponent" class="relative flex justify-around flex-wrap gap-10">
            <ListComponent :issues="issueList!" />
            <h4
              v-if="loading"
              :class="[scrollMessageClasses]"
            >
              loading...
            </h4>
            <h4
              v-else
              :class="[scrollMessageClasses]"
            >
              No more issues
            </h4>
          </div>
        </div>
        <div v-else>
          <h3 class="text-center mt-12 mb-16">
            No issue reported yet
          </h3>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import issue from '~~/types/issue';

const config = useRuntimeConfig();
const issueList = useIssues();
const scrollComponent = ref<HTMLDivElement | null>(null);
const pageNumber = ref(1);
const limitReached = ref(false);
const loading = ref(false);
onMounted(() => {
  useIsEditIssue().value = false;
  cleanup();
})
const { data: DBissues, error, refresh } = await useFetch<issue[]>(
  () => `issues?page=${pageNumber.value}&limit=5`, { baseURL: config.public.apiBase });
if (DBissues.value !== null) {
  const { data } = DBissues.value;
  if (data && data.length > 0) {
    pageNumber.value++;
    issueList.value = data;
  }
}
function debounce (cb, delay = 2000) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout)
    if (!limitReached.value) {
      loading.value = true;
    }
    timeout = setTimeout(() => {
      loading.value = false;
      cb(...args)
    }, delay)
  }
}
onMounted(() => {
  window.addEventListener('scroll', debounce(handleScroll, 500));
})

onUnmounted(() => {
  window.removeEventListener('scroll', debounce(handleScroll, 500));
})

const handleScroll = () => {
  const listElm = scrollComponent.value
  if (listElm!.getBoundingClientRect().bottom < window.innerHeight) {
    if (!limitReached.value) {
      loadMoreIssues();
    }
  } else { loading.value = false }
}

function loadMoreIssues () {
  refresh();
  if (DBissues.value !== null) {
    const { data } = DBissues.value;
    if (data && data.length > 0) {
      issueList.value.push(...data);
      pageNumber.value++;
      limitReached.value = false;
    } else {
      pageNumber.value--;
      limitReached.value = true;
      loading.value = false;
    }
  }
  loading.value = false;
}
const scrollMessageClasses = computed(() => {
  const classes = ['absolute', '-bottom-20', 'left-0', 'right-0', 'text-center'];
  if (loading.value) {
    classes.push('opacity-100');
  } else if (!loading.value && limitReached.value) { classes.push('opacity-100') } else { classes.push('opacity-0') }
  return classes;
})
</script>
