// 导入three.js
import * as THREE from 'three'

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  CSS2DRenderer,
  CSS2DObject
} from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { ChangeLoading } from './change_blur'

export class CreatedCanvas extends ChangeLoading {
  constructor(canvas: HTMLElement, tags: HTMLElement) {
    super()
    // 接收传入的画布Dom元素
    this.canvas = canvas
    this.tags = tags
  }

  // 是否进行旋转(按钮)
  rotateButton = true

  // 标签内容
  tags!: HTMLElement
  // 标签2D对象
  tags2D!: CSS2DObject

  // 创建一个光线投射器
  raycaster = new THREE.Raycaster()

  // 创建场景
  createScene = () => {
    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 0, 200) // 默认没有参数 需要设置参数

    // 把相机添加到场景中
    this.scene.add(this.camera)

    // // 创建平行光
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    // directionalLight.position.set(200, 100, 300)
    // this.scene.add(directionalLight)
    // // this.setLightHelper(directionalLight)

    // // 创建平行光
    // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
    // directionalLight2.position.set(-200, -100, -300)
    // this.scene.add(directionalLight2)
    // // this.setLightHelper(directionalLight2)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 1.8) // soft white light
    this.scene.add(light)

    // 创建辅助线
    // this.addaxesHelper(100)

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
    this.controls.maxDistance = 500
    // 设置控制器的最小距离
    this.controls.minDistance = 100

    this.loadEnvMap()
    // 创建标签
    this.createTags()
    // 射线拾取
    this.onAddEventListenerMousemove()
    // 监听操作页面尺寸改变
    this.onAddEventListener()
    // 渲染方法
    this.render()
  }

  // 创建tags
  createTags = () => {
    this.label2DRenderer = new CSS2DRenderer()

    // 设置2D标签渲染器
    this.label2DRenderer.setSize(window.innerWidth, window.innerHeight)

    // 设置2D标签渲染器的样式
    this.label2DRenderer.domElement.style.display = 'none' // 默认隐藏
    this.label2DRenderer.domElement.style.overflow = 'visible' // 显示超出部分(默认隐藏), 适配移动端
    this.label2DRenderer.domElement.style.position = 'absolute'
    this.label2DRenderer.domElement.style.top = '80px' // 移动高度
    this.label2DRenderer.domElement.style.left = '0px'
    this.label2DRenderer.domElement.style.pointerEvents = 'none' // 鼠标事件不可用, 不遮挡canvas

    // 将2D标签渲染器添加到canvas元素中
    this.canvas.appendChild(this.label2DRenderer.domElement)

    // 把Dom元素转化为2D对象
    this.tags2D = new CSS2DObject(this.tags)

    // 添加到场景中
    this.scene.add(this.tags2D)
  }

  // 监听光线投射内容
  onAddEventListenerMousemove = () => {
    // 监听鼠标移动事件, 监听旋转
    window.addEventListener('mousemove', this.stopRotate)
    // 监听鼠标点击事件, 监听点击雪碧图标
    window.addEventListener('click', this.onAddClickSprite)
  }

  // 通过光线投射, 暂停物体的旋转
  stopRotate = (item: MouseEvent) => {
    // 获得全屏的webgl设备坐标
    const FullXY = this.calculateFullXY(item)

    // 设置光线投射器的射线 通过setFromCamera()设置 传入鼠标的位置和相机
    this.raycaster.setFromCamera(FullXY, this.camera)

    // 投射手机Object3D对象
    const cube = this.raycaster.intersectObject(this.iphone)

    // 判断是否移动到手机上, 暂停旋转
    if (cube.length !== 0) {
      this.rotateGo = false
    } else {
      // 如果显示2D标签, 则不旋转
      if (this.label2DRenderer.domElement.style.display === 'block') return
      this.rotateGo = true
    }
  }

  // 通过光线投射, 监听可点击的内容
  onAddClickSprite = (item: MouseEvent) => {
    // 获得全屏的webgl设备坐标
    const FullXY = this.calculateFullXY(item)

    // 设置光线投射器 的射线 通过setFromCamera()设置 传入鼠标的位置和相机
    this.raycaster.setFromCamera(FullXY, this.camera)

    // 投射雪碧图标(object3D对象)
    if (this.spriteMesh) {
      // 投射多个Object3D对象, 数组的形式
      const spriteMeshRay = this.raycaster.intersectObjects([this.spriteMesh]) // 会返回所有与射线相交的多个对象的数组

      // 判断是否点击到雪碧图标
      if (spriteMeshRay[0]?.object.name === '后置摄像头光点') {
        // 关闭旋转
        this.rotateGo = false

        // 设置2D标签的位置, 与雪碧图标的位置一致
        this.tags2D.position.copy(spriteMeshRay[0].point)
        // 显示2D标签
        this.label2DRenderer.domElement.style.display = 'block'
      } else {
        // 启动旋转
        this.rotateGo = true

        // 隐藏2D标签
        this.label2DRenderer.domElement.style.display = 'none'
      }
    }
  }

  // 销毁监听
  onRemoveEventListener = () => {
    // 销毁旋转
    window.removeEventListener('mousemove', this.stopRotate)
    // 销毁雪碧
    window.removeEventListener('click', this.onAddClickSprite)
    // 销毁CSS2DRenderer
    this.canvas.removeChild(this.label2DRenderer.domElement)
  }

  // 暂停
  stopRender = () => {
    // 清除动画
    cancelAnimationFrame(this.animationId)
  }

  // 渲染动画
  render = () => {
    // 获得动画执行时间
    // const clockTime = this.clock.getElapsedTime()
    const rotateSpeed = 0.003

    // 加载成功后进行旋转操作, 判断是否需要旋转操作
    if (this.rotateGo && this.rotateButton) {
      this.iphone.rotateY(rotateSpeed)
      // 添加到组中
      this.lineAndNumber.rotateY(rotateSpeed)
    }
    // 设置阻尼感必须在动画中调用.update()
    this.controls.update()

    // 使用渲染器,通过相机将场景渲染出来
    this.renderer.render(this.scene, this.camera) // render(场景, 相机)
    this.label2DRenderer.render(this.scene, this.camera)

    // 使用动画更新的回调API实现持续更新动画的效果
    this.animationId = requestAnimationFrame(this.render)
  }
}
