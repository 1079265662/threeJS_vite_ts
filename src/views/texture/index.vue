<template>
  <div class="canvas" ref="stateDom" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getScene } from './components/texture_renderer'
const stateDom = ref()
onMounted(() => {
  getScene(stateDom.value)
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
