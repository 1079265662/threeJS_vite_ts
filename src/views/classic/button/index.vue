<template>
  <div class="cyberpunk-box">
    <div class="cyberpunk-main">
      <!-- 赛博文标题-->
      <div class="cyberpunk-title glitched">
        标题请求失败
        <span class="cyberpunk-underline">_</span>
      </div>
      <!-- 霓虹灯效果 -->
      <div>
        <span class="neon">CYBER</span>
        <span class="flux">PUNK</span>
      </div>
      <!-- 不规则致幻文本 -->
      <p class="cyberpunk-text dotted">
        经典的赛博朋克角色是边缘且性格疏远的独行者。他们生活在社会群体的边缘，一个弥漫反乌托邦氛围的未来：日常生活受到急剧改变的科技影响，普及的计算机化信息笼罩全球，以及侵入性的人体改造。
      </p>
      <!-- 赛博图片 -->
      <div class="image-box" @mouseenter="viewHover" @mouseleave="viewLeave">
        <div class="view-image" />
        <div ref="viewImageAfter" class="view-image-after" />
      </div>
      <!-- 赛博按钮 -->
      <a href="https://www.cyberpunk.net/hk/zh-cn/" target="_blank">
        <button>{{ text.replace(/\'/g, '') }}</button>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 想让伪类选择器content的内容通过v-bind绑定 就需要 "''" 包裹
const text = ref("'赛博朋克2077'")
// 获取需要剪裁的元素
const viewImageAfter = ref()
// 图片的地址
const url = ref(
  'https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image/wallhaven-wq8zyp.png'
)
// 拼接图片的地址作为背景使用
const backgroundImage = ref(`url(${url.value})`)

// 鼠标移入图片时触发的事件
const viewHover = () => {
  // 添加动画类名
  viewImageAfter.value?.classList.add('view-image-after-animation')
}
// 鼠标移出图片时触发的事件
const viewLeave = () => {
  // 移除动画类名
  viewImageAfter.value?.classList.remove('view-image-after-animation')
}
</script>

<script lang="ts">
export default {
  name: 'ButtOn'
}
</script>
<style lang="scss" scoped>
@import './titile.scss';
@import './light.scss';
@import './text.scss';
// 设置动画剪裁参数
$slice-0: inset(50% 50% 50% 50%); // 还原不切割
$slice-1: inset(80% -6px 0 0);
$slice-2: inset(50% -6px 30% 0);
$slice-3: inset(10% -6px 85% 0);
$slice-4: inset(40% -6px 43% 0);
$slice-5: inset(80% -6px 5% 0);

.cyberpunk-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f2f31f;
  .cyberpunk-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    height: 100%;
    width: 1000px;
  }
}

// 图片的样式
.image-box {
  position: relative;
}
.view-image,
.view-image-after {
  width: 600px;
  height: 380px;
  background: v-bind('backgroundImage') no-repeat;
  background-size: cover;
  box-shadow: 6px 0px 0px 0px #00e6f6;
}
.view-image-after {
  position: absolute;
  top: 0;
  left: 0;
  // transform: translateX(-30px);
}
.view-image-after-animation {
  // 设置动画 1s 2帧(步长)
  animation: 1.5s buttonFrames infinite alternate steps(2, start);
  // animation-timing-function: steps(2, start);
}

// 按钮的样式
button,
button::after {
  // 设置相对定位
  position: relative;
  width: 380px;
  height: 86px;
  line-height: 86px;
  color: #fff;
  font-size: 36px;
  // 设置字体间具
  letter-spacing: 3px;
  cursor: pointer;
  // 取消边框
  border: none;
  // 取消按钮默认点击时的阴影
  outline: none;
  // 设置一个渐变的背景并且进行旋转
  background: linear-gradient(45deg, transparent 5%, #ff3040 5%);
  // 设置右侧阴影
  box-shadow: 6px 0px 0px 0px #00e6f6;
}
// 通过伪类设置一个相同的按钮
button::after {
  content: v-bind('text');
  // 通过绝对定位将伪类放在原来按钮的上面
  position: absolute;
  top: 0;
  left: 0;
  // 比原来的按钮多出一点蓝色
  background: linear-gradient(
    45deg,
    transparent 3%,
    #00e6f6 3%,
    5%,
    #ff3040 5%
  );
  // 设置字体阴影 上下黄色 左右蓝色
  text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
  // 设置按钮的默认切割(不切割效果)
  clip-path: $slice-0;
  // transform: translateX(-20px);
}
button:hover::after {
  // 设置动画 1s 2帧(步长)
  animation: 1s buttonFrames steps(2, start);
  // animation-timing-function: steps(2, start);
}
// 定义切割动画
@keyframes buttonFrames {
  0% {
    clip-path: $slice-1;
    transform: translate(-20px, -10px);
    filter: blur(2px);
  }

  10% {
    clip-path: $slice-3;
    transform: translate(10px, 10px);
  }

  20% {
    clip-path: $slice-1;
    transform: translate(-10px, 10px);
  }

  30% {
    clip-path: $slice-3;
    transform: translate(0px, 5px);
  }

  40% {
    clip-path: $slice-2;
    transform: translate(-5px, 0px);
  }

  50% {
    clip-path: $slice-3;
    transform: translate(5px, 0px);
  }

  60% {
    clip-path: $slice-4;
    transform: translate(5px, 10px);
  }

  70% {
    clip-path: $slice-2;
    transform: translate(-10px, 10px);
  }

  80% {
    clip-path: $slice-5;
    transform: translate(20px, -10px);
  }

  90% {
    clip-path: $slice-1;
    transform: translate(-10px, 0px);
  }

  100% {
    clip-path: $slice-1;
    transform: translate(0);
    filter: blur(0px);
  }
}
</style>
