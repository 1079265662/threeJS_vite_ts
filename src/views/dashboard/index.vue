<template>
  <div class="canvas" ref="stateDom" @click="changeTriangle" />
  <n-button class="clear" type="warning" @click="clearThis"> {{ $b.reset }} </n-button>
</template>

<script lang="ts" setup>
// 导入Vue组合API
import { ref, onMounted } from 'vue'
// 导入webgl 渲染方法
import { getScene, getters, scene, clear } from './components/renderer'
// 导入getCurrentInstance 使用原型链对象方法
import { getCurrentInstance } from 'vue'
// 实例化 getCurrentInstance 使用原型链对象方法 并且结构proxy
const { proxy } = getCurrentInstance() as any
// 使用原型链上的内容
console.log(proxy.$b.reset)

// 添加三角
const changeTriangle = () => {
  getters(scene)
}
// 清除
const clearThis = () => {
  clear(scene)
}
// 获取元素的Dom
const stateDom = ref()
onMounted(() => {
  // 加载webgl
  getScene(stateDom.value)
})
</script>

<script lang="ts">
export default {
  name: 'HoMe'
}
</script>
<style lang="scss" scoped>
.canvas {
  position: absolute;
  top: 0;
  left: 0;
}
.clear {
  margin: $paddings;
}
</style>
