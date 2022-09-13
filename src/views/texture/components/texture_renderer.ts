// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入纹理
import logo from '@/assets/door/color.jpg'
// 导入灰度纹理
import logoGray from '@/assets/door/alpha.jpg'

interface domElement {
  appendChild: Document['appendChild']
}
/**
 *
 * @param {*} nameCanvas 接收页面传来的页面Dom元素
 */
// 储存动画id
let animationId: number
// 4. 创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启锯齿
})
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

  // 创建纹理
  const texture = new THREE.TextureLoader().load(logo)
  // 创建灰度纹理
  const textureGray = new THREE.TextureLoader().load(logoGray)

  // 创建一个在网格模型中展示的几何体
  const cubeGeometry = new THREE.BoxGeometry(3, 3, 3) // 默认就是1,1,1 宽高深度
  // 设置该集合体的纹理材质
  const cubeMaterial = new THREE.MeshBasicMaterial({
    // 设置纹理贴图
    map: texture,
    // 设置灰度纹理贴图
    alphaMap: textureGray,
    // 设置透明度 一定要把透明度设置为true
    transparent: true
  })

  // 3. 创建一个网格模型 放入创建的几何体和其自身材质
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial) // Mesh(几何体, 纹理材质)
  // 将几何体添加到场景中
  scene.add(cube)

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
// 清除内容
function dispose() {
  // 清除渲染器
  renderer.dispose()
  // 清除动画
  cancelAnimationFrame(animationId)
}

export { getScene, dispose }
