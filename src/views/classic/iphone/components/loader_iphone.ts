// 静态资源引入方法
import { getAssetsFile } from '@/utils/getAssetsFile'
// 导入three.js
import * as THREE from 'three'
// 导入加载
import { loadFalse } from '@/utils/loading'
// 导入工具方法类
import { CreatedUtils } from '@/glsltype/utils_renderer'
// 导入外包加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入json字体加载器
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// 导入three.js的json字体, url资源需要在后缀加上?url
import helvetiker from '@/assets/iphone/font/text.json?url'
// import helvetiker from 'three/examples/fonts/optimer_bold.typeface.json?url'
// 导入字体几何体
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
// 导入手机模型gltf
import huawei from '@/assets/iphone/huaweiB.glb'
// 导入字体对应的颜色
import { textMap } from '@/settings'

export class LoaderIphone extends CreatedUtils {
  iphoneMap!: THREE.Mesh
  // 储存手机的大小
  iphoneSize!: THREE.Vector3
  // 文字
  text!: THREE.Mesh

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
  // 字体加载器
  fontLoader = new FontLoader()

  // 修改的位置
  positionChange: [number, number, number] = [0, -170 / 2, 0]
  // 旋转启动
  rotateGo = false
  // 设置圆的半径
  radius = 60

  // 获取手机模型
  getIphoneGltf = async () => {
    // 异步获得加载的模型
    const gltf = await this.loader.loadAsync(huawei)
    // 赋值模型
    this.iphone = gltf.scene
    // 加载完成后进行旋转
    this.rotateGo = true
  }

  // 加载手机模型的操作
  loadIphone = async (mapName = '极光紫') => {
    // 导入色彩贴图
    const mapTexture = this.textureLoader.loadAsync(
      getAssetsFile(`iphone/map/${mapName}.png`)
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
    this.iphoneMap = this.iphone.getObjectByName('手机') as THREE.Mesh

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

    line.rotateX(Math.PI / 2)
    line.name = '圆线'

    // 添加到组中
    this.lineAndNumber.add(line)

    // 添加到场景中
    this.scene.add(this.lineAndNumber)
  }

  // 几何体文字
  digitalCube = async (textItem: string) => {
    // // 存在直接添加
    // if (this.text) {
    //   this.lineAndNumber.add(this.text)
    //   return
    // }
    // 加载json字体
    const font = await this.fontLoader.loadAsync(helvetiker)

    // 设置文字几何体
    // const fontView = font.generateShapes('720°', 10) // generateShapes(文字: string, 大小: number)
    // TextGeometry(文字: string, 参数: object)
    const geometry = new TextGeometry(textItem, {
      font, //THREE.Font的实例。
      size: 8, // 字体大小，默认值为100。
      height: 1, // 挤出文本的厚度。默认值为50
      curveSegments: 20, // Integer。（表示文本的）曲线上点的数量。默认值为12, 3D文字的曲线分 段数越大，圆弧越平滑(大字需要)。

      // 斜角参数, 不开启斜角的话, 下面的参数都不起作用
      bevelEnabled: false, // 是否开启斜角，默认为false, 设置为true时，下面的参数才有效
      bevelThickness: 0, // 文本上斜角的深度，默认值为20
      bevelSize: 0, // 斜角与原始文本轮廓之间的延伸距离。默认值为8。
      bevelSegments: 3 // 斜角的分段数。默认值为3
    })

    // 设置字体的材质朗伯材质
    const material = new THREE.MeshLambertMaterial({
      color: textMap.get(textItem),
      side: THREE.DoubleSide
    })

    // 设置文字模型
    this.text = new THREE.Mesh(geometry, material)

    // 设置文字的位置
    this.text.position.set(-44, 0, 40)
    this.text.rotateY(-Math.PI / 6.1)
    this.text.rotateX(-0.1314)
    this.text.name = '文字'

    // 添加到组中
    this.lineAndNumber.add(this.text)
  }

  // 修改位置
  changePosition = () => {
    // 修改组的位置
    this.lineAndNumber.position.set(...this.positionChange)
  }

  // 模型相关的操作
  loadEnvMap = async () => {
    // 开始加载
    loadFalse()

    // 添加场景添加背景
    this.scene.background = new THREE.Color('#757575')

    // 加载模型
    await this.getIphoneGltf()

    // 绘制圆
    this.drawHalfCircle()

    // 几何字体
    this.digitalCube('极光紫')

    this.changePosition()

    // 加载手机模型
    await this.loadIphone()

    // 加载完成
    loadFalse(true)
  }
}
