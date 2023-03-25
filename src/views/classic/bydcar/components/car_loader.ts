// 导入工具方法类
import { CreatedUtils } from '@/glsltype/utils_renderer'
// 导入three.js
import * as THREE from 'three'
// 导入外包加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入加载器
import { getAssetsFile } from '@/utils/getAssetsFile'
// 导入汽车模型gltf
import car from '/car/轿车.gltf'
import { mapFunction } from './car_map'
import { seatConfig, doorClick } from './car_map'
// 导入gsap
import { gsap } from 'gsap'
// 导入打开车门音频
import carOpne from '@/assets/car/music/car_door.mp3'
// 导入关闭车门音频
import carClose from '@/assets/car/music/car_close.mp3'

export class LoaderCar extends CreatedUtils {
  // 创建汽车glTF加载器
  loader = new GLTFLoader(this.createLoadingGLTF())
  // 创建汽车组
  carGroup = new THREE.Group()

  // 设置一个环境贴图加载器
  envMapLoader = new THREE.CubeTextureLoader()

  // 车子模型
  carMesh!: THREE.Mesh

  // 精灵图标集合
  spriteMeshList = [] as THREE.Sprite[]

  // 音频
  soundOpen!: THREE.Audio

  // 音频
  soundClose!: THREE.Audio

  // three.js的音频监听器
  audioListener!: THREE.AudioListener

  // 创建音频加载器
  audioLoader = new THREE.AudioLoader()

  // 加载轿车模型
  loadCar = async () => {
    // 异步获得加载的模型
    const gltf = await this.loader.loadAsync(car)

    // 修改名称
    gltf.scene.name = '车模'

    // 添加到汽车组中
    this.carGroup.add(gltf.scene)

    // 替换金属内容的材质
    this.carGroup.traverse((child) => {
      // 符合mesh类型(只有mesh网格模型类型才有材质)
      if (child.type === 'Mesh') {
        // 如果名称中包含高光金属
        if (child.name.includes('高光金属')) {
          mapFunction.get('高光金属')?.(child)
        }

        // 如果名称中包含后视镜
        if (child.name.includes('后视镜')) {
          mapFunction.get('后视镜')?.(child)
        }

        // 如果名称中包含外壳
        if (child.name.includes('外壳')) {
          mapFunction.get('外壳')?.(child)
        }

        // 如果名称中包含玻璃
        if (child.name.includes('玻璃')) {
          mapFunction.get('玻璃')?.(child)
        }

        // 如果名称中包含轮胎
        if (child.name.includes('轮胎')) {
          mapFunction.get('轮胎')?.(child)
        }

        // 如果名称中包含前灯罩
        if (child.name.includes('前灯罩')) {
          mapFunction.get('前灯罩')?.(child)
        }

        // 如果名称中包含尾灯灯罩
        if (child.name.includes('尾灯灯罩')) {
          mapFunction.get('尾灯灯罩')?.(child)
        }

        // 如果名称中包含尾灯第二层
        if (child.name.includes('尾灯第二层')) {
          mapFunction.get('尾灯第二层')?.(child)
        }

        // 如果名称中包含尾灯第三层
        if (child.name.includes('尾灯第三层')) {
          mapFunction.get('尾灯第三层')?.(child)
        }

        // 如果名称中包含尾灯发光
        if (child.name.includes('尾灯发光')) {
          mapFunction.get('尾灯发光')?.(child)
        }

        // 如果名称中包含塑料
        if (child.name.includes('塑料')) {
          mapFunction.get('塑料')?.(child)
        }
      }
    })

    // 修改天窗黑玻璃
    const blackGlass = this.carGroup.getObjectByName('天窗黑玻璃') as THREE.Mesh

    blackGlass.material = new THREE.MeshPhysicalMaterial({
      color: 0x00000,
      metalness: 0,
      roughness: 0,
      opacity: 0.7,
      envMapIntensity: 1.0, // 设置环境贴图强度
      transmission: 0.2, //  设置透光度
      transparent: true
    })

    // 修改车座
    const seat = this.carGroup.getObjectByName('车座') as THREE.Mesh

    seat.material = new THREE.MeshPhysicalMaterial({
      color: seatConfig.color,
      metalness: 0.0,
      roughness: seatConfig.roughness,
      envMapIntensity: 1.0
    })

    // 加载精灵贴图
    this.loadSprite()

    // 创建包围盒
    // this.getBoxSize(this.carGroup)

    // 添加到场景中
    this.scene.add(this.carGroup)

    // 启动gui
    this.gui.show()
  }

