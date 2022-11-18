// 导入轨道控制器
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
export class Global {
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true, // 开启锯齿
    alpha: true // 开启透明
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

  // 创建一个组
  cubeGroup1 = new THREE.Group()
  // 创建一个组
  cubeGroup2 = new THREE.Group()
  // 创建一个组
  cubeGroup3 = new THREE.Group()

  // 设置组的集合
  cubeGroup = [this.cubeGroup1, this.cubeGroup2, this.cubeGroup3]

  // 绘制canvas的Dom
  canvas!: HTMLElement | Document

  // 轨道控制器
  controls!: OrbitControls

  // 设置动画id
  animationId!: number

  // 设置下一个组的位置 -y
  nextPosition = 40

  // 设置下一组的偏移量
  nextOffset = 30

  // 设置当前滚动的位置
  scrollPosition = 0
}
