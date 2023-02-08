import { Type } from './type'
export class createdRender extends Type {
  // 渲染动画
  render = () => {
    // 获得动画执行时间
    const clockTime = this.clock.getElapsedTime()

    // 赋值给uniforms动画执行时间
    this.mmaterial.uniforms.time.value = clockTime
    // 设置阻尼感必须在动画中调用.update()
    this.controls.update()

    // 使用渲染器,通过相机将场景渲染出来
    this.renderer.render(this.scene, this.camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    this.animationId = requestAnimationFrame(this.render)
  }

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
