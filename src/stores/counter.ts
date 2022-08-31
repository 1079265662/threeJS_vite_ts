// 1. 定义状态容器和数据
// 2. 定义容器中的state (全局数据状态/储存)
// 3. 仓库中的action的使用

// 引入pinia仓库(容器)
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  // 给仓库起一个名称(唯一标识)
  id: 'counter',
  // 声明状态 储存数据 (相当于data储存数据)
  state: () => ({
    counter: 23123
  }),
  // 计算状态变化 (相当于watch监听数据变化)
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  //  进行一些方法逻辑处理 (相当于methods方法)
  actions: {
    increment() {
      this.counter++
    }
  }
})
