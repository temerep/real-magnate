<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

// Props
const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  markers: {
    type: Array,
    default: () => []
  }
})

const mapContainer = ref(null)
const mapImage = ref(null)

// Стан для трансформації
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)

// Розміри
const containerWidth = ref(0)
const containerHeight = ref(0)
const imageWidth = ref(0)
const imageHeight = ref(0)

// Стан для взаємодії
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const lastX = ref(0)
const lastY = ref(0)

// Touch стан
const touches = ref([])
const lastDistance = ref(0)
const lastScale = ref(1)

// Обчислення мінімального масштабу
const minScale = computed(() => {
  if (!containerWidth.value || !containerHeight.value || !imageWidth.value || !imageHeight.value) {
    return 1
  }

  const scaleToFitWidth = containerWidth.value / imageWidth.value
  const scaleToFitHeight = containerHeight.value / imageHeight.value

  return containerWidth.value > containerHeight.value ? scaleToFitWidth : scaleToFitHeight
})

// Максимальний масштаб
const maxScale = computed(() => minScale.value * 2)

// CSS transform
const transformStyle = computed(() => {
  return {
    transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
    transformOrigin: '0 0',
    transition: isDragging.value ? 'none' : 'transform 0.3s ease-out'
  }
})

// Оновлення розмірів контейнера
const updateContainerSize = () => {
  if (mapContainer.value) {
    containerWidth.value = mapContainer.value.clientWidth
    containerHeight.value = mapContainer.value.clientHeight
  }
}

// Завантаження зображення та отримання його розмірів
const loadImage = () => {
  const img = new Image()
  img.onload = () => {
    imageWidth.value = img.naturalWidth
    imageHeight.value = img.naturalHeight
    resetPosition()
  }
  img.src = props.imageUrl
}

// Скидання позиції до центру
const resetPosition = () => {
  if (!containerWidth.value || !containerHeight.value || !imageWidth.value || !imageHeight.value) {
    return
  }

  // scale.value = minScale.value

  const scaledWidth = imageWidth.value * scale.value
  const scaledHeight = imageHeight.value * scale.value

  translateX.value = (containerWidth.value - scaledWidth) / 2
  translateY.value = (containerHeight.value - scaledHeight) / 2
}

// Обмеження переміщення
const constrainTranslation = () => {
  const scaledWidth = imageWidth.value * scale.value
  const scaledHeight = imageHeight.value * scale.value

  // Обмеження по X
  const maxTranslateX = 0
  const minTranslateX = containerWidth.value - scaledWidth

  if (scaledWidth <= containerWidth.value) {
    translateX.value = (containerWidth.value - scaledWidth) / 2
  } else {
    translateX.value = Math.max(minTranslateX, Math.min(maxTranslateX, translateX.value))
  } // Обмеження по Y
  const maxTranslateY = 0
  const minTranslateY = containerHeight.value - scaledHeight
  if (scaledHeight <= containerHeight.value) {
    translateY.value = (containerHeight.value - scaledHeight) / 2
  } else {
    translateY.value = Math.max(minTranslateY, Math.min(maxTranslateY, translateY.value))
  }
} 

// Обмеження масштабу
const constrainScale = () => {
  scale.value = Math.max(minScale.value, Math.min(maxScale.value, scale.value))
}

// Отримання координат з події
const getEventCoords = (e) => {
  if (e.touches && e.touches.length > 0) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  return { x: e.clientX, y: e.clientY }
}

// Початок перетягування
const handleStart = (e) => {
  e.preventDefault()

  if (e.touches && e.touches.length > 1) {
    // Multi-touch для zoom
    touches.value = Array.from(e.touches)
    lastDistance.value = getTouchDistance(touches.value)
    lastScale.value = scale.value
  } else {
    // Single touch/mouse для pan
    isDragging.value = true
    const coords = getEventCoords(e)
    startX.value = coords.x
    startY.value = coords.y
    lastX.value = translateX.value
    lastY.value = translateY.value
  }
}

// Переміщення
const handleMove = (e) => {
  e.preventDefault()

  if (e.touches && e.touches.length > 1) {
    // Multi-touch zoom
    const currentTouches = Array.from(e.touches)
    const currentDistance = getTouchDistance(currentTouches)
    const scaleChange = currentDistance / lastDistance.value

    const newScale = lastScale.value * scaleChange
    const centerX = (currentTouches[0].clientX + currentTouches[1].clientX) / 2
    const centerY = (currentTouches[0].clientY + currentTouches[1].clientY) / 2

    zoomAt(centerX, centerY, newScale)
  } else if (isDragging.value) {
    // Pan
    const coords = getEventCoords(e)
    const deltaX = coords.x - startX.value
    const deltaY = coords.y - startY.value

    translateX.value = lastX.value + deltaX
    translateY.value = lastY.value + deltaY

    constrainTranslation()
  }
}

// Завершення взаємодії
const handleEnd = (e) => {
  e.preventDefault()
  isDragging.value = false
  touches.value = []
}

