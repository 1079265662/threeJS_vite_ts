<template>
  <div>
    <div ref="stateDom" @click="clickView($event)" />
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
//导入绘制和销毁
import { CreateWorld } from './components/cube_renderer'
// 导入three.js

// 获取Dom
const stateDom = ref()
// 储存three.js的实例
let Three: any = null

// 点击事件
const clickView = (e: MouseEvent | any[]) => {
  Three.createBoxPhysics()
}

onMounted(() => {
  // 创建three.js实例
  Three = new CreateWorld(stateDom.value)
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
  name: 'CubePhysics'
}
</script>
<style lang="scss" scoped></style>
