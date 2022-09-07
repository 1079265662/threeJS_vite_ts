<template>
  <div class="canvas" ref="stateDom" />
</template>

<script lang="ts" setup>
// 导入Vue组合API
import { ref, onMounted } from 'vue'
// 导入webgl 渲染方法
import { getScene } from './components/renderer'

// 获取元素的Dom
const stateDom = ref()
onMounted(() => {
  // 加载webgl
  getScene(stateDom.value)
})
</script>

<script lang="ts">
export default {
  name: 'HoMe'
}
</script>
<style lang="scss" scoped>
.canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
