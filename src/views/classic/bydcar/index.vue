<template>
  <div>
    <div ref="stateDom" />
    <LoaDing :loadingNumber="loadingNumber" />
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 导入three.js的构造函数
import { CreatedCanvas } from './components/car_render'
// 导入加载的进度
import { loadingNumber } from '@/utils/loading'

// 获取Dom
const stateDom = ref()
// 储存three.js的实例
let Three: CreatedCanvas

onMounted(() => {
  // process.env.BASE_URL
  // console.log(import.meta.env.BASE_URL)
  // 创建three.js实例
  Three = new CreatedCanvas(stateDom.value)
  // 传递页面Dom 绘制three.js
  Three.createScene()
})

onBeforeUnmount(() => {
  // 销毁three.js实例
  Three.dispose()
})
</script>

<script lang="ts">
export default {
  name: 'BydCar'
}
</script>
<style lang="scss" scoped></style>
