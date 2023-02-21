// 导入工具方法类
import { CreatedUtils } from '@/glsltype/utils_renderer'
// 导入three.js
import * as THREE from 'three'
// 导入网格的类型
import type { Mesh } from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入外包加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入手机模型gltf
import huawei from '@/assets/iphone/huaweiB.glb'
// 静态资源引入方法
import { getAssetsFile } from '@/utils/getAssetsFile'
// 导入加载
import { loadTexture } from '@/utils/loading'

export class CreatedCanvas extends CreatedUtils {
  constructor(canvas: HTMLElement) {
    super()
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

  // 绘制canvas的Dom
  canvas!: HTMLElement | Document | Element
  // 加载的手机模型
  iphone = new THREE.Object3D()
  // 旋转启动
  rotateGo = false

  // 创建glTF加载器
  loader = new GLTFLoader(loadTexture())
  // 创建纹理加载器
  textureLoader = new THREE.TextureLoader()
  // 设置一个环境贴图加载器
  envMapLoader = new THREE.CubeTextureLoader()

  // 加载手机模型的操作
  loadIphone = async () => {
    // 异步获得加载的模型
    const gltf = await this.loader.loadAsync(huawei)
    // 赋值模型
    this.iphone = gltf.scene
    // 加载完成后进行旋转
    this.rotateGo = true

    // 导入色彩贴图
    const map = await this.textureLoader.loadAsync(
      getAssetsFile('iphone/basecolor.png')
    )
    // 取消贴图的反转
    map.flipY = false

    // 导入金属度贴图
    const metalnessMap = await this.textureLoader.loadAsync(
      getAssetsFile('iphone/metallic.png')
    )
    metalnessMap.flipY = false

    // 导入光滑度贴图
    const roughnessMap = await this.textureLoader.loadAsync(
      getAssetsFile('iphone/roughness.png')
    )
    roughnessMap.flipY = false

    // 导入法线贴图
    const normalMap = await this.textureLoader.loadAsync(
      getAssetsFile('iphone/normal.png')
    )
    normalMap.flipY = false

    // 导入透明度贴图
    const alphaMap = await this.textureLoader.loadAsync(
      getAssetsFile('iphone/opacity.png')
    )
    alphaMap.flipY = false

    // 加载环境贴图
    const envMap = await this.envMapLoader.loadAsync([
      getAssetsFile('envMap/px.jpg'),
      getAssetsFile('envMap/nx.jpg'),
      getAssetsFile('envMap/py.jpg'),
      getAssetsFile('envMap/ny.jpg'),
      getAssetsFile('envMap/pz.jpg'),
      getAssetsFile('envMap/nz.jpg')
    ] as any)
    // envMap.flipY = false
    // 添加场景添加背景
    this.scene.background = envMap

    // 添加场景中去
    this.scene.add(this.iphone)

    // 查看模型大小
    this.getBoxSize(this.iphone)

    // 添加环境贴图
    const iphoneMap = this.iphone.getObjectByName('手机')
    // 设置材质
    ;(iphoneMap as Mesh).material = new THREE.MeshStandardMaterial({
      // 设置透明度
      transparent: true,
      // 设置金属度
      metalness: 1,
      // 设置光滑度
      roughness: 0,
      // 设置颜色贴图
      map,
      // 设置金属度
      metalnessMap,
      // 设置光滑度
      roughnessMap,
      // 设置法线贴图
      normalMap,
      // 设置透明度贴图
      alphaMap,
      // 设置环境贴图
      envMap,
      // 设置环境贴图的强度, 默认是1
      envMapIntensity: 1
    })
  }

  // 创建场景
  createScene = () => {
    // 加载手机模型
    this.loadIphone()

    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(100, 50, 200) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 创建平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(200, 100, 300)
    this.scene.add(directionalLight)
    // this.setLightHelper(directionalLight)
    // 创建平行光
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight2.position.set(-200, -100, -300)
    this.scene.add(directionalLight2)
    // this.setLightHelper(directionalLight2)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    light.position.set(200, 300, 100)
    // light.color.set(new THREE.Color('#ff3040'))
    this.scene.add(light)

    // 创建辅助线
    // this.addaxesHelper(100)

    // 设置渲染器(画布)的大小 通过setSize()设置
    this.renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
    // 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
    this.canvas.appendChild(this.renderer.domElement)

    // 创建创建一个轨道控制器 实现交互渲染
    // new OrbitControls(相机, 渲染器Dom元素)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
    this.controls.enableDamping = true
    // 禁用轨道控制器
    // this.controls.enabled = false

    // 添加渲染抗锯齿
    // this.renderer.alpha = true
    // console.log(this.renderer)

    // 渲染方法
    this.render()
    // 监听操作页面尺寸改变
    this.onAddEventListenerMousemove()
    // 开启物体的旋转
    this.onAddEventListener()
  }

  // 监听窗口变化
  onAddEventListenerMousemove = () => {
    window.addEventListener('mousemove', this.stopRotate)
  }

  // 通过光线投射, 暂停物体的旋转
  stopRotate = (item: MouseEvent) => {
    const { clientX, clientY } = item
    // 创建二维向量 用于记录鼠标的位置
    const mouse = new THREE.Vector2()

    // mousemove 鼠标移动事件 还可以替换其他时间click等
    // 将鼠标点击位置的屏幕坐标转换成three.js中的标准设备坐标
    mouse.x = (clientX / window.innerWidth) * 2 - 1 // X轴坐标 2个单位 -1到1
    mouse.y = -((clientY / window.innerHeight) * 2 - 1) // Y轴坐标 2个单位 -1到1 这里需要反转一下 因为在JS/CSS坐标中Y轴是反的

    // 创建一个光线投射器
    const raycaster = new THREE.Raycaster()
    // 设置光线投射器的射线 通过setFromCamera()设置 传入鼠标的位置和相机
    raycaster.setFromCamera(mouse, this.camera)

    // 获取所有的立方体 intersectObjects()传入需要检测的物体
    const cube = raycaster.intersectObjects(this.scene.children) // 会返回所有与射线相交的多个对象的数组

    // 判断是否移动到手机上
    cube[0]?.object.name === '手机'
      ? (this.rotateGo = false)
      : (this.rotateGo = true)
  }

  // 销毁监听
  onRemoveEventListener = () => {
    window.removeEventListener('mousemove', this.stopRotate)
  }

  // 渲染动画
  render = () => {
    // 获得动画执行时间
    // const clockTime = this.clock.getElapsedTime()

    // 加载成功后进行旋转操作, 判断是否需要旋转操作
    if (this.rotateGo) {
      this.iphone.rotateY(0.005)
    }
    // 设置阻尼感必须在动画中调用.update()
    this.controls.update()
    // 使用渲染器,通过相机将场景渲染出来
    this.renderer.render(this.scene, this.camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    this.animationId = requestAnimationFrame(this.render)
  }
}
