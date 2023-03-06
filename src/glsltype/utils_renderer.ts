/**
 * three.js渲染的工具方法类
 */
// 导入three.js
import * as THREE from 'three'
// 导入公共类
import { CreatedRender } from './createdrender'

export class CreatedUtils extends CreatedRender {
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
}