// Відстань між дотиками
const getTouchDistance = (touches) => {
  if (touches.length < 2) return 0
  const dx = touches[0].clientX - touches[1].clientX
  const dy = touches[0].clientY - touches[1].clientY
  return Math.sqrt(dx * dx + dy * dy)
} // Zoom в певній точці
const zoomAt = (clientX, clientY, newScale) => {
  const rect = mapContainer.value.getBoundingClientRect()
  const x = clientX - rect.left
  const y = clientY - rect.top

  // Точка на зображенні до зуму
  const imageX = (x - translateX.value) / scale.value
  const imageY = (y - translateY.value) / scale.value

  // Оновлення масштабу
  const oldScale = scale.value
  scale.value = newScale
  constrainScale()

  // Корекція позиції щоб зум був в точці кліку
  translateX.value = x - imageX * scale.value
  translateY.value = y - imageY * scale.value

  constrainTranslation()
}

// Zoom колесом миші
const handleWheel = (e) => {
  e.preventDefault()

  const delta = e.deltaY > 0 ? 0.9 : 1.1
  const newScale = scale.value * delta

  zoomAt(e.clientX, e.clientY, newScale)
}

// Обробник зміни розміру вікна
const handleResize = () => {
  updateContainerSize()
  resetPosition()
}

// Спостереження за змінами
watch(() => props.imageUrl, loadImage)
watch(minScale, () => {
  if (scale.value < minScale.value) { resetPosition() }
}) // Lifecycle
onMounted(() => {
  updateContainerSize()
  loadImage()

  window.addEventListener('resize', handleResize)

  // Touch події
  const container = mapContainer.value
  container.addEventListener('touchstart', handleStart, { passive: false })
  container.addEventListener('touchmove', handleMove, { passive: false })
  container.addEventListener('touchend', handleEnd, { passive: false })

  // Mouse події
  container.addEventListener('mousedown', handleStart)
  container.addEventListener('mousemove', handleMove)
  container.addEventListener('mouseup', handleEnd)
  container.addEventListener('mouseleave', handleEnd)

  // Wheel
  container.addEventListener('wheel', handleWheel, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)

  const container = mapContainer.value
  if (container) {
    container.removeEventListener('touchstart', handleStart)
    container.removeEventListener('touchmove', handleMove)
    container.removeEventListener('touchend', handleEnd)
    container.removeEventListener('mousedown', handleStart)
    container.removeEventListener('mousemove', handleMove)
    container.removeEventListener('mouseup', handleEnd)
    container.removeEventListener('mouseleave', handleEnd)
    container.removeEventListener('wheel', handleWheel)
  }
})

</script>
<template>
  <div ref="mapContainer" class="map-container">
    <img ref="mapImage" class="map-image" :src="imageUrl" :style="transformStyle" alt="Interactive Map" draggable="false" />

    <!-- Маркери -->
    <div class="map-markers" v-for="(marker, index) in markers" :key="index" :style="{
      left: (marker.x * scale + translateX) + 'px',
      top: (marker.y * scale + translateY) + 'px'
    }">
      <div class="marker-point"></div>
      <div class="marker-details" v-if="marker.label">
        <h1 class="marker-label">{{ marker.label }}</h1>
        <div class="marker-data">
          <div class="marker-data-item">
            <img class="icon" src="@/assets/stats/stat1.png" alt=""/>
            <div class="stats">
              <label>56745</label>
              <span>(+50%)</span>
            </div>
          </div>
                    <div class="marker-data-item">
            <img class="icon" src="@/assets/stats/stat2.png" alt=""/>
            <div class="stats">
              <label>56745</label>
              <span>(+50%)</span>
            </div>
          </div>
                    <div class="marker-data-item">
            <img class="icon" src="@/assets/stats/stat3.png" alt=""/>
            <div class="stats">
              <label>56745</label>
              <span>(+50%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: calc(100vh - 170px - 130px);
  overflow: hidden;
  position: relative;
  background: #f0f0f0;
  touch-action: none;
  user-select: none;

  .map-image {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    display: block;
  }

  .map-markers {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 10;

    .marker-point {
      position: relative;
      width: 40px;
      height: 40px;
      background: 
      linear-gradient(to bottom, #fff, #fff) padding-box,
      linear-gradient(to bottom, #00000050, #00000050) border-box
      ;
      border: 7px solid transparent;
      border-radius: 50%;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #26A9E0;
        z-index: 50;
      }
    }

    .marker-details {
      position: absolute;
      bottom: 40px;
      left: 100%;
      background: rgba(0, 0, 0, 0.8);
      padding: 8px 20px;
      border-radius: 18px;

      .marker-label {
        color: #fff;
        font-family: Inter, sans-serif;
        font-weight: 500;
        font-size: 20px;
        line-height: 36.47px;
        letter-spacing: -0.97px;
        text-align: center;
        margin-bottom: 11px;
      }
      .marker-data {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;

        &-item {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;

          .icon {
            width: 33px;
            height: 33px;
          }
          .stats {
            display: flex;
            flex-direction: column;

            label {
              color: #fff;
              font-family: Inter, sans-serif;
font-weight: 500;
font-size: 15.73px;
line-height: 16.85px;
letter-spacing: -0.45px;
            }

            span {
               color: #fff;
              font-family: Inter, sans-serif;
font-weight: 500;
font-size: 11.23px;
line-height: 16.85px;
letter-spacing: -0.45px;

            }
          }
        }
      }
    }
  }
}
</style>