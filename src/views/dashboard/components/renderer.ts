// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入储存
import { getDistance } from '@/utils/local'
interface domElement {
  appendChild?: Document['appendChild'] | any
  add: any
  children: Array<any>
  remove: any
  innerHTML?: any
}

// 储存动画id
let animationId: number
//  创建three.js场景
const scene = new THREE.Scene()
// 创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启锯齿
})
// 创建一个透视相机
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
// 创建创建一个轨道控制器 实现交互渲染
const controls = new OrbitControls(camera, renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)

/**
 * @function 渲染元素
 * @param nameCanvas Dom元素
 */
function getScene<T extends domElement>(nameCanvas: T) {
  console.log(scene)

  // 获取物体在x轴的位置 默认为10
  const distance = Number(getDistance()) || 10
  // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
  camera.position.set(0, 0, distance) // 默认没有参数 需要设置参数
  // 把相机添加到场景中
  scene.add(camera)

  // 添加辅助线
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  // 设置渲染器(画布)的大小 通过setSize()设置
  renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)

  // 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
  nameCanvas.appendChild(renderer.domElement)
  // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
  controls.enableDamping = true

  // 创建更新动画的方法
  const render = () => {
    // 设置阻尼感必须在动画中调用.update()
    controls.update()
    // 使用渲染器,通过相机将场景渲染出来
    renderer.render(scene, camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    animationId = requestAnimationFrame(render)
  }

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

  // 执行创建更新动画的方法
  render()
  // 生成三角形
  getters(scene)
}

/**
 * @function 创建三角形
 * @param scene 场景
 */
function getters<T extends domElement>(scene: T) {
  // if (scene.children.length > 1500) {
  //   scene.children = []
  // }
  // 创建50个三角形
  for (let i = 0; i < 50; i++) {
    // 创建一个在网格模型中展示的几何体
    const cubeGeometry = new THREE.BufferGeometry()
    // 创建一个浮点数类型的32位数组
    const vertices = new Float32Array(9) // 需要规定生成的长度 9个顶点

    // 创建三角形的顶点  三角形包含: 3个订单包含3个坐标位置 3x3
    for (let j = 0; j < 9; j++) {
      // 随机1-5的数
      vertices[j] = Math.random() * 10 - 5
    }

    // 设置属性
    cubeGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

    // 设置随机颜色
    const color = new THREE.Color(Math.random(), Math.random(), Math.random())

    // 设置该集合体的纹理材质
    const cubeMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: Math.random() }) // 支持CSS颜色设置方式 但是需要字符串格式

    // 3. 创建一个网格模型 放入创建的几何体和其自身材质
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial) // Mesh(几何体, 纹理材质)
    // 将几何体添加到场景中
    scene.add(cube)
  }
}

/**
 * @function 清除加载器和动画(销毁方法)
 */
function dispose() {
  renderer.dispose()
  cancelAnimationFrame(animationId)
}

/**
 * @function 重置三角形
 * @param nameCanvas Dom元素
 */
function clear<T extends domElement>(nameCanvas: T) {
  scene.children.splice(0, scene.children.length)
  getters(nameCanvas)
}

/**
 * @function 监听镜头变化
 * @param controls 缓存名称
 */
function cameraChange(controls: any): number {
  return controls.getDistance()
}

export { getScene, getters, clear, cameraChange, dispose, scene, controls }
