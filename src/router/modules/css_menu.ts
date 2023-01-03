export const css_menu = [
  {
    path: '/csstext',
    name: 'CssText',
    // 首页无需按需加载
    component: () => import('@/views/css_menu/css_test/index.vue'),
    meta: {
      title: '滚动字体'
    }
  },
  {
    path: '/cyberpunk',
    name: 'CyberPunk',
    // 设置按需加载
    component: () => import('@/views/css_menu/cyberpunk/index.vue'),
    meta: {
      title: '赛博风格'
    }
  },
  {
    path: '/filter',
    name: 'FilTer',
    // 设置按需加载
    component: () => import('@/views/css_menu/filter/index.vue'),
    meta: {
      title: '自适应字体颜色'
    }
  },
  {
    path: '/loveclick',
    name: 'LoveClick',
    // 首页无需按需加载
    component: () => import('@/views/css_menu/love_click/index.vue'),
    meta: {
      title: '一颗爱心'
    }
  }
]
