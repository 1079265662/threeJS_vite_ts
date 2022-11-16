<template>
  <div>
    <div ref="stateDom" />
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
//导入绘制和销毁
import { Planet } from './components/planet'
// 获取Dom
const stateDom = ref()
// 储存three.js的实例
let Three: any = null

onMounted(() => {
  // 创建three.js实例
  Three = new Planet(stateDom.value)
  console.log(Three)

  // 传递页面Dom 绘制three.js
  Three.createScene()
  Three.createPlanet()
})

onBeforeUnmount(() => {
  // 销毁three.js实例
  Three.dispose()
})
</script>
<script lang="ts">
export default {
  name: 'GalAxy'
}
</script>
<style lang="scss" scoped></style>
