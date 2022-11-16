// 导入three.js
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
  redMaterial?: any

  constructor(canvas: any) {
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

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
    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 0, 50) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 创建立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // 创建材质
    const material = new THREE.MeshBasicMaterial({
      color: '#ffffff',
      wireframe: true
    })
    // 创建颜色
    this.redMaterial = new THREE.MeshBasicMaterial({
      color: '#ff3040',
      wireframe: true
    })

    // 生成1000个立方体 10的3次方 -5到5之间
    for (let i = -5; i < 5; i++) {
      for (let j = -5; j < 5; j++) {
        for (let h = -5; h < 5; h++) {
          // 创建网格
          const cube = new THREE.Mesh(geometry, material)
          cube.position.set(i * 3, j * 3, h * 3)
          // 把网格添加到场景中
          this.scene.add(cube)
        }
      }
    }

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

    this.render()
    this.createdRaycaster()
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

  // 光线投射
  createdRaycaster = () => {
    // 创建二维向量 用于记录鼠标的位置
    const mouse = new THREE.Vector2()
    window.addEventListener('mousemove', ({ clientX, clientY }) => {
      // 将鼠标点击位置的屏幕坐标转换成three.js中的标准设备坐标
      mouse.x = (clientX / window.innerWidth) * 2 - 1 // X轴坐标 2个单位 -1到1
      mouse.y = -((clientY / window.innerHeight) * 2 - 1) // Y轴坐标 2个单位 -1到1 这里需要反转一下 因为在JS/CSS坐标中Y轴是反的

      // 创建一个光线投射器
      const raycaster = new THREE.Raycaster()
      // 设置光线投射器的射线 通过setFromCamera()设置 传入鼠标的位置和相机
      raycaster.setFromCamera(mouse, this.camera)

      // 获取所有的立方体 intersectObjects()传入需要检测的物体
      const cube = raycaster.intersectObjects(this.scene.children) // 会返回所有与射线相交的多个对象的数组
      // 遍历选中的立方体 批量修改
      cube.forEach((item) => {
        ;(item.object as THREE.Mesh).material = this.redMaterial // 替换所选材质 item.object是Object3D类型 需要断言为Mesh类型
      })
    })
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
