<template>
  <div>
    <div ref="stateDom" />
    <LoaDing :loadingNumber="loadingNumber" />
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 导入实例
import { CreatedCanvas } from './components/iphone_render'
// 导入加载的进度
import { loadingNumber } from '@/utils/loading'

// 获取Dom
const stateDom = ref()
// 储存three.js的实例
let Three: any = null

onMounted(() => {
  // 创建three.js实例, 传递页面Dom
  Three = new CreatedCanvas(stateDom.value)
  Three.createScene()
})

onBeforeUnmount(() => {
  // 销毁three.js实例
  Three.dispose()
  Three.onRemoveEventListener()
})
</script>

<script lang="ts">
export default {
  name: 'IPhone'
}
</script>
<style lang="scss" scoped></style>
