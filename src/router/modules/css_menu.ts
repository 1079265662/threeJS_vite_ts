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
    path: '/loveclick',
    name: 'LoveClick',
    // 首页无需按需加载
    component: () => import('@/views/css_menu/love_click/index.vue'),
    meta: {
      title: '一颗爱心'
    }
  }
]
