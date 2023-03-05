<template>
  <div
    ref="stateDom"
    class="absolute flex flex-row-reverse items-center gap-1 p-2"
  >
    <div
      class="h-auto max-w-md space-x-2 break-all rounded-2xl bg-sky-400 p-1.5 shadow-2xl ring-4 ring-sky-300 ring-opacity-75 backdrop-blur-sm"
    >
      <h1 class="text-lg font-bold">摄像头</h1>

      <h2 class="mt-1 align-middle text-sm">
        5000万三摄系统，全景、广角、微距技能任意释放。 三星GN5超感光主摄，1/1.57
        英寸超大底， 无论抓拍、夜拍，随手拍都能清晰呈现。
      </h2>
    </div>
    <div class="h-0.5 w-28 bg-sky-400" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stateDom = ref

defineExpose({ stateDom })
</script>
<script lang="ts">
export default {
  name: 'TipsIphone'
}
</script>
