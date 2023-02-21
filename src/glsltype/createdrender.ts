/**
 * three.js渲染的公共方法类
 */
// 导入公共类
import { Type } from './type'

export class CreatedRender extends Type {
  // 尺寸变化时调整渲染器大小
  onWindowResize = () => {
    // 解构window对象
    const { innerWidth, innerHeight, devicePixelRatio } = window
    // 更新相机的宽高比
    this.camera.aspect = innerWidth / innerHeight
    // 更新摄像机的投影矩阵
    this.camera.updateProjectionMatrix()
    // 更新渲染器
    this.renderer.setSize(innerWidth, innerHeight)
    // 更新渲染器的像素比
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  }

  // 监听窗口变化
  onAddEventListener = () => {
    // 实现画面变化 更新渲染的内容
    window.addEventListener('resize', this.onWindowResize)
  }

  // 销毁渲染内容
  dispose = () => {
    // 清除场景
    this.scene.clear()
    // 清除轨道控制器
    this.controls.dispose()
    // 清除渲染器
    this.renderer.dispose()
    // 释放内存
    // this.renderer.forceContextLoss()
    // 清除动画
    cancelAnimationFrame(this.animationId)
    // 销毁监听
    window.removeEventListener('resize', this.onWindowResize)
  }
}
