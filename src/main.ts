import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// 导入自定义指令
import { water } from './directives'
// 导入清除默认样式css
import 'reset-css'
// 导入Naive UI全局样式
import './styles/naive-ui.scss'
// 导入vue全局样式
import './styles/global.scss'
// 导入按钮配置
import { button } from './settings'
// 导入加载组件
import loading from './components/loading/index.vue'

// 创建Vue3要添加的原型链方法
const ret = {
  install(App: any) {
    // 通过config.globalProperties给其添加原型链方法
    // app.config.globalProperties.$要创建的原型链方法名 = 创建的虚拟Dom方法
    App.config.globalProperties.$b = button
  }
}

export const app = createApp(App)
app.component('LoaDing', loading)
app.use(createPinia())
app.use(router)
app.use(ret)
app.mount('#app')

// 调用自定义指令
water(app)
