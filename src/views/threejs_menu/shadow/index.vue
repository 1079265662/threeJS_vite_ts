<template>
  <div class="canvas" ref="stateDom" />
</template>

<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
//导入绘制和销毁
import { GetScene, dispose, cameraChange } from './components/shadow_renderer'

// 获取Dom
const stateDom = ref()

onMounted(() => {
  // 传递页面Dom 绘制three.js
  GetScene(stateDom.value)
})

onBeforeUnmount(() => {
  cameraChange()
  dispose()
})
</script>

<script lang="ts">
export default {
  name: 'ShaDow'
}
</script>

<style lang="scss" scoped></style>
