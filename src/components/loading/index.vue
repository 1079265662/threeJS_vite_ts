<template>
  <transition name="fade">
    <div id="loading-mask" v-if="visible">
      <div class="loadingLine">
        <n-progress
          style="max-width: 300px"
          :percentage="loadingNumberFixed"
          :indicator-placement="'inside'"
          processing
        />
      </div>
      <!-- <div class="container">
        <div class="support">
          <div class="dot" />
        </div>
        <div class="support">
          <div class="dot" />
        </div>
        <div class="support">
          <div class="dot" />
        </div>
        <div class="support">
          <div class="dot" />
        </div>
        <div class="support">
          <div class="dot" />
        </div>
        <div class="support">
          <div class="dot" />
        </div>
        <p class="txt">模型正在加载中</p>
      </div> -->
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
const visible = ref(true)

const props = defineProps({
  loadingNumber: {
    type: Number,
    default: 0
  }
})

// 计算属性 取消小数点 不是整数会报错
const loadingNumberFixed = computed(() =>
  Number(props.loadingNumber.toFixed(0))
)

// 监听加载
watch(
  () => props.loadingNumber,
  (newVal: number) => {
    if (newVal >= 100) {
      visible.value = false
    }
  }
)
</script>
<script lang="ts">
export default {
  name: 'LoaDing'
}
</script>
<style lang="scss" scoped>
$pointColor: rgba(255, 255, 255, 1);
#loading-mask {
  position: absolute;
  left: 0;
  top: 0;
  user-select: none;
  z-index: 10;
  overflow: hidden;
  background: hsla(0, 0%, 100%, 0.1);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 5px rgba(139, 136, 136, 0.6);
  height: 100%;
  width: 100%;
  cursor: wait;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.txt {
  position: relative;
  top: 3rem;
  font-family: sans-serif;
  color: $pointColor;
}

.support {
  width: 2rem;
  height: 2rem;
  position: absolute;
  animation: rotation 3.8s linear infinite;
}

.support:nth-child(1) {
  animation-delay: 0.15s;
}

.support:nth-child(2) {
  animation-delay: 0.3s;
}

.support:nth-child(3) {
  animation-delay: 0.45s;
}

.support:nth-child(4) {
  animation-delay: 0.6s;
}

.support:nth-child(5) {
  animation-delay: 0.75s;
}

.support:nth-child(6) {
  animation-delay: 0.9s;
}

@keyframes rotation {
  0% {
    opacity: 0.8;
  }

  30% {
    transform: rotate(180deg);
    opacity: 1;
  }

  40% {
    transform: rotate(360deg);
    opacity: 1;
  }

  80% {
    transform: rotate(720deg);
    opacity: 0.8;
  }

  81% {
    opacity: 0;
  }

  100% {
    transform: rotate(0deg);
    opacity: 0;
  }
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $pointColor;
  position: relative;
  top: 37px;
  left: 7px;
}
.loadingLine {
  display: grid;
  place-items: center;
  // max-width: 400px;
  height: 100%;
}
</style>
