<template>
  <div>
    <div ref="stateDom" />
    <n-button class="radio" type="success" @click="radio" ghost>
      {{ '音 乐' }}
    </n-button>
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
//导入绘制和销毁
import { CreateWorld } from './components/sky_renderer'

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
})

const radio = () => {
  console.log(Three.sound.isPlaying)
  if (Three.sound.isPlaying) {
    Three.sound.stop()
  } else {
    Three.sound.play()
  }
}
</script>
<script lang="ts">
export default {
  name: 'StartSky'
}
</script>
<style lang="scss" scoped>
.radio {
  position: absolute;
  top: 10px;
  margin: $paddings;
}
</style>
