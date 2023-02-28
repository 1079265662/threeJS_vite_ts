import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/threejs_menu/dashboard/index.vue'
// 导入通用配置
import { viewSettings } from '@/settings'
/* Layout */
// import Layout from '@/layout/index.vue'
// 使用动态导入/懒加载
const Layout = () => import('@/layout/index.vue')
// 导入拆分的路由
import { css_menu } from './modules/css_menu'
import { threejs_menu } from './modules/threejs_menu'
import { classic } from './modules/classic'

// 导出路由(菜单)
const routesExport = [
  {
    path: '/',
    component: Layout,
    meta: <any>{
      title: 'webgl学习目录'
    },
    children: [
      {
        path: '/',
        name: 'HoMe',
        // 首页无需按需加载
        component: HomeView,
        meta: {
          title: '破碎的玻璃'
        }
      },
      ...threejs_menu
    ]
  },
  {
    path: '/classic',
    component: Layout,
    meta: <any>{
      title: 'webgl作品'
    },
    children: [...classic]
  },
  {
    path: '/css',
    component: Layout,
    meta: <any>{
      title: 'CSS操练场'
    },
    children: [...css_menu]
  }
]

// 内部路由
const routesInside = [
  {
    path: '/:catchAll(.*)',
    redirect: '/iphone'
  }
]

// 合并路由
const routesAll = [...routesExport, ...routesInside]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routesAll
})

// 设置路由title
router.beforeEach((to, from, next) => {
  // 把路由title 和 默认title拼接起来
  document.title = `${to.meta.title} - ${viewSettings.title}`
  next()
})

export default router
export { routesExport }
