/**
 * three.js方法类
 */

// 导入渲染的公共属性
import { Type } from './type'
// 导入gasp
import gsap from 'gsap'

export class createView extends Type {
  constructor() {
    // 接收传入的画布Dom元素
    super()
  }

  // 移动相机位置
  moveCamera = () => {
    gsap.to(this.camera.position, { y: -4.6, duration: 5 })
    gsap.to(this.camera.position, { z: 0.6, duration: 5 })
    // 移动相机
    // this.camera.position.set(0.0, -4.5, 0.6) // 默认没有参数 需要设置参数
    this.camera.updateProjectionMatrix()
  }
}
