// 导入three.js
import type { Group } from 'three'
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class CreateWorld {
  // 绘制canvas的Dom
  canvas!: any
  // 轨道控制器
  controls!: OrbitControls
  // 设置动画id
  animationId!: number

  constructor(canvas: any) {
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

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
  // 创建一个组
  cubeGroup1 = new THREE.Group()
  // 创建一个组
  cubeGroup2 = new THREE.Group()
  // 创建一个组
  cubeGroup3 = new THREE.Group()
  // 设置下一个组的位置
  nextPosition = 40
  // 创建场景
  createScene = () => {
    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 8, 20) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

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

    this.createCube(0, this.cubeGroup1)
    this.createCube(-this.nextPosition, this.cubeGroup2)
    this.createCube(-this.nextPosition * 2, this.cubeGroup3)

    this.render()

    this.createControls()

    this.onWindowResize()

    // this.onScroll()
  }

  // 生成1000个立方体
  createCube = (far = 0, group: Group) => {
    // 创建一个立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1) // new THREE.BoxGeometry(宽, 高, 深)
    // 创建一个材质
    const material = new THREE.MeshBasicMaterial({
      color: '#358b71',
      wireframe: true
    })

    // 生成1000个立方体 10的3次方 -3到3之间
    for (let i = -3; i < 3; i++) {
      for (let j = -3; j < 3; j++) {
        for (let h = -3; h < 3; h++) {
          // 创建网格
          const cube = new THREE.Mesh(geometry, material)
          cube.position.set(i * 2, j * 2, h * 2)
          // 将网格添加到组中
          group.add(cube)
        }
      }
    }
    group.position.set(0, far, 0)
    // 把网格添加到场景中
    this.scene.add(group)
  }

  // 创建轨道控制器
  createControls = () => {
    // 创建创建一个轨道控制器 实现交互渲染
    this.controls = new OrbitControls(this.camera, this.renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
    // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
    this.controls.enableDamping = true
    this.controls.dispose()
  }

  clock = new THREE.Clock()
  render = () => {
    this.cubeGroup1.rotation.x = this.clock.getElapsedTime()
    this.cubeGroup1.rotation.y = this.clock.getElapsedTime()

    this.cubeGroup2.rotation.x = -this.clock.getElapsedTime()
    this.cubeGroup2.rotation.y = -this.clock.getElapsedTime()
    this.cubeGroup2.position.x = Math.sin(this.clock.getElapsedTime()) // 通过时间来改变位置 产生动画效果 通过Math.sin()来实现正弦函数 产生周期性的变化 数值为-1~1之间

    // this.cubeGroup3.position.x = Math.sin(this.clock.getElapsedTime()) * 10
    this.cubeGroup3.position.z = Math.sin(this.clock.getElapsedTime()) * 25
    // this.cubeGroup3.position. = Math.sin(this.clock.getElapsedTime() * 2)
    // 设置阻尼感必须在动画中调用.update()
    // this.controls.update()
    // 移动相机
    this.camera.position.y =
      -(window.scrollY / window.innerHeight) * this.nextPosition // 当前滚动的距离 / 屏幕高度 * 物体间距 下滚动所以是-y 让相机沿着-y轴移动

    // 使用渲染器,通过相机将场景渲染出来
    this.renderer.render(this.scene, this.camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    this.animationId = requestAnimationFrame(this.render)
  }

  // // 监听滚动
  // onScroll = () => {
  //   // 滚动监听
  //   window.addEventListener('scroll', () => {
  //     // console.log(Math.floor(window.scrollY / window.innerHeight))
  //   })
  // }

  // 尺寸变化时调整渲染器大小
  onWindowResize = () => {
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
  dispose = () => {
    // console.log(this.animationId)
    // 清除渲染器
    this.renderer.dispose()
    // 清除轨道控制器
    this.controls.dispose()
    // 清除动画
    cancelAnimationFrame(this.animationId)
  }
}
