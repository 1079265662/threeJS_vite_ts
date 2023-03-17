<template>
  <div>
    <!-- <div>{{ Number213 }}</div> -->
    <!-- {{ Three?.loadingNumber.value }} -->

    <div ref="stateDom" />
    <LoaDing :loadingNumber="Three?.loadingNumber.value" />
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue'
// 导入three.js的构造函数
import { CreatedCanvas } from './components/car_render'

// 获取Dom
const stateDom = ref()
// 储存three.js的实例
const Three = shallowRef<CreatedCanvas>()

onMounted(() => {
  // 创建three.js实例
  Three.value = new CreatedCanvas(stateDom.value)
  // 传递页面Dom 绘制three.js
  Three.value.createScene()
})

onBeforeUnmount(() => {
  // 销毁three.js实例
  Three.value?.dispose()
})
</script>

<script lang="ts">
export default {
  name: 'BydCar'
}
</script>
<style lang="scss" scoped></style>
