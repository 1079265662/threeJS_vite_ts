// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入点材质
import materialTexture from '@/assets/particles/1.png'
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

    // 创建贴图材质加载器
    const textureLoader = new THREE.TextureLoader()

    const material = textureLoader.load(materialTexture)
    // 设置星星的数量
    const starCount = 5000
    // 创建星星的几何体
    const starGeometry = new THREE.BufferGeometry()
    // 创建星星的材质
    const starMaterial = new THREE.PointsMaterial({
      size: 0.3,
      map: material,
      alphaMap: material,
      transparent: true, // 开启透明度
      depthWrite: false, // 关闭深度写入(防止点被遮挡),
      vertexColors: true // 开启顶点颜色 (默认为false) 顶点颜色是指每个顶点都有一个颜色值(默认色值) 顶点颜色的优先级高于材质颜色(通过.color设置的颜色) 顶点颜色的值是一个0-1的值 0表示黑色 1表示白色
    })

    // 创建星星的位置数组 通过Float32Array创建一个数组 用来存放星星的位置
    const starPositions = new Float32Array(starCount * 3) // 3个坐标系 所以需要数量*3
    // 设置星星的颜色
    const starColors = new Float32Array(starCount * 3) // 3个颜色 所以需要数量*3 RGB(0~1, 0~1, 0~1)

    // 设置星星的位置/顶点 通过for循环遍历星星的数量 再通过Math.random()随机设置星星的positions位置属性
    for (let index = 0; index < starPositions.length; index++) {
      starPositions[index] = (Math.random() - 0.5) * 50 // -0.5 ~ 0.5 之间的随机数 * 100
      starColors[index] = Math.random() // 0 ~ 1 之间的随机数
    }

    // 设置星星的位置属性
    starGeometry.setAttribute(
      'position', // 设置位置属性
      new THREE.BufferAttribute(starPositions, 3) // 设置位置属性的值 3个坐标系 3个为一组
    )
    // 设置星星的颜色属性
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

    // 创建星星
    const star = new THREE.Points(starGeometry, starMaterial)
    // 将星星添加到场景中
    this.scene.add(star)

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
