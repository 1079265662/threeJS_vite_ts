<template>
  <div class="canvas" ref="stateDom">
    <LoaDing :loadingNumber="loadingNumber" />
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
//导入绘制和销毁
import { getScene, dispose, loadingNumber } from './components/hdr_renderer'
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
  name: 'HdR'
}
</script>
<style lang="scss" scoped></style>
