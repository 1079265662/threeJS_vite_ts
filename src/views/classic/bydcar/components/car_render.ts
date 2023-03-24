import { ChangeCar } from './change_car'
// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class CreatedCanvas extends ChangeCar {
  constructor(canvas: HTMLElement) {
    super()
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

  // 创建场景
  createScene = () => {
    // 修改渲染编码
    this.renderer.outputEncoding = THREE.sRGBEncoding

    // 开始加载的内容
    this.setScene()

    // 创建平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.position.x = 15
    // 把光源添加到相机上
    this.camera.add(directionalLight)

    // // 创建平行光2
    // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
    // // 设置光源的位置
    // directionalLight2.position.set(400, 200, 300)
    // // 把光源添加到场景中
    // this.scene.add(directionalLight2)
    // this.setLightHelper(directionalLight2)

    // // 创建平行光3
    // const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.8)
    // // 设置光源的位置
    // directionalLight3.position.set(-400, -200, -300)
    // // 把光源添加到场景中
    // this.scene.add(directionalLight3)
    // this.setLightHelper(directionalLight3)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.8) // soft white light
    this.scene.add(light)

    // 创建辅助线
    this.addaxesHelper(800)

    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(-249, 234, 220) // 默认没有参数 需要设置参数

    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 设置渲染器(画布)的大小 通过setSize()设置
    this.renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
    // 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
    this.canvas.appendChild(this.renderer.domElement)

    // 创建创建一个轨道控制器 实现交互渲染
    // new OrbitControls(相机, 渲染器Dom元素)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
    this.controls.enableDamping = true
    // 设置控制器的最大距离
    this.controls.maxDistance = 450
    // 设置控制器的最小距离
    this.controls.minDistance = 260
    console.log(Math.PI / 2 - 0.1)

    // 设置控制器的最大旋转角度
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1
    // 禁用轨道控制器
    this.controls.enablePan = false

    // 渲染方法
    this.render()
    // 添加监听画布大小变化
    this.onAddEventListener()
    // 监听鼠标事件
    this.onAddEventListenerClick()
    // 生成GUI调试面板
    this.createGui()
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

    // console.log(this.camera.position)
  }
}
