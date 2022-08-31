<template>
  <main>{{ store.counter }}</main>
</template>
<script lang="ts" setup>
// 导入pinia
import { useCounterStore } from '@/stores/counter'
// 实例化pinia
const store = useCounterStore()
console.log(store)
</script>
