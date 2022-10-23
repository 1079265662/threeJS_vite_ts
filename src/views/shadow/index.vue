<template>
  <div class="canvas" ref="stateDom" />
</template>

<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
//导入绘制和销毁
import { getScene, dispose } from './components/shadow_renderer'

// 获取Dom
const stateDom = ref()

onMounted(() => {
  // 传递页面Dom 绘制three.js
  getScene(stateDom.value)
})

onBeforeUnmount(() => {
  dispose()
})
</script>

<script lang="ts">
export default {
  name: 'ShaDow'
}
</script>

<style lang="scss" scoped>
.canvas {
  background: #000;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
