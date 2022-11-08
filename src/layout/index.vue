<template>
  <n-layout has-sider>
    <!-- 左侧菜单 -->
    <n-layout-sider
      :native-scrollbar="false"
      class="layOut"
      @collapse="collapsed = true"
      @expand="collapsed = false"
      bordered
      collapse-mode="width"
      :collapsed="collapsed"
      :collapsed-width="0"
      default-expand-all
      :width="240"
      show-trigger
      :inverted="inverted"
    >
      <div class="layoutColor">
        换色
        <n-switch v-model:value="inverted" />
      </div>
      <n-menu
        default-expand-all
        :default-value="defaultValue"
        :inverted="inverted"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="routerList"
        key-field="path"
        label-field="title"
        @update:value="gotoRouter"
      />
    </n-layout-sider>
    <!-- 右侧路由内容1 -->
    <router-view
      :class="[
        'router-box',
        collapsed ? 'router-box-close' : 'router-box-open'
      ]"
    />
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
// 开启对比色(黑暗/白色)
const inverted = ref(true)
// 设置展开/收起状态位
const collapsed = ref(true)
// 获取当前地址 用于设置默认选中菜单
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
  // 设置fixed 使其不随滚动条滚动
  position: fixed;
  top: 0;
  z-index: 99;
  height: 100%;
  width: 100%;
  .layoutColor {
    margin-block: 10px;
  }
}
.router-box {
  position: relative;
  transition: margin-left ease-in-out 0.28s;
  min-height: 100vh;
}
// 开启的时候左边距
.router-box-open {
  margin-left: 240px;
}
// 关不时候的左边距
.router-box-close {
  margin-left: 0px;
}
</style>