  // 设置环境贴图
  setEnvMap = async () => {
    const envMapTexture = await this.envMapLoader
      .setPath('/')
      .loadAsync([
        'car/envMap/px.jpg',
        'car/envMap/nx.jpg',
        'car/envMap/py.jpg',
        'car/envMap/ny.jpg',
        'car/envMap/pz.jpg',
        'car/envMap/nz.jpg'
      ])

    // const envMapTexture = await this.envMapLoader.loadAsync([
    //   getAssetsFile('car/envMap/px.jpg'),
    //   getAssetsFile('car/envMap/nx.jpg'),
    //   getAssetsFile('car/envMap/py.jpg'),
    //   getAssetsFile('car/envMap/ny.jpg'),
    //   getAssetsFile('car/envMap/pz.jpg'),
    //   getAssetsFile('car/envMap/nz.jpg')
    // ] as any)

    // 设置环境贴图
    // this.scene.background = new THREE.Color('#9ea6a4')

    // 场景内所有的物体添加默认的环境贴图 (如果物体不单独设置环境贴图 默认使用这个环境贴图)
    this.scene.environment = envMapTexture
  }

  // 创建平面
  createPlane = async () => {
    // 创建平面几何体
    const planeGeometry = new THREE.PlaneGeometry(4000, 4000)

    // 加载地板贴图
    const planeTexture = await this.textureLoader.loadAsync(
      getAssetsFile('floor/瓷砖.jpg')
    )

    // 设置加载器编码格式
    planeTexture.encoding = THREE.sRGBEncoding

    // 设置平铺
    planeTexture.wrapS = THREE.RepeatWrapping
    planeTexture.wrapT = THREE.RepeatWrapping
    // 设置平铺数量, 默认是1, 1, 会拉伸贴图
    planeTexture.repeat.set(50, 50)

    // 创建平面材质
    planeGeometry.rotateX(-Math.PI / 2)

    // 创建平面网格模型
    const planeMesh = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshLambertMaterial({ map: planeTexture })
    )

    // 添加到场景中
    this.scene.add(planeMesh)
  }

  // 加载精灵贴图
  loadSprite = async () => {
    // 加载精灵贴图
    const spriteTexture = await this.textureLoader.loadAsync(
      getAssetsFile('iphone/sprite/光点.png')
    )

    // 创建精灵材质
    const spriteMaterial = new THREE.SpriteMaterial({
      map: spriteTexture,
      transparent: true,
      depthWrite: false
    })

    // 创建精灵网格模型
    const spriteMesh = new THREE.Sprite(spriteMaterial)

    // spriteMesh.position.set(0, 0, -50)

    spriteMesh.scale.set(35, 35, 0)

    spriteMesh.name = '光标'

    // 获取到模型内容
    this.carMesh = this.carGroup.getObjectByName('车模') as THREE.Mesh

    doorClick.forEach((value, key) => {
      // 获取到车模中的门
      const carMesh = this.carMesh.getObjectByName(key)

      // spriteMesh.position.copy()
      carMesh?.add(spriteMesh.clone())

      // 获取到光标
      const spriteMeshName = carMesh?.getObjectByName('光标') as THREE.Sprite

      // 设置光标动画
      gsap.to(spriteMeshName.scale, {
        x: 45,
        y: 45,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.out'
      })

      // 设置光标位置
      if (key === '右前光标' || key === '右后光标') {
        spriteMeshName.position.z -= spriteMesh.scale.x / 2
      }

      if (key === '左前光标' || key === '左后光标') {
        spriteMeshName.position.z += spriteMesh.scale.x / 2
      }

      if (key === '后备箱光标') {
        spriteMeshName.position.x += spriteMesh.scale.x / 2
      }

      this.spriteMeshList.push(spriteMeshName)
      // spriteMesh.name = `光标${key}`
      // spriteMesh.position.set(0, 0, -30)
    })
  }

  // 添加雾化
  addFog = () => {
    // 设置雾化效果
    this.scene.fog = new THREE.Fog('#000000', 450, 1500)
  }

  // 创建一个开门音频
  createAudio = async () => {
    // 创建一个音频监听器
    this.audioListener = new THREE.AudioListener()

    // 将监听器添加到相机中, 为什么要添加到相机中呢? 因为相机是移动的, 所以音频也要跟着移动
    this.camera.add(this.audioListener)

    // 创建一个音频
    this.soundOpen = new THREE.Audio(this.audioListener)

    // 创建一个音频加载器
    this.audioLoader = new THREE.AudioLoader()

    // 加载音频
    const music = await this.audioLoader.loadAsync(carOpne)

    this.soundOpen.setBuffer(music)
  }

  // 创建一个关门音频
  createCloseAudio = async () => {
    // 创建一个音频
    this.soundClose = new THREE.Audio(this.audioListener)

    // 加载音频
    const music = await this.audioLoader.loadAsync(carClose)

    this.soundClose.setBuffer(music)
  }

  // 设置场景方面的内容
  setScene = () => {
    // 加载汽车模型
    this.loadCar()

    // 加载音频
    this.createAudio()

    this.createCloseAudio()

    // 设置环境贴图
    this.setEnvMap()

    // 创建地面
    this.createPlane()

    // 添加雾化
    this.addFog()
  }
}
