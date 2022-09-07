// 1. 定义状态容器和数据
// 2. 定义容器中的state (全局数据状态/储存)
// 3. 仓库中的action的使用

// 引入pinia仓库(容器)
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => {
    return {
      viewWidth: 0,
      viewHeight: 0
    }
  },
  // 计算状态变化 (相当于watch监听数据变化)
  getters: {},
  //  进行一些方法逻辑处理 (相当于methods方法)
  actions: {}
})
