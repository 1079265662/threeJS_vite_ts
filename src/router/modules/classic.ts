export const classic = [
  {
    path: '/startsky',
    name: 'StartSky',
    // 设置按需加载
    component: () => import('@/views/classic/sky/index.vue'),
    meta: {
      title: '星空'
    }
  }
]
