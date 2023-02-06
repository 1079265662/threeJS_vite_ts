<template>
  <div class="button-out">
    <div class="ripple-water-global" />
    <div v-focus class="button-water">Button</div>
  </div>
</template>
<script lang="ts" setup></script>
<script lang="ts">
export default {
  name: 'WatEr'
}
</script>
<style lang="scss" scoped>
.button-out {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .button-water {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    border: 2px solid #95e3cc;
    background-color: #13295a;
    user-select: none;
  }
}
</style>
