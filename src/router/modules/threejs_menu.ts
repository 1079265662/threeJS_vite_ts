export const threejs_menu = [
  {
    path: '/texture',
    name: 'TexTure',
    // 设置按需加载
    component: () => import('@/views/threejs_menu/texture/index.vue'),
    meta: {
      title: '纹理内容 '
    }
  },
  {
    path: '/envmap',
    name: 'EnvMap',
    // 设置按需加载
    component: () => import('@/views/threejs_menu/envmap/index.vue'),
    meta: {
      title: '环境贴图'
    }
  },
  {
    path: '/hdr',
    name: 'HdR',
    // 设置按需加载
    component: () => import('@/views/threejs_menu/hdr/index.vue'),
    meta: {
      title: 'hdr贴图'
    }
  },
  {
    path: '/shadow',
    name: 'ShaDow',
    // 设置按需加载
    component: () => import('@/views/threejs_menu/shadow/index.vue'),
    meta: {
      title: '物体阴影'
    }
  },
  {
    path: '/spotlight',
    name: 'SpotLight',
    // 设置按需加载
    component: () => import('@/views/threejs_menu/spotlight/index.vue'),
    meta: {
      title: '聚光灯'
    }
  },
  {
    path: '/lightball',
    name: 'LightBall',
    // 设置按需加载
    component: () => import('@/views/threejs_menu/light_ball/index.vue'),
    meta: {
      title: '小灯球'
    }
  },
  {
    path: '/pointlight',
    name: 'PointLight',
    // 设置按需加载
    component: () => import('@/views/threejs_menu/point_light/index.vue'),
    meta: {
      title: '点材质'
    }
  }
]
