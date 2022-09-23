<template>
  <n-layout has-sider class="layOut">
    <n-layout-sider @collapse="collapsed = true" @expand="collapsed = false" bordered collapse-mode="width" :collapsed="collapsed" :collapsed-width="0" default-expand-all :width="240" show-trigger :inverted="inverted">
      <div class="layoutColor">
        换色
        <n-switch v-model:value="inverted" />
      </div>
      <n-menu default-expand-all :default-value="defaultValue" :inverted="inverted" :collapsed-width="64" :collapsed-icon-size="22" :options="routerList" key-field="path" label-field="title" @update:value="gotoRouter" />
    </n-layout-sider>
    <router-view />
  </n-layout>
</template>

<script lang="ts" setup>
// 导入naive
// 导入路由菜单
import { routes } from '@/router/index'
import { ref } from 'vue'
// 导入操作路由方法
import { useRouter, useRoute } from 'vue-router'
// 注册操作路由方法
const router = useRouter()
const route = useRoute()
// 储存变量
const inverted = ref(true)
const collapsed = ref(true)
// 获取当前地址 进行赋值
const defaultValue = ref(route.path)
// 储存处理好的路由菜单
const routerList = ref([])

/**
 * @description: 递归路由
 * @param routerList 是一个空数组
 * @param routes routes是路由菜单
 * @returns
 */
const getRouterList = (routerList: any[], routes: any[]) => {
  for (const item of routes) {
    // 解构数据
    const {
      meta: { title = '暂无标题', icon = undefined },
      path,
      component
    } = item

    // 设置路由
    const meun: any = {
      title,
      path,
      icon,
      component,
      // 准备子节点容器
      children: []
    }

    // 判断是否含有子节点
    if (item.children) {
      // 如果含有子节点 提取出子节点容器 并拿到数据的子节点再次进行添加
      getRouterList(meun.children, item.children)
    } else {
      delete meun.children
    }

    routerList.push(meun)
  }

  return routerList
}

// 处理路由菜单
getRouterList(routerList.value, routes)

// 点击路由进行跳转
const gotoRouter = (e: string) => {
  router.push(e)
}
</script>
<script lang="ts">
export default {
  name: 'LayOut'
}
</script>
<style lang="scss" scoped>
.layOut {
  // height: 100vh;
  // max-width: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  width: 100%;
  max-width: none;
  .layoutColor {
    margin-block: 10px;
  }
}
:deep(.n-layout-sider .n-layout-sider-scroll-container) {
  max-width: none;
}
</style>
