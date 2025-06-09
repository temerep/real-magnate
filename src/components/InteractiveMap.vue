<template>
  <div class="map-container">
    <!-- Контейнер карти -->
    <div ref="mapElement" class="map-viewport" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
      @touchend="handleTouchEnd" @mousedown="handleMouseDown" @wheel="handleWheel">
      <!-- Зображення карти -->
      <div class="map-image" :style="mapStyle">
        <!-- Маркери -->
        <div v-for="marker in markers" :key="marker.id" class="map-marker"
          :style="{ left: marker.x + '%', top: marker.y + '%' }" @click="onMarkerClick(marker)">
          <div class="marker-content">
            {{ marker.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- Елементи управління -->
    <div class="controls">
      <!-- <button @click="zoomIn" class="control-btn">+</button>
      <button @click="zoomOut" class="control-btn">−</button> -->
      <button @click="resetView" class="control-btn">⌂</button>
    </div>

    <!-- Інформаційна панель -->
    <div class="info-panel">
      <div>Позиція: x:{{ Math.round(transform.x) }}, y:{{ Math.round(transform.y) }}</div>
      <div>Масштаб: {{ transform.scale.toFixed(2) }}x</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, readonly, onUnmounted } from 'vue'

// Props
const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  markers: {
    type: Array,
    default: () => []
  },
  minScale: {
    type: Number,
    default: 0.5
  },
  maxScale: {
    type: Number,
    default: 3
  }
})

// Emits
const emit = defineEmits(['marker-click'])

// Refs
const mapElement = ref(null)

// Reactive state
const transform = reactive({
  x: 0,
  y: 0,
  scale: 1
})

const touchState = reactive({
  isDragging: false,
  lastTouch: { x: 0, y: 0 },
  lastPinchDistance: 0
})

// Computed
const mapStyle = computed(() => ({
  backgroundImage: `url("${props.imageUrl}")`,
  transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
  transformOrigin: 'center center'
}))

// Utility functions
const getDistance = (touch1, touch2) => {
  const dx = touch1.clientX - touch2.clientX
  const dy = touch1.clientY - touch2.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

const clampScale = (scale) => {
  return Math.max(props.minScale, Math.min(props.maxScale, scale))
}

// Touch event handlers
const handleTouchStart = (e) => {
  e.preventDefault()

  if (e.touches.length === 1) {
    // Один палець - початок перетягування
    touchState.isDragging = true
    touchState.lastTouch = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  } else if (e.touches.length === 2) {
    // Два пальці - початок зуму
    touchState.isDragging = false
    touchState.lastPinchDistance = getDistance(e.touches[0], e.touches[1])
  }
}

const handleTouchMove = (e) => {
  e.preventDefault()

  if (e.touches.length === 1 && touchState.isDragging) {
    // Перетягування
    const deltaX = e.touches[0].clientX - touchState.lastTouch.x
    const deltaY = e.touches[0].clientY - touchState.lastTouch.y

    transform.x += deltaX
    transform.y += deltaY

    touchState.lastTouch = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  } else if (e.touches.length === 2) {
    // Зум
    const distance = getDistance(e.touches[0], e.touches[1])
    const scale = distance / touchState.lastPinchDistance

    transform.scale = clampScale(transform.scale * scale)
    touchState.lastPinchDistance = distance
  }
}

const handleTouchEnd = () => {
  touchState.isDragging = false
}

// Mouse event handlers
const handleMouseDown = (e) => {
  touchState.isDragging = true
  touchState.lastTouch = { x: e.clientX, y: e.clientY }
}

const handleMouseMove = (e) => {
  if (!touchState.isDragging) return

  const deltaX = e.clientX - touchState.lastTouch.x
  const deltaY = e.clientY - touchState.lastTouch.y

  transform.x += deltaX
  transform.y += deltaY

  touchState.lastTouch = { x: e.clientX, y: e.clientY }
}

const handleMouseUp = () => {
  touchState.isDragging = false
}

// Зум колесом миші
const handleWheel = (e) => {
  e.preventDefault()

  const delta = e.deltaY > 0 ? 0.9 : 1.1
  transform.scale = clampScale(transform.scale * delta)
}

// Control methods
const zoomIn = () => {
  transform.scale = clampScale(transform.scale * 1.2)
}

const zoomOut = () => {
  transform.scale = clampScale(transform.scale * 0.8)
}

const resetView = () => {
  transform.x = 0
  transform.y = 0
  transform.scale = 1
}

// Marker events
const onMarkerClick = (marker) => {
  emit('marker-click', marker)
}

// Lifecycle hooks
onMounted(() => {
  // Додаємо глобальні слухачі для миші
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})

// Expose methods for parent component (optional)
defineExpose({
  zoomIn,
  zoomOut,
  resetView,
  transform: readonly(transform)
})
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f0f0f0;
  overflow: hidden;
}

.map-viewport {
  width: 100%;
  height: 100%;
  cursor: grab;
  touch-action: none;

  &:active {
  cursor: grabbing;
}
}

.map-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.1s ease-out;
  position: relative;
}

.map-marker {
  position: absolute;
  width: 16px;
  height: 16px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;

  &::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #26A9E0;
  border: 2px solid white;
  border-radius: 50%;
  }

  &:hover{
    .marker-content {
      opacity: 1;
    }
  }

  .marker-content {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s;
}
}

.controls {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-btn {
  width: 48px;
  height: 48px;
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
  background: #f5f5f5;
  }

  &:active {
  background: #e5e5e5;
  }
}

.info-panel {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;

  div {
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
  }
}
</style>