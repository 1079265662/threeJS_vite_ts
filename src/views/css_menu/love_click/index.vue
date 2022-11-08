<template>
  <div
    :class="['loveBox', 'loveRed', loveState ? 'loveBoxAdm' : '']"
    @click="loveThis"
  />
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
const data = reactive({
  // 点击爱心状态
  loveState: false,
  // 爱心防抖
  States: false
})
// 点击爱心
const loveThis = () => {
  if (data.States) return
  data.States = true
  setTimeout(() => {
    data.States = false
    data.loveState = !data.loveState
  }, 1000)
  data.loveState = !data.loveState
}
// 解构导出
const { loveState } = toRefs(data)
</script>

<script lang="ts">
export default {
  name: 'LoveClick'
}
</script>
<style lang="scss" scoped>
// 设置爱心小盒子
.loveBox {
  height: 100%;
  width: 80px;
  margin: 0 auto;
  background-image: url('https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/heart.3c55287.png');
  background-repeat: no-repeat;
  background-size: 2900%;
  cursor: pointer;
}
// 把长条爱心背景图定格到最后
.loveRed {
  background-position: 100%;
}
// 设置点击后的动画效果
.loveBoxAdm {
  animation: sprite5 1s steps(28) forwards;
}
// 设置动画 从第一帧到最后一帧
@keyframes sprite5 {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
}
</style>
