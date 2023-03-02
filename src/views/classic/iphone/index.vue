<template>
  <div class="relative">
    <div ref="stateDom" />
    <LoaDing :loadingNumber="loadingNumber" />

    <div
      class="absolute bottom-56 right-20 grid place-items-center lg:right-1/2 lg:bottom-20 lg:translate-x-1/2"
      @click="changRotate"
    >
      <div v-show="!pause" class="cursor-pointer select-none text-3xl">▶️</div>
      <div v-show="pause" class="cursor-pointer select-none text-3xl">⏸︎</div>
    </div>
    <!-- 格式化 -->
    <div
      class="absolute right-6 bottom-32 flex flex-col gap-4 lg:right-1/2 lg:bottom-10 lg:translate-x-1/2 lg:flex-row"
    >
      <div
        @click="cilckColor('极光紫')"
        class="color from-purple-600 via-purple-500 to-rose-400"
      />
      <div @click="cilckColor('幻夜黑')" class="color from-black to-gray-300" />
      <div
        @click="cilckColor('珊瑚红')"
        class="color from-red-600 via-red-500 to-gray-200"
      />
      <div
        @click="cilckColor('极光蓝')"
        class="color from-blue-500 via-sky-400 to-gray-100"
      />
    </div>
    <TipsIphone />
  </div>
</template>
<script setup lang="ts">
// 导入提示组件
import TipsIphone from './components_vue/tips.vue'
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 导入实例
import { CreatedCanvas } from './components/iphone_render'
// 导入加载的进度
import { loadingNumber } from '@/utils/loading'

// 获取Dom
const stateDom = ref()
// 暂停启动
const pause = ref(true)

// 储存three.js的实例
let Three: CreatedCanvas

// 点击切换不同颜色
const cilckColor = (mapName: string) => {
  Three.changeIphoneMap(mapName)
}

// 暂停启动旋转
const changRotate = () => {
  // 停止物体旋转
  pause.value = !pause.value
  Three.rotateButton = pause.value

  // 全局暂停, 清除动画, 节省性能, 但是没有交互效果
  // if (pause.value) {
  //   Three.stopRender()
  // } else {
  //   Three.stop()
  // }
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
/* .absoluteDiv {
  @apply ;
} */
</style>
