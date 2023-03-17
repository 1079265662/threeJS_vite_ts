// utils_renderer.ts
/**
 * three.js渲染的工具方法类
 */

// 导入three.js
import * as THREE from 'three'
// 导入公共类
import { CreatedRender } from './createdrender'
// 导入加载类型
import type { LoadingManager } from 'three'
// 导入Vue响应式
import { ref } from 'vue'

export class CreatedUtils extends CreatedRender {
  // 加载的进度
  loadingNumber = ref(0)

  /**
   * @description 设置包围盒
   * @param THREE.Object3D 传入的物体
   */
  getBoxSize = (object: THREE.Object3D) => {
    // 创建一个包围盒
    const box = new THREE.Box3()

    // 设置包围盒的大小
    box.setFromObject(object)
    // 获取包围盒的大小
    const boxSize = box.getSize(new THREE.Vector3())
    console.log(`当前物体的大小(包围盒)`, boxSize)

    return boxSize
  }

  /**
   * @description 设置平行光可视化
   * @param THREE.DirectionalLight 传入平行光光源
   */
  setLightHelper = (light: THREE.DirectionalLight) => {
    // 创建一个可视化灯光
    const helper = new THREE.DirectionalLightHelper(light, 5)
    // 添加到场景中
    this.scene.add(helper)
  }

  /**
   * @description 创建辅助线
   * @param length 传入辅助线的长度
   */
  addaxesHelper = (length = 10) => {
    // 创建一个辅助线
    const axesHelper = new THREE.AxesHelper(length)
    // 添加到场景中
    this.scene.add(axesHelper)

    return axesHelper
  }

  /**
   * @description 计算全屏下的webgl设备坐标
   * @param item 传入的鼠标事件
   */
  calculateFullXY = (item: MouseEvent) => {
    const { clientX, clientY } = item
    // 创建二维向量 用于记录鼠标的位置
    const mouse = new THREE.Vector2()

    // mousemove 鼠标移动事件 还可以替换其他时间click等
    // 将鼠标点击位置的屏幕坐标转换成three.js中的标准设备坐标
    mouse.x = (clientX / window.innerWidth) * 2 - 1 // X轴坐标 2个单位 -1到1
    mouse.y = -((clientY / window.innerHeight) * 2 - 1) // Y轴坐标 2个单位 -1到1 这里需要反转一下 因为在JS/CSS坐标中Y轴是反的

    return mouse
  }

  /**
   * @description: GLTF模型进度加载器
   * @returns LoadingManager | undefined
   */
  createLoadingGLTF = (): LoadingManager | undefined => {
    // 创建加载器
    const manager = new THREE.LoadingManager()

    // 加载中的参数  url被加载的项的url itemsLoaded目前已加载项的个数 itemsTotal总共所需要加载项的个数。
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      // 获取加载百分比: 已加载个数 / 总数量 * 100 计算出加载百分比 并取两位小数
      this.loadingNumber.value = Number(
        ((itemsLoaded / itemsTotal) * 100).toFixed(2)
      )
      console.log(this.loadingNumber)
    }

    return manager
  }

  /**
   * @description: 假的加载管理器
   * @returns {}
   */
  createLoadingFalse = (loadingIng = false) => {
    const i = setInterval(() => {
      // 加载完成清除定时器
      if (loadingIng) {
        this.loadingNumber.value = 100
        // 加载完成后清除定时器
        clearInterval(i)
      } else {
        // 0到3之间随机数
        const random = Math.floor(Math.random() * 2 + 0)
        // 不能能超过98, 到98就卡住
        if (this.loadingNumber.value >= 98) return
        // 每次加1
        this.loadingNumber.value += random
      }
    }, 50)
  }
}
