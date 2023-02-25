// 导入手机模型gltf
import huawei from '@/assets/iphone/huaweiB.glb'
// 静态资源引入方法
import { getAssetsFile } from '@/utils/getAssetsFile'
// 导入three.js
import * as THREE from 'three'
// 导入网格的类型
import type { Mesh } from 'three'
// 导入加载
import { loadFalse } from '@/utils/loading'
// 导入工具方法类
import { CreatedUtils } from '@/glsltype/utils_renderer'
// 导入外包加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入字体加载器
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// 导入字体
import helvetiker from 'three/examples/fonts/optimer_bold.typeface.json?url'

export class LoaderIphone extends CreatedUtils {
  iphoneMap!: THREE.Mesh

  // 手机模型组
  iphone = new THREE.Group()
  // 线和数字介绍的组
  lineAndNumber = new THREE.Group()
  // 创建glTF加载器
  loader = new GLTFLoader()
  // 创建纹理加载器
  textureLoader = new THREE.TextureLoader()
  // 设置一个环境贴图加载器
  envMapLoader = new THREE.CubeTextureLoader()

  // 旋转启动
  rotateGo = false
  // 设置圆的半径
  radius = 60

  // 加载手机模型的操作
  loadIphone = async () => {
    // 开始加载
    loadFalse()

    // 异步获得加载的模型
    const gltf = await this.loader.loadAsync(huawei)

    // 赋值模型
    this.iphone = gltf.scene
    // 查看模型大小
    // this.getBoxSize(this.iphone)
    // 加载完成后进行旋转
    this.rotateGo = true

    // 导入色彩贴图
    const mapTexture = this.textureLoader.loadAsync(
      getAssetsFile('iphone/basecolor.png')
    )

    // 导入金属度贴图
    const metalnessMapTexture = this.textureLoader.loadAsync(
      getAssetsFile('iphone/metallic.png')
    )

    // 导入光滑度贴图
    const roughnessMapTexture = this.textureLoader.loadAsync(
      getAssetsFile('iphone/roughness.png')
    )

    // 导入透明度贴图
    const alphaMapTexture = this.textureLoader.loadAsync(
      getAssetsFile('iphone/opacity.png')
    )

    // 导入法线贴图
    const normalMapTexture = this.textureLoader.loadAsync(
      getAssetsFile('iphone/normal.png')
    )

    // 加载环境贴图
    const envMapTexture = this.envMapLoader.loadAsync([
      getAssetsFile('envMap/px.jpg'),
      getAssetsFile('envMap/nx.jpg'),
      getAssetsFile('envMap/py.jpg'),
      getAssetsFile('envMap/ny.jpg'),
      getAssetsFile('envMap/pz.jpg'),
      getAssetsFile('envMap/nz.jpg')
    ] as any)

    // 请求贴图数据
    const [map, metalnessMap, roughnessMap, alphaMap, normalMap, envMap] =
      await Promise.all([
        mapTexture,
        metalnessMapTexture,
        roughnessMapTexture,
        alphaMapTexture,
        normalMapTexture,
        envMapTexture
      ])

    // 取消贴图的反转
    map.flipY = false
    metalnessMap.flipY = false
    roughnessMap.flipY = false
    alphaMap.flipY = false
    normalMap.flipY = false

    // 查找贴图材质
    this.iphoneMap = this.iphone.getObjectByName('手机') as Mesh

    // 设置材质
    this.iphoneMap.material = new THREE.MeshStandardMaterial({
      // 设置透明度
      transparent: true,
      // 设置金属度
      metalness: 1,
      // 设置光滑度
      roughness: 0.5,
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
      envMapIntensity: 0.8
    })
    // 添加场景中去
    this.scene.add(this.iphone)

    // 加载完成
    loadFalse(true)
  }

  // 绘制一个半圆线
  drawHalfCircle = () => {
    // 声明一个几何对象
    const linGeometry = new THREE.BufferGeometry()

    // 通过椭圆曲线（弧线）绘制一个半圆, 默认是逆时针绘制
    // 绘制一个缺口的半圆
    // 360° - 45° = 315°
    const curve = new THREE.EllipseCurve(
      0, // 中心的X坐标，默认值为0。
      0, // 中心的Y坐标，默认值为0
      this.radius, // X轴向上椭圆的半径，默认值为1
      this.radius, // Y轴向上椭圆的半径，默认值为1
      Math.PI / 4, //  以弧度来表示，从正X轴算起曲线开始的角度，默认值为0
      Math.PI * 2, // 以弧度来表示，从正X轴算起曲线终止的角度，默认值为2 x Math.PI。
      false, // 椭圆是否按照顺时针方向来绘制，默认值为false。 true为顺时针，false为逆时针
      Math.PI / 1.8 //  以弧度表示，椭圆从X轴正方向逆时针的旋转角度（可选），默认值为0。按照设置的顺时针或逆时针方向旋转
    )

    // 提取绘制的弧线
    linGeometry.setFromPoints(curve.getPoints(50))

    // 设置基础线条材质
    const material = new THREE.LineBasicMaterial({
      color: '#ffffff'
    })

    // 设置线条对象
    const line = new THREE.Line(linGeometry, material)

    // 设置线条的位置
    // line.position.set(0, -170 / 2, 0)
    line.rotateX(Math.PI / 2)

    // 添加到组中
    this.lineAndNumber.add(line)
    // 修改组的位置
    this.lineAndNumber.position.set(0, -170 / 2, 0)
    // 添加到场景中
    this.scene.add(this.lineAndNumber)
  }

  // 添加数字介绍
  digital = async () => {
    // 声明字体加载器
    const fontLoader = new FontLoader()

    // 加载常规字体
    const font = await fontLoader.loadAsync(helvetiker)
    // 设置文字几何体
    const fontView = font.generateShapes('720°', 10) // generateShapes(文字: string, 大小: number)

    // 生成文字几何体
    const textGeometry = new THREE.ShapeGeometry(fontView)

    // 设置字体的材质朗伯材质
    const material = new THREE.MeshLambertMaterial({
      color: '#ffffff',
      side: THREE.DoubleSide
    })

    // // 设置文字对象
    const text = new THREE.Mesh(textGeometry, material)

    // 设置文字的位置
    text.position.set(-40, 0, 40)
    text.rotateY(-Math.PI / 5)

    this.lineAndNumber.add(text)
  }

  // 模型相关的操作
  loadEnvMap = async () => {
    // 加载手机模型
    this.loadIphone()
    this.drawHalfCircle()
    this.digital()
    // 添加场景添加背景
    this.scene.background = new THREE.Color('#757575')
  }
}
