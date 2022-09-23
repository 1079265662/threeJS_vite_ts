<template>
  <LoaDing :visible="loading" />
  <div class="canvas" ref="stateDom" />
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getScene, dispose } from './components/texture_renderer'

const stateDom = ref()
const loading = ref(true)

onMounted(() => {
  const scene = getScene(stateDom.value)
  if (scene) {
    console.log(scene)
    loading.value = false
  }
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
