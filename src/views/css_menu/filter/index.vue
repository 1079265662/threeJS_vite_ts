<template>
  <div class="background">
    <div class="background-picker">
      <n-color-picker
        placement="top"
        :default-value="backgroundColor"
        :modes="['hex']"
        :on-update:value="completeColor"
      />
    </div>
    <div class="background-filter">
      <span class="background-text">通过filter滤镜属性自适应背景颜色</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const backgroundColor = ref('#FF3040FF')
const completeColor = (color: string) => {
  backgroundColor.value = color
}
</script>
<script lang="ts">
export default {
  name: 'FilTer'
}
</script>
<style lang="scss" scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  .background-picker {
    width: 400px;
    height: 50px;
  }
  .background-filter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 100px;
    font-size: 20px;
    color: v-bind('backgroundColor');
    background-color: currentColor;
    > span {
      filter: grayscale(1) contrast(999) invert(1);
    }
  }
}
</style>
