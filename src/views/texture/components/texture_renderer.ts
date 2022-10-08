// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入纹理
import logo from '@/assets/door/color.jpg'
// 导入灰度纹理
import logoGray from '@/assets/door/alpha.jpg'
// 导入环境遮挡贴图
import logoEnv from '@/assets/door/ambientOcclusion.jpg'
// 导入置换纹理
import displacementMap from '@/assets/door/height.jpg'
// 导入粗糙度纹理
import roughness from '@/assets/door/roughness.jpg'
// 导入金属贴图
import metalness from '@/assets/door/metalness.jpg'
// 导入法线贴图
import normal from '@/assets/door/normal.jpg'
interface domElement {
  appendChild: Document['appendChild']
}
// 导入Vue响应式
import { ref } from 'vue'
const loadingNumber = ref(0)
// 储存动画id
let animationId: number
// 4. 创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启锯齿
})
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

  // 设置一个统一的纹理加载器
  const textureLoader = new THREE.TextureLoader(loading())
  // 创建纹理
  const texture = textureLoader.load(logo)
  // 创建灰度纹理
  const textureGray = textureLoader.load(logoGray)
  // 创建环境遮挡贴图
  const textureEnv = textureLoader.load(logoEnv)
  // 创建置换纹理
  const textureDisplacementMap = textureLoader.load(displacementMap)
  // 创建粗糙度纹理
  const textureRoughness = textureLoader.load(roughness)
  // 创建金属贴图
  const textureMetalness = textureLoader.load(metalness)
  // 创建法线贴图
  const textureNormal = textureLoader.load(normal)
  // 创建一个在网格模型中展示的几何体
  const cubeGeometry = new THREE.BoxGeometry(3, 3, 3, 200, 200, 200) // 参数为长宽高 以及长宽高的分段数 横截面，利于变形使用，段数越多越柔和，则段数越少越生硬。
  // 使用PBR材质
  const cubeMaterial = new THREE.MeshStandardMaterial({
    // 设置纹理贴图image.png
    map: texture,
    // 设置灰度纹理贴图
    alphaMap: textureGray,
    // 设置透明度 一定要把透明度设置为true
    transparent: true,
    // 设置环境遮挡贴图
    aoMap: textureEnv,
    // 设置环境遮挡贴图强度
    aoMapIntensity: 1, // 默认为1 最小值为0 最大值为1
    // 使用置换纹理
    displacementMap: textureDisplacementMap,
    // 设置置换纹理强度
    displacementScale: 0.1, // 默认为1 最小值为0 最大值为1
    // 设置粗糙度纹理
    roughnessMap: textureRoughness,
    // 设置粗糙度
    // roughness: 0.5, // 默认为0.5 最小值为0 最大值为1
    // 设置金属度
    metalness: 0.5, // 默认为0.5 最小值为0 最大值为1
    // 设置金属贴图
    metalnessMap: textureMetalness,
    // 导入法线贴图
    normalMap: textureNormal
  })

  // 创建一个网格模型 放入创建的几何体和其自身材质
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial) // Mesh(几何体, 纹理材质)
  // 设置环境遮挡贴图第二组uv坐标 (就是把第一组uv坐标的值赋值给第二组uv坐标)
  cube.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(cube.geometry.attributes.uv.array, 2))

  // 将几何体添加到场景中
  scene.add(cube)

  // 环境光
  const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
  scene.add(light)
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(0, 0, 10)
  scene.add(directionalLight)

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
  // console.log(controls)

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
function loading() {
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
  // 还原加载状态位
  loadingNumber.value = 0
}

export { getScene, dispose, loadingNumber }
