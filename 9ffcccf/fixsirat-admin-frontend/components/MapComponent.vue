<template>
  <client-only>
    <l-map
      ref="locationsMap"
      :min-zoom="leafletOptions.minZoom"
      :max-zoom="leafletOptions.maxZoom"
      :center="centerLocation"
      :zoom-animation="false"
      :zoom="leafletOptions.zoom"
      :options="{ tap: false }"
      style="height: 75%;width: 85%; display: block; margin-left: auto; margin-right: auto;"
    >
      <l-tile-layer :url="leafletOptions.url" />
      <!-- eslint-disable -->
      <l-marker
        :lat-lng="[centerLocation[0], centerLocation[1]]"
        :draggable="true"
        @update:latLng="latLngUpdated"
      />
      <!-- eslint-enable -->
    </l-map>
  </client-only>
</template>

<script setup lang="ts">
import { PointExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
const temporaryIssue = useTemporaryIssue();
const config = useRuntimeConfig();
const centerLocation : PointExpression = [temporaryIssue.value.lat, temporaryIssue.value.lng];
const leafletOptions = ref({
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  minZoom: config.public.mapMinZoom,
  maxZoom: config.public.mapMaxZoom,
  zoom: config.public.mapZoom
});

const latLngUpdated = (newCoordinates: {lat: number; lng: number;}): void => {
  temporaryIssue.value.lat = newCoordinates.lat;
  temporaryIssue.value.lng = newCoordinates.lng;
}

</script>
