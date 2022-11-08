<template>
  <div class="canvas" ref="stateDom" />
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
//导入创建的构造函数
import { CreateWorld } from './components/renderer_soptlight'

// 获取Dom
const stateDom = ref()
// 储存three.js的实例
let Three: any = null

onMounted(() => {
  // 创建three.js实例
  Three = new CreateWorld(stateDom.value)
  // 传递页面Dom 绘制three.js
  Three.createScene()
})

onBeforeUnmount(() => {
  // 销毁three.js实例
  Three.dispose()
  // 保存相机
  Three.saveCamera()
})
</script>
<script lang="ts">
export default {
  name: 'SpotLight'
}
</script>
<style lang="scss" scoped></style>
