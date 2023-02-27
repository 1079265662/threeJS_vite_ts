<template>
  <div>
    <div ref="stateDom" />
    <!-- <LoaDing :loadingNumber="loadingNumber" /> -->

    <!-- 格式化 -->
    <div
      class="absolute left-2/4 bottom-5 flex -translate-x-2/4 gap-4 lg:bottom-14"
    >
      <div
        @click="cilckColor()"
        class="color from-purple-600 via-purple-500 to-rose-400"
      />
      <div @click="cilckColor()" class="color from-black to-gray-300" />
      <div
        @click="cilckColor()"
        class="color from-red-600 via-red-500 to-gray-200"
      />
      <div
        @click="cilckColor()"
        class="color from-sky-500 via-sky-300 to-gray-100"
      />
    </div>
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
let Three: CreatedCanvas

// 点击事件
const cilckColor = () => {
  Three.createGlassPanel()

  const ret = Three.glassPanel

  setTimeout(() => {
    Three.clearGlassPanel()
  }, 3000)
}

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
<style lang="postcss" scoped>
.color {
  @apply h-10 w-10 rounded-full bg-gradient-to-tr;
}
</style>
