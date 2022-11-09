<template>
  <div class="dashboard">
    <div class="canvas" ref="stateDom" @click="changeTriangle" />
    <n-button class="clear" type="warning" @click="clearThis">
      {{ $b.reset }}
    </n-button>
  </div>
</template>

<script lang="ts" setup>
// 导入Vue组合API
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 导入webgl 渲染方法
import {
  getScene,
  getters,
  scene,
  clear,
  cameraChange,
  controls,
  dispose
} from './components/renderer'
// 导入储存
import { setDistance } from '@/utils/local'
// 实例化 getCurrentInstance 使用原型链对象方法 并且结构proxy
// 获取元素的Dom
const stateDom = ref()

// 添加三角
const changeTriangle = () => {
  getters(scene)
}
// 清除
const clearThis = () => {
  clear(scene)
}
onMounted(() => {
  // 加载webgl
  getScene(stateDom.value)
})
onBeforeUnmount(() => {
  const ret = cameraChange(controls)
  setDistance(Math.trunc(ret).toString())
  dispose()
})
</script>

<script lang="ts">
export default {
  name: 'HoMe'
}
</script>
<style lang="scss" scoped>
.dashboard {
  position: relative;
  .clear {
    position: absolute;
    top: 10px;
    margin: $paddings;
  }
}
</style>
