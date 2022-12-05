// 导入three.js
import * as THREE from 'three'
// 导入conoon.js
import * as CANNON from 'cannon-es'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class CreateWorld {
  // 绘制canvas的Dom
  canvas!: HTMLElement | Document | Element
  // 轨道控制器
  controls!: OrbitControls
  // 设置动画id
  animationId!: number

  // 创建渲染器
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

  // 创建时钟
  clock = new THREE.Clock()

  // 创建需要物理的模型
  pMesh!: THREE.Mesh
  sphereMesh!: THREE.Mesh

  // 创建物理引擎模型
  sphereBody!: CANNON.Body

  // 创建物理世界
  world = new CANNON.World()

  constructor(canvas: any) {
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

  // 创建场景
  createScene = () => {
    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 2, 20) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 声明一个标准材质
    const material = new THREE.MeshStandardMaterial({
      color: '#cbe0e0'
    })
    // 声明一个球体
    const sphere = new THREE.SphereGeometry(1, 20, 20)
    // 创建网格模型
    this.sphereMesh = new THREE.Mesh(sphere, material)
    // 设置阴影
    this.sphereMesh.castShadow = true
    // 添加到场景
    this.scene.add(this.sphereMesh)

    // 声明一个平面
    const plane = new THREE.PlaneGeometry(20, 20)
    // 声明一个标准材质
    const pmaterial = new THREE.MeshStandardMaterial()
    // 创建网格模型
    this.pMesh = new THREE.Mesh(plane, pmaterial)
    // 设置平面的位置
    this.pMesh.position.set(0, -5, 0)
    // 设置平面的旋转
    this.pMesh.rotation.x = -Math.PI / 2 // 旋转90度
    this.pMesh.receiveShadow = true
    // 添加到场景
    this.scene.add(this.pMesh)

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.castShadow = true
    this.scene.add(directionalLight)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    this.scene.add(light)

    // 创建一个辅助线
    const axesHelper = new THREE.AxesHelper(20)
    this.scene.add(axesHelper)

    // 设置渲染器(画布)的大小 通过setSize()设置
    this.renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
    this.renderer.shadowMap.enabled = true
    // 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
    this.canvas.appendChild(this.renderer.domElement)

    // 创建创建一个轨道控制器 实现交互渲染
    this.controls = new OrbitControls(this.camera, this.renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
    // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
    this.controls.enableDamping = true
    this.createPhysics()
    this.render()
    this.onAddEventListener()
  }

  // 创建物理效果
  createPhysics = () => {
    // 设置重力方向 (x, y, z)
    this.world.gravity.set(0, -9.82, 0) // 重力加速度 m/s²
    // 设置物理小球
    const sphereShape = new CANNON.Sphere(1) // 半径为1的球体
    // 设置物理小球材质
    const sphereMaterial = new CANNON.Material() // 默认物理材质
    // 设置物理小球的刚体
    this.sphereBody = new CANNON.Body({
      mass: 1, // 质量
      position: new CANNON.Vec3(0, 0, 0), // 位置
      shape: sphereShape, // 形状
      material: sphereMaterial // 材质
    })
    // 将物理小球添加到物理世界中
    this.world.addBody(this.sphereBody)

    // 设置物理平面
    const planeShape = new CANNON.Plane() // 平面
    // 设置物理平面材质
    const planeMaterial = new CANNON.Material() // 默认物理材质
    // 设置物理平面的刚体
    const planeBody = new CANNON.Body({
      mass: 0, // 质量
      position: new CANNON.Vec3(0, -5, 0), // 位置
      quaternion: new CANNON.Quaternion().setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0), // 设置旋转轴 (x, y, z) x轴旋转
        -Math.PI / 2 // 旋转-90度
      ), // 旋转90度
      shape: planeShape, // 形状
      material: planeMaterial // 材质
    })
    // 将物理平面添加到物理世界中
    this.world.addBody(planeBody)
  }

  // 渲染
  render = () => {
    // console.log(this.animationId)
    const deltaTime = this.clock.getDelta()
    // 设置物理世界的时间步长
    this.world.step(1 / 60, deltaTime) // 1/60秒更新一次物理世界 60hz刷新率
    // const { x, y, z } = this.sphereBody.position
    // 把物体绑定物理引擎
    this.sphereMesh.position.set(...this.sphereBody.position.toArray()) // 绑定物理引擎toArray()转换为数组cannon-es自带的方法
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
    // 清除渲染器
    this.renderer.dispose()
    // 清除轨道控制器
    this.controls.dispose()
    // 销毁监听
    window.removeEventListener('resize', this.onWindowResize)
    // 清除动画
    cancelAnimationFrame(this.animationId)
  }
}
