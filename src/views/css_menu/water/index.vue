<template>
  <div class="button-out">
    <div v-waterClick class="button-water">Button</div>
    <!-- <div v-focus>
      <img
        width="600"
        height="350"
        src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302061553712.jpeg"
      />
    </div> -->
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
  flex-direction: column;
  gap: 20px;
  width: 100%;
  .button-water {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    border: 2px solid #95e3cc;
    background-color: #13295a;
    user-select: none;
  }
}
</style>
