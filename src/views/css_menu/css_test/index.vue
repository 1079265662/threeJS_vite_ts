<template>
  <div>
    <div class="iPhone-box">
      <div class="iPhone-text">
        灵动的 iPhone
        新玩法，迎面而来。重大的安全新功能，为拯救生命而设计。创新的 4800
        万像素主摄，让细节纤毫毕现。更有 iPhone
        芯片中的速度之王，为一切提供强大原动力。
        <div class="bg" />
      </div>
    </div>
    <div class="g-scroll" />
  </div>
</template>
<script lang="ts" setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted } from 'vue'
// 导入gsap ScrollTrigger插件 用于滚动动画 详细文档请查看 https://greensock.com/docs/v3/Installation?checked=core,scrollTrigger#modules
gsap.registerPlugin(ScrollTrigger)
onMounted(() => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.g-scroll', // gsap滚动动画触发器
        start: 'top top', // 开始位置 开始位置为滚动条滚动到触发器顶部时
        end: 'bottom bottom', // 结束位置 结束位置为滚动条滚动到触发器底部时
        scrub: 1 // 滚动动画的速度 类似于过度效果
      }
    })
    .fromTo('.bg', { translateY: 0 }, { translateY: '-75%' }, 0) // translateY 为垂直方向的位移 从0位移到-75%
})
</script>
<script lang="ts">
export default {
  name: 'CssText'
}
</script>
<style lang="scss" scoped>
.iPhone-box {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-size: 48px;
  background: #000;
  .iPhone-text {
    position: relative;
    overflow: hidden;
    max-width: 1400px;
    margin: 0 auto;
    padding: 10px;
    text-align-last: justify;
    white-space: pre-line;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 400%;
      background: linear-gradient(
        -3deg,
        #000,
        #000 25%,
        #ffb6ff 30%,
        #ffb6ff,
        #b344ff,
        #b344ff 70%,
        #000 75%,
        #000
      );
      // animation: textScroll 6s infinite linear alternate;
      mix-blend-mode: darken; // 设置背景 混合模式
      z-index: 1;
    }
  }
}
// @keyframes textScroll {
//   100% {
//     transform: translate(0, -75%);
//   }
// }
.g-scroll {
  width: 100vw;
  height: 2000px;
}
// .iPhone-box {
//   font-size: 48px;
//   .iPhone-text {
//     width: 100%;
//     background: linear-gradient(
//       -4deg,
//       transparent,
//       transparent 25%,
//       #ffb6ff,
//       #b344ff,
//       transparent 75%,
//       transparent
//     );
//     background-clip: text;
//     -webkit-background-clip: text;
//     -moz-background-clip: text;
//     color: transparent;
//     background-size: 100% 600%;
//     background-position: center 0%;
//     animation: textScroll 5s infinite linear alternate; // infinite无限循环 linear线性动画 alternate交替动画(循环动画 往返效果)
//   }
// }

// @keyframes textScroll {
//   100% {
//     background-position: center 100%;
//   }
// }
</style>
