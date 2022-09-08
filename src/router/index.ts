import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/dashboard/index.vue'
// 导入通用配置
import { viewSettings } from '@/settings'
/* Layout */
import Layout from '@/layout/index.vue'

const routes = [
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
      {
        path: '/about',
        name: 'about',
        // 设置按需加载
        component: () => import('@/views/AboutView.vue'),
        meta: {
          title: '关于'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 设置路由title
router.beforeEach((to, from, next) => {
  // 把路由title 和 默认title拼接起来
  document.title = `${to.meta.title} - ${viewSettings.title}`
  next()
})

export default router
export { routes }
