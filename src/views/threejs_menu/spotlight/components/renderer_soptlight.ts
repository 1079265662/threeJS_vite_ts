// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 储存数据
import { setCameraData, getCameraData } from '@/utils/local'
// ES6:
import GUI from 'lil-gui'

export class CreateWorld {
  constructor(canvas: any) {
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }
  canvas!: any
  // 设置动画id
  animationId!: number
  // 创造轨道控制器
  controls!: any
  // 平面的宽高
  plane = 20
  // 设置渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true // 开启锯齿
  })
  // 设置场景
  scene = new THREE.Scene()
  // 设置相机
  camera = new THREE.PerspectiveCamera(
    // 视觉角度
    75,
    // 相机纵横比 取整个屏幕 宽 / 高
    window.innerWidth / window.innerHeight,
    // 相机的进截面 (近距离不可见范围)
    0.1,
    // 远截面 (远距离不可见范围)
    1000
  )
  // 创建一个GUI对象
  gui = new GUI()

  // 创建场景
  createScene() {
    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(
      getCameraData().x || 8,
      getCameraData().y || 8,
      getCameraData().z
    ) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 声明一个球体
    const sphere = new THREE.SphereGeometry(1, 20, 20)
    // 声明一个标准材质
    const mmaterial = new THREE.MeshStandardMaterial()
    // 创建网格模型
    const sphereMesh = new THREE.Mesh(sphere, mmaterial)
    // 开启阴影
    sphereMesh.castShadow = true
    // 添加到场景
    this.scene.add(sphereMesh)

    // 声明一个平面
    const plane = new THREE.PlaneGeometry(this.plane, this.plane)
    // 声明一个标准材质
    const pmaterial = new THREE.MeshStandardMaterial()
    // 创建网格模型
    const planeMesh = new THREE.Mesh(plane, pmaterial)
    // 定位平面
    planeMesh.position.set(0, -1, 0)
    // 旋转平面到底部
    planeMesh.rotation.x = -Math.PI / 2
    // 开启物体接收阴影
    planeMesh.receiveShadow = true
    // 添加到场景
    this.scene.add(planeMesh)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    this.scene.add(light)

    // 聚光灯
    const SpotLight = new THREE.SpotLight(0xffffff, 0.6)
    // 设置聚光灯的位置
    SpotLight.position.set(5, 5, 5)
    // 开启聚光灯阴影
    SpotLight.castShadow = true
    // 设置阴影质量
    SpotLight.shadow.mapSize.set(1024, 1024)
    // 设置灯光对应的物体(网格模型mesh) 这样物体移动的时候灯光也会跟着物体移动
    SpotLight.target = sphereMesh
    // 设置灯光的衰减量
    SpotLight.decay = 0
    // 添加灯光到场景
    this.scene.add(SpotLight)

    // 创建一个辅助线
    const axesHelper = new THREE.AxesHelper(20)
    this.scene.add(axesHelper)

    // 设置渲染器(画布)的大小 通过setSize()设置
    this.renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
    // 开启阴影
    this.renderer.shadowMap.enabled = true
    // 开启物理光照效果
    this.renderer.physicallyCorrectLights = true
    // 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
    this.canvas.appendChild(this.renderer.domElement)

    // 创建创建一个轨道控制器 实现交互渲染
    this.controls = new OrbitControls(this.camera, this.renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
    // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
    this.controls.enableDamping = true

    // 添加到GUI
    this.initGui({ sphereMesh, SpotLight })

    // 创建更新动画的方法
    const render = () => {
      // 设置阻尼感必须在动画中调用.update()
      this.controls.update()
      // 使用渲染器,通过相机将场景渲染出来
      this.renderer.render(this.scene, this.camera) // render(场景, 相机)
      // 使用动画更新的回调API实现持续更新动画的效果
      this.animationId = requestAnimationFrame(render)
    }
    // 执行创建更新动画的方法
    render()

    // 实现画面变化 更新渲染的内容
    window.addEventListener('resize', () => {
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
    })
  }

  // 声明GUI
  initGui(obj: any) {
    const { sphereMesh, SpotLight } = obj

    // 设置X轴的调试器
    this.gui
      .add(sphereMesh.position, 'x')
      .min(-this.plane / 2)
      .max(this.plane / 2)
      .step(0.01)
      .name('移动物体的X轴')

    //设置angle聚焦大小
    this.gui
      .add(SpotLight, 'angle')
      .min(Math.PI / 20)
      .max(Math.PI / 3)
      .step(0.01)
      .name('聚焦大小')

    console.log(SpotLight.distance)

    // 设置distance聚焦距离
    this.gui
      .add(SpotLight, 'distance')
      .min(1)
      .max(100)
      .step(0.01)
      .name('聚焦距离')

    // 设置distance半影效果
    this.gui
      .add(SpotLight, 'penumbra')
      .min(0)
      .max(1)
      .step(0.01)
      .name('半影效果')

    // 设置灯光亮度
    this.gui
      .add(SpotLight, 'intensity')
      .min(0)
      .max(5)
      .step(0.01)
      .name('灯光亮度')

    // 设置灯光的衰减量
    this.gui
      .add(SpotLight, 'decay')
      .min(0)
      .max(2)
      .step(0.01)
      .name('灯光的衰减量')

    // 是否开启物理光照效果
    this.gui.add(this.renderer, 'physicallyCorrectLights').name('物理光照效果')
  }

  // 销毁渲染内容
  dispose() {
    // 清除渲染器
    this.renderer.dispose()
    // 清除轨道控制器
    this.controls.dispose()
    // 清除动画
    cancelAnimationFrame(this.animationId)
    //销毁GUI
    this.gui.destroy()
  }

  // 储存相机的位置
  saveCamera() {
    setCameraData(this.camera.position)
  }
}
