<template>
  <div class="canvas" ref="stateDom">
    <LoaDing :loadingNumber="loadingNumber" />
  </div>
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

<style lang="scss" scoped></style>
