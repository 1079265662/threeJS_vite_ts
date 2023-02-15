// 导入公共方法类
import { CreatedRender } from '@/glsltype/createdrender'
// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class CreatedCanvas extends CreatedRender {
  constructor(canvas: HTMLElement) {
    super()
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

  // 绘制canvas的Dom
  canvas!: HTMLElement | Document | Element

  // 球体长宽
  sphereNumber = {
    radius: 2
  }

  // 创建场景
  createScene = () => {
    const { radius } = this.sphereNumber

    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 5, 20) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 声明一个球体
    const sphere = new THREE.SphereGeometry(radius, 32, 32)

    // 创建网格模型
    const mesh = new THREE.Mesh(sphere, this.mmaterial)
    // 添加到场景
    this.scene.add(mesh)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    this.scene.add(light)

    // 创建一个辅助线
    const axesHelper = new THREE.AxesHelper(20)
    this.scene.add(axesHelper)

    // 设置渲染器(画布)的大小 通过setSize()设置
    this.renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
    // 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
    this.canvas.appendChild(this.renderer.domElement)

    // 创建创建一个轨道控制器 实现交互渲染
    this.controls = new OrbitControls(this.camera, this.renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
    // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
    this.controls.enableDamping = true
    // 禁用轨道控制器
    // this.controls.enabled = false

    // 渲染方法
    this.render()
    // 添加监听画布大小变化
    this.onAddEventListener()
  }

  // 渲染动画
  render = () => {
    // 获得动画执行时间
    // const clockTime = this.clock.getElapsedTime()

    // 设置阻尼感必须在动画中调用.update()
    this.controls.update()

    // 使用渲染器,通过相机将场景渲染出来
    this.renderer.render(this.scene, this.camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    this.animationId = requestAnimationFrame(this.render)
  }
}
