// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { getAssetsFile } from '@/utils/getAssetsFile'

export class CreateWorld {
  constructor(canvas: HTMLElement) {
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

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

  // 创建场景
  createScene = () => {
    const model = new THREE.Group() //声明一个组对象，用来添加加载成功的三维场景
    const loader = new GLTFLoader() //创建一个GLTF加载器
    loader
      .loadAsync(
        'https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/gltf/iphone-12.glb'
      )
      .then((gltf) => {
        console.log(gltf)
        //加载成功后，将场景添加到组对象中
        model.add(gltf.scene)
        //将组对象添加到场景中
        this.scene.add(model)
      })
      .catch((err) => {
        console.log(err)
      })

    // 设置一个cube加载器
    const envMapLoader = new THREE.CubeTextureLoader()
    // 加载环境贴图
    const envMapT = envMapLoader.load([
      getAssetsFile('environmentMaps/0/px.jpg'),
      getAssetsFile('environmentMaps/0/nx.jpg'),
      getAssetsFile('environmentMaps/0/py.jpg'),
      getAssetsFile('environmentMaps/0/ny.jpg'),
      getAssetsFile('environmentMaps/0/pz.jpg'),
      getAssetsFile('environmentMaps/0/nz.jpg')
    ])
    // 添加环境贴图
    this.scene.background = envMapT

    // 修改渲染器编码格式
    // this.renderer.outputEncoding = THREE.sRGBEncoding

    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 5, 10) // 默认没有参数 需要设置参数

    // 平行光
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    // directionalLight.position.set(8, 3, 4)
    // this.scene.add(directionalLight)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 1) // soft white light
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

    this.render()
    this.onAddEventListener()
  }

  render = () => {
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
