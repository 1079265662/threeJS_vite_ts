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
  },
  {
    path: '/scroll',
    name: 'ScrOll',
    // 设置按需加载
    component: () => import('@/views/classic/scroll/index.vue'),
    meta: {
      title: '滚动效果'
    }
  },
  {
    path: '/cyberpunk',
    name: 'CyberPunk',
    // 设置按需加载
    component: () => import('@/views/classic/cyberpunk/index.vue'),
    meta: {
      title: '赛博风格'
    }
  }
]
