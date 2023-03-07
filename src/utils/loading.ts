// 导入three.js
import * as THREE from 'three'
// 导入加载类型
import type { LoadingManager } from 'three'
// 导入Vue响应式
import { ref } from 'vue'
export const loadingNumber = ref(0)

/**
 * @description: 声明加载管理器
 * @param {number | void} total 总大小
 * @param {number | void} loaded 已加载大小
 * @returns {loadingNumber | any}
 */
// 模型/hdr加载的方法
export function loadTexture(
  total: number | void,
  loaded: number | void
): LoadingManager | any {
  // 重置加载进度

  loadingNumber.value = 0

  // 对于单独文件的加载进行计算(比如hdr)
  if (total && loaded) {
    loadingNumber.value = Number(((loaded / total) * 100).toFixed(2))
    return
  }

  // 创建加载器
  const manager = new THREE.LoadingManager()

  // 加载中的参数  url被加载的项的url itemsLoaded目前已加载项的个数 itemsTotal总共所需要加载项的个数。
  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    // 获取加载百分比: 已加载个数 / 总数量 * 100 计算出加载百分比 并取两位小数
    loadingNumber.value = Number(((itemsLoaded / itemsTotal) * 100).toFixed(2))
  }

  // 返回加载管理器的变量(一般用不到, 特殊请倪哥看需要)
  return manager
}

/**
 * @description: 假的加载管理器
 * @returns {}
 */
export function loadFalse(loadingIng = false) {
  // 重置加载进度
  loadingNumber.value = 0

  const i = setInterval(() => {
    // 加载完成清除定时器
    if (loadingIng) {
      loadingNumber.value = 100
      // 加载完成后清除定时器
      clearInterval(i)
    } else {
      // 0到3之间随机数
      const random = Math.floor(Math.random() * 2 + 0)
      // 不能能超过98, 到98就卡住
      if (loadingNumber.value >= 98) return
      // 每次加1
      loadingNumber.value += random
    }
  }, 50)
}

/**
 * @description: 声明加载管理器
 * @returns {any}
 */
// export function loading(): THREE.LoadingManager | any {
//   loadingNumber.value = 0

//   // 创建加载器
//   const manager = new THREE.LoadingManager()
//   // 加载中的参数
//   manager.onProgress = (url, itemsLoaded, itemsTotal) => {
//     loadingNumber.value = Number(((itemsLoaded / itemsTotal) * 100).toFixed(2))
//   }

//   return loadingNumber.value
// }
