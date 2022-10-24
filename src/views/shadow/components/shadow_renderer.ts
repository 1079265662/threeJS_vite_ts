// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 储存数据
import { setCameraData, getCameraData } from '@/utils/local'
interface domElement {
  appendChild: Document['appendChild']
  camera: any
  this: any
}

// 储存动画id
let animationId: number
// 创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启锯齿
})
// 创造轨道控制器
let controls: any
// 创建相机
let camera: any
/**
 * Description GetScene
 * @param {T} nameCanvas
 * @returns {any}
 */
export function GetScene<T extends domElement>(nameCanvas: T) {
  // 1. 创建three.js场景
  const scene = new THREE.Scene()

  // 2. 创建一个透视相机
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
  // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
  console.log(getCameraData())

  camera.position.set(getCameraData().x || 8, getCameraData().y || 8, getCameraData().z) // 默认没有参数 需要设置参数
  console.log()

  // 把相机添加到场景中
  scene.add(camera)

  // 声明一个球体
  const sphere = new THREE.SphereGeometry(1, 20, 20)
  // 声明一个标准材质
  const mmaterial = new THREE.MeshStandardMaterial()
  // 创建网格模型
  const sphereMesh = new THREE.Mesh(sphere, mmaterial)
  // 开启物体投射阴影
  sphereMesh.castShadow = true
  // 添加到场景
  scene.add(sphereMesh)

  // 声明一个平面
  const plane = new THREE.PlaneGeometry(10, 10)
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
  scene.add(planeMesh)

  // 环境光
  const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
  scene.add(light)
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(10, 10, 10)
  // 开启光照投射阴影
  directionalLight.castShadow = true
  scene.add(directionalLight)

  // 创建一个辅助线
  const axesHelper = new THREE.AxesHelper(20)
  scene.add(axesHelper)

  // 4. 设置渲染器(画布)的大小 通过setSize()设置
  renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
  // 开启阴影
  renderer.shadowMap.enabled = true
  // 5. 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
  nameCanvas.appendChild(renderer.domElement)

  // 6. 创建创建一个轨道控制器 实现交互渲染
  controls = new OrbitControls(camera, renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
  // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
  controls.enableDamping = true

  // 7. 创建更新动画的方法
  const render = () => {
    // 设置阻尼感必须在动画中调用.update()
    controls.update()
    // 使用渲染器,通过相机将场景渲染出来
    renderer.render(scene, camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    animationId = requestAnimationFrame(render)
  }
  // 执行创建更新动画的方法
  render()

  // 实现画面变化 更新渲染的内容
  window.addEventListener('resize', () => {
    // 解构window对象
    const { innerWidth, innerHeight, devicePixelRatio } = window
    // 更新相机的宽高比
    camera.aspect = innerWidth / innerHeight
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(innerWidth, innerHeight)
    // 更新渲染器的像素比
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  })

  return { controls }
}

/**
 * @description: 清除加载器和动画(销毁方法)
 */
export function dispose() {
  // 清除渲染器
  renderer.dispose()
  // 清除轨道控制器
  controls.dispose()
  // 清除动画
  cancelAnimationFrame(animationId)
}

/**
 * @description 监听镜头变化
 * @param controlsData 缓存名称
 */
export function cameraChange(controlsData: any = camera) {
  setCameraData(camera.position)
}
