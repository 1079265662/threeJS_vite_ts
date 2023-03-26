<template>
  <div>
    <div ref="stateDom" />
    <!-- 如果是class类中的Vue响应式数据, 在模板中使用需要.value -->
    <LoaDing :loadingNumber="Three?.loadingNumber.value" />
    <!-- 格式化 -->

    <div
      class="absolute left-6 bottom-4 flex flex-col gap-4 lg:left-1/2 lg:bottom-10 lg:-translate-x-1/2 lg:flex-row"
    >
      <div @click="clickAll()" class="button ring-red-500">全部展开</div>

      <div @click="rotateColor()" class="button ring-blue-500">
        <span v-if="isChangeColorVue">自动换色</span>
        <span v-else>暂停换色</span>
      </div>

      <div @click="clickRotate()" class="button ring-gray-800">
        <span v-if="isRotateVue">开始旋转</span>
        <span v-else>暂停旋转</span>
      </div>

      <div @click="clickLight()" class="button ring-gray-400">
        <span v-if="isLightVue">开启车灯</span>
        <span v-else>关闭车灯</span>
      </div>

      <div
        @click="cilckColor('珊瑚红')"
        class="color from-red-600 via-red-500 to-gray-200"
      />

      <div
        @click="cilckColor('极光蓝')"
        class="color from-blue-500 via-sky-400 to-gray-100"
      />

      <div @click="cilckColor('幻夜黑')" class="color from-black to-gray-300" />

      <div
        @click="cilckColor('钛白色')"
        class="color from-slate-400 via-slate-200 to-white"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue'
// 导入three.js的构造函数
import { CreatedCanvas } from './components/car_render'

// 获取Dom
const stateDom = ref()
// 通过shallowRef()浅层响应式代理three.js数据
const Three = shallowRef<CreatedCanvas>()
// 是否在换色
const isChangeColorVue = ref(false)
// 是否在旋转
const isRotateVue = ref(false)
// 是否开启灯光
const isLightVue = ref(true)

// 点击切换不同颜色
const cilckColor = (mapName: string) => {
  // 如果自动颜色切换开启, 则关闭
  if (Three.value?.changeColorTimeline.isActive()) {
    Three.value?.pauseChangeColor()
    isChangeColorVue.value = !isChangeColorVue.value
  }
  Three.value?.changeCarColor(colorMap.get(mapName))
}

// 全部展开
const clickAll = () => {
  Three.value?.openAllCarDoor()
}

// 换皮
const rotateColor = () => {
  if (Three.value?.changeColorTimeline.isActive()) {
    Three.value?.pauseChangeColor()
  } else {
    Three.value?.resumeChangeColor()
  }

  isChangeColorVue.value = !isChangeColorVue.value
}

// 旋转
const clickRotate = () => {
  if (isRotateVue.value) {
    Three.value?.rotateScene()
  } else {
    Three.value?.stopRotateScene()
  }

  isRotateVue.value = !isRotateVue.value
}

// 点击灯光
const clickLight = () => {
  if (isLightVue.value) {
    Three.value?.startLensflare()
  } else {
    Three.value?.removeLensflare()
  }
  isLightVue.value = !isLightVue.value
}

onMounted(() => {
  // 创建three.js实例
  Three.value = new CreatedCanvas(stateDom.value)
  // 传递页面Dom 绘制three.js
  Three.value.createScene()

  // isChangeColorVue.value = Three.value!.changeColorTimeline.isActive()
})

onBeforeUnmount(() => {
  // 销毁three.js实例
  Three.value?.dispose()
  // 移除事件监听
  Three.value?.onRemoveEventListener()
})
</script>

<script lang="ts">
export const colorMap = new Map([
  ['珊瑚红', '#9d0b12'],
  ['幻夜黑', '#0a0a0a'],
  ['钛白色', '#8f8f8f'],
  ['极光蓝', '#0b5d9d']
])
export default {
  name: 'BydCar'
}
</script>
<style lang="postcss" scoped>
.color {
  @apply h-10 w-10 rounded-full bg-gradient-to-tr;
}
.button {
  @apply flex h-11 w-20 cursor-pointer select-none items-center justify-center rounded-md ring-2  backdrop-blur-sm;
}
</style>
