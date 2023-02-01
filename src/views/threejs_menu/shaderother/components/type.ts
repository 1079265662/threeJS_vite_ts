/**
 * three.js渲染的公共类
 */

// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器类型
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Type {
  // 轨道控制器
  controls!: OrbitControls
  // 设置动画id
  animationId!: number
  // 创建材质
  mmaterial!: THREE.RawShaderMaterial

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    // antialias: true // 关掉锯齿
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
}
