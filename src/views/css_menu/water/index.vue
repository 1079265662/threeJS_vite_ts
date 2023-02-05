<template>
  <div>
    <div v-focus class="ripple-effect">Button</div>
  </div>
</template>
<script lang="ts" setup></script>
<script lang="ts">
export default {
  name: 'WatEr'
}
</script>
<style lang="scss" scoped>
.ripple-effect {
  position: absolute;
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: scale 0.5s ease-out;
}

/* 水波涟漪逐渐放大并慢慢消失 */
@keyframes scale {
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}
</style>
