// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { getAssetsFile } from '@/utils/getAssetsFile'
interface domElement {
  appendChild: Document['appendChild']
}
// 储存动画id
let animationId: number
// 4. 创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启锯齿
})
// 导入Vue响应式
import { ref } from 'vue'
const loadingNumber = ref(0)
/**
 * Description 创建
 * @param {T} nameCanvas
 * @returns {any}
 */
function getScene<T extends domElement>(nameCanvas: T) {
  // 1. 创建three.js场景
  const scene = new THREE.Scene()

  // 2. 创建一个透视相机
  const camera = new THREE.PerspectiveCamera(
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
  camera.position.set(0, 0, 10) // 默认没有参数 需要设置参数
  // 把相机添加到场景中
  scene.add(camera)

  // 设置一个cube加载器
  const envMapLoader = new THREE.CubeTextureLoader(loading())
  // 加载环境贴图
  const envMapT = envMapLoader.load([
    getAssetsFile('environmentMaps/0/px.jpg'),
    getAssetsFile('environmentMaps/0/nx.jpg'),
    getAssetsFile('environmentMaps/0/py.jpg'),
    getAssetsFile('environmentMaps/0/ny.jpg'),
    getAssetsFile('environmentMaps/0/pz.jpg'),
    getAssetsFile('environmentMaps/0/nz.jpg')
  ])

  // 声明一个球体
  const sphere = new THREE.SphereGeometry(1, 20, 20)
  // 声明一个标准材质
  const mmaterial = new THREE.MeshStandardMaterial({
    // 设置金属度
    metalness: 0.7,
    // 设置光滑度
    roughness: 0.1
    // 设置环境贴图
    // envMap: envMapT
  })

  // 创建网格模型
  const mesh = new THREE.Mesh(sphere, mmaterial)
  // 添加到场景
  scene.add(mesh)

  // 添加场景添加背景
  scene.background = envMapT
  // 场景内所有的物体添加默认的环境贴图
  scene.environment = envMapT

  // 环境光
  const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
  scene.add(light)

  // 平行光
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  // directionalLight.position.set(0, 0, 10)
  // scene.add(directionalLight)

  // 创建一个辅助线
  const axesHelper = new THREE.AxesHelper(20)
  scene.add(axesHelper)

  // 设置渲染器(画布)的大小 通过setSize()设置
  renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
  // 5. 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
  nameCanvas.appendChild(renderer.domElement)

  // 6. 创建创建一个轨道控制器 实现交互渲染
  const controls = new OrbitControls(camera, renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
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
}
/**
 * @description: 声明加载管理器
 * @returns {any}
 */
function loading(): any {
  // 创建加载器
  const manager = new THREE.LoadingManager()
  // 加载中的参数
  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    loadingNumber.value = Number(((itemsLoaded / itemsTotal) * 100).toFixed(2))
  }
  return manager
}
/**
 * @description: 清除加载器和动画(销毁方法)
 */
function dispose() {
  // 清除渲染器
  renderer.dispose()
  // 清除动画
  cancelAnimationFrame(animationId)
  // 重置加载的百分比
  loadingNumber.value = 0
}

export { getScene, dispose, loadingNumber }
