/**
 * @description: 声明加载管理器
 * @param {number | void} total 总大小
 * @param {number | void} loaded 已加载大小
 * @returns {any}
 */
// 导入three.js
import * as THREE from 'three'
// 导入Vue响应式
import { ref } from 'vue'
const loadingNumber = ref(0)

// 模型/hdr加载的方法
export function loadTexture(
  total: number | void,
  loaded: number | void
): any | number {
  loadingNumber.value = 0

  // 对于单独文件的加载进行计算
  if (total && loaded) {
    loadingNumber.value = Number(((loaded / total) * 100).toFixed(2))
    return
  }

  // 对于多个文件的加载使用加载器进行计算
  // 创建加载器
  const manager = new THREE.LoadingManager()
  // 加载中的参数
  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    console.log(url, itemsLoaded, itemsTotal)
    loadingNumber.value = Number(((itemsLoaded / itemsTotal) * 100).toFixed(2))
  }
  return loadingNumber.value
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
