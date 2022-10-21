<template>
  <LoaDing :loadingNumber="loadingNumber" />
  <!-- <div>{{ loadingNumber }}</div> -->
  <div class="canvas" ref="stateDom" />
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getScene, dispose, loadingNumber } from './components/texture_renderer'

const stateDom = ref()

onMounted(() => {
  getScene(stateDom.value)
})

onBeforeUnmount(() => {
  dispose()
})
</script>

<script lang="ts">
export default {
  name: 'TexTure'
}
</script>

<style lang="scss" scoped>
.canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
