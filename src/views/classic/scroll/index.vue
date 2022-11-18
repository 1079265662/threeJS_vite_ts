<template>
  <div class="canvas-background">
    <div class="title">
      <div class="index0">Ray投射光线1</div>
      <div>基于光线投射Raycaster</div>
    </div>
    <div class="title">
      <div class="index1">Ray投射光线2</div>
      <div>基于光线投射Raycaster</div>
    </div>
    <div class="title">
      <div class="index2">Ray投射光线3</div>
      <div>基于光线投射Raycaster</div>
    </div>
    <div class="canvas" ref="stateDom" />
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
//导入绘制和销毁
// import { CreateWorld } from './components/scroll_renderer'
import * as THREE from './components/test'
// 获取Dom
const stateDom = ref()
// 储存three.js的实例
let Three: any = null

onMounted(() => {
  // 创建three.js实例
  Three = new THREE.CreateWorld(stateDom.value)
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
  name: 'ScrOll'
}
</script>
<style lang="scss" scoped>
.canvas-background {
  background: #cbe0e0;
  width: 100%;
  .canvas {
    position: fixed;
    top: 0;
    left: 0;
  }
  .title {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
    height: 100vh;
    align-items: center;
    margin-top: 8vh;
    font-size: 36px;
    line-height: 2;
  }
  // .index1 {
  //   transform: rotate(30deg);
  // }
}
</style>
