import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 导入清除默认样式css
import 'reset-css'

// 导入按钮配置
import { button } from '@/settings'
// 创建Vue3要添加的原型链方法
const ret = {
  install(App: any) {
    // 通过config.globalProperties给其添加原型链方法
    // app.config.globalProperties.$要创建的原型链方法名 = 创建的虚拟Dom方法
    App.config.globalProperties.$b = button
  }
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ret)
app.mount('#app')
