<script setup>
import InteractiveMap from '@/components/InteractiveMap.vue';
import Map from '@/components/Map.vue';
import { onMounted, ref, computed } from 'vue';
import { useAppStore } from '@/stores/app';

const app = useAppStore()
const mapRef = ref(null)

const getMap = computed(() => {
  return new URL(`../assets/maps/${app.currentMap}/${app.currentMap}-1.webp`, import.meta.url).href
})

const mapMarkers = ref([
  { x: 700, y: 420, label: 'Лос Сантос' },
  { x: 1100, y: 700, label: 'Чикаго' },
  { x: 900, y: 300, label: 'Нью Йорк' }
])

const handleMarkerClick = (marker) => {
  console.log('Клік по маркеру:', marker)
}

const resetMapView = () => {
  if (mapRef.value) {
    mapRef.value.resetView()
  }
}

onMounted(() => {
  console.log('Карта завантажена')
})

</script>

<template>
  <main class="map">
    <Map ref="mapRef" :image-url="getMap" :markers="mapMarkers" />
  </main>
</template>

<style lang="scss" scoped></style>
