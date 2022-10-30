import { createRouter, createWebHashHistory } from 'vue-router'
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
        path: '/texture',
        name: 'TexTure',
        // 设置按需加载
        component: () => import('@/views/texture/index.vue'),
        meta: {
          title: '纹理内容 '
        }
      },
      {
        path: '/envmap',
        name: 'EnvMap',
        // 设置按需加载
        component: () => import('@/views/envmap/index.vue'),
        meta: {
          title: '环境贴图'
        }
      },
      {
        path: '/hdr',
        name: 'HdR',
        // 设置按需加载
        component: () => import('@/views/hdr/index.vue'),
        meta: {
          title: 'hdr贴图'
        }
      },
      {
        path: '/shadow',
        name: 'ShaDow',
        // 设置按需加载
        component: () => import('@/views/shadow/index.vue'),
        meta: {
          title: '物体阴影'
        }
      },
      {
        path: '/spotlight',
        name: 'SpotLight',
        // 设置按需加载
        component: () => import('@/views/spotlight/index.vue'),
        meta: {
          title: '聚光灯'
        }
      },
      {
        path: '/lightball',
        name: 'LightBall',
        // 设置按需加载
        component: () => import('@/views/light_ball/index.vue'),
        meta: {
          title: '小灯球'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
