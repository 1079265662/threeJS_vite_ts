/**
 * three.js渲染的方法
 */

// 导入渲染的公共属性
import { createView } from './change_render'
// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 引入glsl
import planeVertexShader from '../glsl/vertexShader.glsl'
import planeFragmentShader from '../glsl/fragmentShader.glsl'

export class CreateWorld extends createView {
  constructor(canvas: HTMLElement) {
    super()
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

  // 绘制canvas的Dom
  canvas!: HTMLElement | Document | Element

  // 创建时钟
  clock = new THREE.Clock()

  // 创建场景
  createScene = () => {
    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    // this.camera.position.set(0.0, -4.5, 0.5) // 默认没有参数 需要设置参数
    this.camera.position.set(0.0, 0, 10) // 默认没有参数 需要设置参数
    // this.camera.position.set(0.0, -4.5, 0.5) // 默认没有参数 需要设置参数
    // this.camera.fov = this.calcFov(2, 2, innerWidth / innerHeight)
    // this.camera.updateProjectionMatrix()
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 声明一个球体
    const sphere = new THREE.PlaneGeometry(8, 8, 32, 32)

    // 声明一个标准材质
    this.mmaterial = new THREE.RawShaderMaterial({
      // 设置双面显示
      side: THREE.DoubleSide,
      // 顶点着色器 需要设置坐标转换
      vertexShader: planeVertexShader,
      // 片元着色器
      fragmentShader: planeFragmentShader,
      // glsl传入时间
      uniforms: {
        time: { value: 0 }
      }
    })

    // 创建网格模型
    const mesh = new THREE.Mesh(sphere, this.mmaterial)
    // console.log(mmaterial)

    // 添加到场景
    this.scene.add(mesh)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    this.scene.add(light)

    // 创建一个辅助线
    // const axesHelper = new THREE.AxesHelper(20)
    // this.scene.add(axesHelper)

    // 设置渲染器(画布)的大小 通过setSize()设置
    this.renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
    // 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
    this.canvas.appendChild(this.renderer.domElement)

    // 创建创建一个轨道控制器 实现交互渲染
    this.controls = new OrbitControls(this.camera, this.renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
    // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
    this.controls.enableDamping = true

    this.render()
    this.onAddEventListener()
    // 开始转换
    this.moveCamera()
  }

  render = () => {
    // console.log(this.camera.position)

    this.mmaterial.uniforms.time.value = this.clock.getElapsedTime()
    // console.log(this.animationId)
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

  /**
   * 计算相机 fov 的函数
   * @param d : 在相机前方 d 距离
   * @param w : 想要看到最大正方形区域边长为 w
   * @param r : 屏幕宽高比
   */
  // 自适应相机
  calcFov = (d: number, w: number, r: number) => {
    let f = 0
    let vertical = w
    if (r < 1) {
      vertical = vertical / r
    }
    f = Math.atan(vertical / d / 2) * 2 * (180 / Math.PI)
    return f
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
