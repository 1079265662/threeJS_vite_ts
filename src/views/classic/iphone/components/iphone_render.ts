// 导入公共方法类
import { CreatedRender } from '@/glsltype/createdrender'
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

export class CreatedCanvas extends CreatedRender {
  constructor(canvas: HTMLElement) {
    super()
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

  // 绘制canvas的Dom
  canvas!: HTMLElement | Document | Element
  // 加载的手机模型
  iphone!: THREE.Group

  // 创建glTF加载器
  loader = new GLTFLoader()
  // 创建纹理加载器
  textureLoader = new THREE.TextureLoader()

  // 加载手机模型的操作
  loadIphone = async () => {
    // 异步获得加载的模型
    const ret = await this.loader.loadAsync(huawei)
    // 赋值模型
    this.iphone = ret.scene
    // 添加场景中去
    this.scene.add(this.iphone)
    // 添加环境贴图
    const iphoneMap = this.iphone.getObjectByName('手机')

    const map = this.textureLoader.load(getAssetsFile('iphone/basecolor.png'))
    map.flipY = false
    ;(iphoneMap as Mesh).material = new THREE.MeshStandardMaterial({
      // 设置透明度
      transparent: true,
      // 设置颜色贴图
      map,

      // 设置金属度
      metalnessMap: this.textureLoader.load(
        getAssetsFile('iphone/metallic.png')
      ),
      // 设置光滑度
      roughnessMap: this.textureLoader.load(
        getAssetsFile('iphone/roughness.png')
      )
    })
  }

  // 创建场景
  createScene = () => {
    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(100, 50, 200) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 加载手机模型
    this.loadIphone()

    // 创建平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(400, 200, 300)
    this.scene.add(directionalLight)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    light.position.set(200, 300, 100)
    // light.color.set(new THREE.Color('#ff3040'))
    this.scene.add(light)

    // 创建一个辅助线
    const axesHelper = new THREE.AxesHelper(250)
    this.scene.add(axesHelper)

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
    // 添加监听画布大小变化
    this.onAddEventListener()
  }

  // 渲染动画
  render = () => {
    // 获得动画执行时间
    // const clockTime = this.clock.getElapsedTime()

    // 设置阻尼感必须在动画中调用.update()
    this.controls.update()

    // 使用渲染器,通过相机将场景渲染出来
    this.renderer.render(this.scene, this.camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    this.animationId = requestAnimationFrame(this.render)
  }
}
