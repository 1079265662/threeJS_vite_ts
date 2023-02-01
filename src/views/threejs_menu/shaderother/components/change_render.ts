/**
 * three.js方法类
 */

// 导入渲染的公共属性
import { Type } from './type'
import * as THREE from 'three'
// 导入gasp
import gsap from 'gsap'

export class createView extends Type {
  constructor() {
    // 接收传入的画布Dom元素
    super()
  }
  // 创建二维向量
  mouse = new THREE.Vector2()
  // 监听页面的Dom
  element = document.querySelector('.canvas-background') as HTMLElement

  // 移动相机位置
  moveCamera = () => {
    // 修改相机位置 通过gsap动画
    gsap.to(this.camera.position, { y: -4.3, duration: 3 })
    gsap.to(this.camera.position, { z: 0.6, duration: 3, ease: 'power2.out' })
    // 移动相机
    // this.camera.position.set(0.0, -4.5, 0.6) // 默认没有参数 需要设置参数

    // 监听鼠标移动
    this.element.addEventListener('mousemove', this.mouseMove)
  }

  // 鼠标移动效果
  mouseMove = (item: MouseEvent) => {
    this.mouse.x = (item.clientX / window.innerWidth) * 2 - 1 // -1 ~ 1
  }
}
