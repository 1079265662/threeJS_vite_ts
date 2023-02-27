// 导入three.js
import * as THREE from 'three'

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 导入模型渲染操作
import { changeLoading } from './change_blur'

export class CreatedCanvas extends changeLoading {
  constructor(canvas: HTMLElement) {
    super()
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

  // 绘制canvas的Dom
  canvas!: HTMLElement | Document | Element

  // 创建场景
  createScene = () => {
    this.loadEnvMap()

    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 0, 200) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 创建平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(200, 100, 300)
    this.scene.add(directionalLight)
    // this.setLightHelper(directionalLight)
    // 创建平行光
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight2.position.set(-200, -100, -300)
    this.scene.add(directionalLight2)
    // this.setLightHelper(directionalLight2)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    light.position.set(200, 300, 100)
    // light.color.set(new THREE.Color('#ff3040'))
    this.scene.add(light)

    // 创建辅助线
    this.addaxesHelper(100)

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

    // 渲染方法
    this.render()
    // 监听操作页面尺寸改变
    this.onAddEventListenerMousemove()
    // 开启物体的旋转
    this.onAddEventListener()
  }

  // 监听窗口变化
  onAddEventListenerMousemove = () => {
    window.addEventListener('mousemove', this.stopRotate)
  }

  // 通过光线投射, 暂停物体的旋转
  stopRotate = (item: MouseEvent) => {
    const { clientX, clientY } = item
    // 创建二维向量 用于记录鼠标的位置
    const mouse = new THREE.Vector2()

    // mousemove 鼠标移动事件 还可以替换其他时间click等
    // 将鼠标点击位置的屏幕坐标转换成three.js中的标准设备坐标
    mouse.x = (clientX / window.innerWidth) * 2 - 1 // X轴坐标 2个单位 -1到1
    mouse.y = -((clientY / window.innerHeight) * 2 - 1) // Y轴坐标 2个单位 -1到1 这里需要反转一下 因为在JS/CSS坐标中Y轴是反的

    // 创建一个光线投射器
    const raycaster = new THREE.Raycaster()
    // 设置光线投射器的射线 通过setFromCamera()设置 传入鼠标的位置和相机
    raycaster.setFromCamera(mouse, this.camera)

    // 获取所有的立方体 intersectObjects()传入需要检测的物体
    const cube = raycaster.intersectObjects(this.scene.children) // 会返回所有与射线相交的多个对象的数组

    // 判断是否移动到手机上
    cube[0]?.object.name === '手机'
      ? (this.rotateGo = false)
      : (this.rotateGo = true)
  }

  // 销毁监听
  onRemoveEventListener = () => {
    window.removeEventListener('mousemove', this.stopRotate)
  }

  // 渲染动画
  render = () => {
    // 获得动画执行时间
    // const clockTime = this.clock.getElapsedTime()
    const rotateSpeed = 0.005

    // 加载成功后进行旋转操作, 判断是否需要旋转操作
    if (this.rotateGo) {
      this.iphone.rotateY(rotateSpeed)
      // 添加到组中
      this.lineAndNumber.rotateY(rotateSpeed)
    }
    // 设置阻尼感必须在动画中调用.update()
    this.controls.update()
    // 使用渲染器,通过相机将场景渲染出来
    this.renderer.render(this.scene, this.camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    this.animationId = requestAnimationFrame(this.render)
  }
}
