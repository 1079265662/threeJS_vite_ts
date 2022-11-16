export const classic = [
  {
    path: '/startsky',
    name: 'StartSky',
    // 设置按需加载
    component: () => import('@/views/classic/sky/index.vue'),
    meta: {
      title: '下雪啦'
    }
  },
  {
    path: '/galaxy',
    name: 'GalAxy',
    // 设置按需加载
    component: () => import('@/views/classic/galaxy/index.vue'),
    meta: {
      title: '银河'
    }
  }
]
