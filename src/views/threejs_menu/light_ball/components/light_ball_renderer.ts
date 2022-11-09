// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

  // 创建场景
  createScene() {
    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 5, 10) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 声明一个球体
    const sphere = new THREE.SphereGeometry(1, 20, 20)
    // 声明一个标准材质
    const mmaterial = new THREE.MeshStandardMaterial({
      // 设置金属度
      metalness: 0.7,
      // 设置光滑度
      roughness: 0.1
    })
    // 创建网格模型
    const mesh = new THREE.Mesh(sphere, mmaterial)
    mesh.castShadow = true
    // 添加到场景
    this.scene.add(mesh)

    // 添加一个地板
    const plane = new THREE.PlaneGeometry(10, 10)
    // 创建一个标准材质
    const pmaterial = new THREE.MeshStandardMaterial({
      // 设置金属度
      metalness: 0.7,
      // 设置光滑度
      roughness: 0.1
    })
    // 创建网格模型
    const pMesh = new THREE.Mesh(plane, pmaterial)
    // 定位平面
    pMesh.position.set(0, -1, 0)
    // 设置网格模型的旋转角度
    pMesh.rotation.x = -Math.PI / 2
    // 开启物体接收阴影
    pMesh.receiveShadow = true
    // 添加到场景
    this.scene.add(pMesh)

    // 创建一个灯光小球
    const lightBall = new THREE.Mesh(
      // 创建小球
      new THREE.SphereGeometry(0.1, 20, 20),
      // 创建标准材质
      new THREE.MeshBasicMaterial({ color: '#ff3040' })
    )
    // 添加到场景
    this.scene.add(lightBall)
    lightBall.position.set(1, 3, 0)
    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    this.scene.add(light)
    // 点光源
    const directionalLight = new THREE.PointLight('#ff3040', 1)
    // 开启阴影
    directionalLight.castShadow = true
    // 设置阴影质量
    directionalLight.shadow.mapSize.set(1024, 1024)
    // 把点光源添加到小球中
    lightBall.add(directionalLight)

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

    // 设置时钟
    const clock = new THREE.Clock()

    // 创建更新动画的方法
    const render = () => {
      const time = clock.getElapsedTime()
      // 通过时钟设置物体的x轴运动
      lightBall.position.x = Math.sin(time) * 3 // 通过sin()函数设置物体的x轴运动 通过time设置物体的运动速度 通过3设置物体的运动范围
      // 通过时钟设置物体的y轴运动
      lightBall.position.z = Math.cos(time) * 3 // 通过cos()函数设置物体的y轴运动 通过time设置物体的运动速度 通过3设置物体的运动范围
      // 上下运动y轴
      lightBall.position.y = Math.abs(Math.sin(time * 3)) * 2 // abs()取绝对值 使得y轴的值永远为正数 从而实现上下运动

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

  // 销毁渲染内容
  dispose() {
    // 清除渲染器
    this.renderer.dispose()
    // 清除轨道控制器
    this.controls.dispose()
    // 清除动画
    cancelAnimationFrame(this.animationId)
  }
}
