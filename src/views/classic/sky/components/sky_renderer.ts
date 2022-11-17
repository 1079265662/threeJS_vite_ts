// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入点材质
import materialTexture from '@/assets/snowflake/snowflake3.png'
import materialTexture2 from '@/assets/snowflake/snowflake4.png'
// 导入音频
import audio from '@/assets/snowflake/music/snowflake_music.mp3'

export class CreateWorld {
  constructor(canvas: any) {
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }
  canvas!: any
  // 设置动画id
  animationId!: number
  // 创造轨道控制器
  controls!: any
  // 设置渲染器
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
    30
  )

  // 创建场景
  createScene() {
    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 5, 20) // 默认没有参数 需要设置参数

    // 封装一个生成雪花方法
    const snowflake = (texture: string, size = 0.3) => {
      // 创建贴图材质加载器
      const textureLoader = new THREE.TextureLoader()

      const material = textureLoader.load(texture)
      // 设置雪花的数量
      const starCount = 5000
      // 创建雪花的几何体
      const starGeometry = new THREE.BufferGeometry()

      // 创建雪花的材质
      const starMaterial = new THREE.PointsMaterial({
        size: size,
        map: material,
        alphaMap: material,
        transparent: true, // 开启透明度
        depthWrite: false, // 关闭深度写入(防止点被遮挡),
        vertexColors: true // 开启顶点颜色 (默认为false) 顶点颜色是指每个顶点都有一个颜色值(默认色值) 顶点颜色的优先级高于材质颜色(通过.color设置的颜色) 顶点颜色的值是一个0-1的值 0表示黑色 1表示白色
      })

      // 创建雪花的位置数组 通过Float32Array创建一个数组 用来存放雪花的位置
      const starPositions = new Float32Array(starCount * 3) // 3个坐标系 所以需要数量*3
      // 设置雪花的颜色
      const starColors = new Float32Array(starCount * 3) // 3个颜色 所以需要数量*3 RGB(0~1, 0~1, 0~1)

      // 设置雪花的位置/顶点 通过for循环遍历雪花的数量 再通过Math.random()随机设置雪花的positions位置属性
      for (let index = 0; index < starPositions.length; index++) {
        starPositions[index] = (Math.random() - 0.5) * 50 // -0.5 ~ 0.5 之间的随机数 * 100
        // starColors[index] = Math.random() // 0 ~ 1 之间的随机数
        starColors[index] = 1 // 0 ~ 1 之间的随机数
      }

      // 设置雪花的位置属性
      starGeometry.setAttribute(
        'position', // 设置位置属性
        new THREE.BufferAttribute(starPositions, 3) // 设置位置属性的值 3个坐标系 3个为一组
      )
      // 设置雪花的颜色属性
      starGeometry.setAttribute(
        'color',
        new THREE.BufferAttribute(starColors, 3)
      )

      // 创建雪花
      const star = new THREE.Points(starGeometry, starMaterial)

      // 返回实例
      return star
    }

    // 创建雪花1
    const star = snowflake(materialTexture)
    // 将雪花1添加到场景中
    this.scene.add(star)
    // 创建雪花2
    const star2 = snowflake(materialTexture)
    // 将雪花2添加到场景中
    this.scene.add(star2)
    // 创建雪花3
    const star3 = snowflake(materialTexture2)
    // 将雪花2添加到场景中
    this.scene.add(star3)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    this.scene.add(light)

    // // 创建一个辅助线
    // const axesHelper = new THREE.AxesHelper(20)
    // this.scene.add(axesHelper)

    // 设置渲染器(画布)的大小 通过setSize()设置
    this.renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
    // 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
    this.canvas.appendChild(this.renderer.domElement)

    // 创建创建一个轨道控制器 实现交互渲染
    this.controls = new OrbitControls(this.camera, this.renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
    // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
    this.controls.enableDamping = true

    // 设置闹钟
    const clock = new THREE.Clock()

    // 创建更新动画的方法
    const render = () => {
      // 获取时间差
      const time = clock.getElapsedTime()
      // 设置雪花的旋转
      star.rotation.x = time * 0.3
      star2.rotation.x = time * 0.3
      star2.rotation.y = time * 0.2
      star3.rotation.x = time * 0.2
      star3.rotation.y = time * -0.1
      // 设置阻尼感必须在动画中调用.update()
      this.controls.update()
      // 使用渲染器,通过相机将场景渲染出来
      this.renderer.render(this.scene, this.camera) // render(场景, 相机)
      // 使用动画更新的回调API实现持续更新动画的效果
      this.animationId = requestAnimationFrame(render)
    }
    // 执行创建更新动画的方法
    render()
    this.createAudio()
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

  // 添加音频
  listener = new THREE.AudioListener()
  // 创建一个全局 audio 源
  sound = new THREE.Audio(this.listener)

  // 创建音频
  createAudio() {
    // 加载一个 sound 并将其设置为 Audio 对象的缓冲区
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load(audio, (buffer) => {
      this.sound.setBuffer(buffer)
      this.sound.setLoop(true)
      this.sound.setVolume(0.5)
    })
    // 给相机添加音源
    this.camera.add(this.listener)
  }

  // 销毁渲染内容
  dispose() {
    // 清除渲染器
    this.renderer.dispose()
    // 清除轨道控制器
    this.controls.dispose()
    // 暂停音乐
    this.sound.stop()
    // 清除动画
    cancelAnimationFrame(this.animationId)
  }
}
