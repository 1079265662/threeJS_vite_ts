<template>
  <div>
    <div ref="stateDom" />
    <!-- 如果是class类中的Vue响应式数据, 在模板中使用需要.value -->
    <LoaDing :loadingNumber="Three?.loadingNumber.value" />
    <!-- 格式化 -->
    <div
      class="absolute left-6 bottom-32 flex flex-col gap-4 lg:left-1/2 lg:bottom-10 lg:-translate-x-1/2 lg:flex-row"
    >
      <div
        @click="cilckColor('珊瑚红')"
        class="color from-red-600 via-red-500 to-gray-200"
      />

      <div @click="cilckColor('幻夜黑')" class="color from-black to-gray-300" />

      <div
        @click="cilckColor('钛白色')"
        class="color from-slate-400 via-slate-200 to-white"
      />

      <div
        @click="cilckColor('极光蓝')"
        class="color from-blue-500 via-sky-400 to-gray-100"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue'
// 导入three.js的构造函数
import { CreatedCanvas } from './components/car_render'

const colorMap = new Map([
  ['珊瑚红', '#9d0b12'],
  ['幻夜黑', '#010304'],
  ['钛白色', '#fdfffe'],
  ['极光蓝', '#0b5d9d']
])

// 获取Dom
const stateDom = ref()
// 通过shallowRef()浅层响应式代理three.js数据
const Three = shallowRef<CreatedCanvas>()
// 点击切换不同颜色
const cilckColor = (mapName: string) => {
  Three.value?.changeCarColor(colorMap.get(mapName))
}

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
<style lang="postcss" scoped>
.color {
  @apply h-10 w-10 rounded-full bg-gradient-to-tr;
}
</style>
