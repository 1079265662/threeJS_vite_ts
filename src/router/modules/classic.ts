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
    path: '/cubephysics',
    name: 'CubePhysics',
    // 设置按需加载
    component: () => import('@/views/classic/cube_physics/index.vue'),
    meta: {
      title: '物理生成'
    }
  },
  {
    path: '/shaderother',
    name: 'ShaDerOther',
    // 设置按需加载
    component: () => import('@/views/threejs_menu/shaderother/index.vue'),
    meta: {
      title: '着色器地板'
    }
  }
  // {
  //   path: '/iphone',
  //   name: 'IPhone',
  //   // 设置按需加载
  //   component: () => import('@/views/classic/iphone/index.vue'),
  //   meta: {
  //     title: '苹果手机'
  //   }
  // }
]
