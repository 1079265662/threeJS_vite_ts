// 导入手机模型gltf
import huawei from '@/assets/iphone/huaweiB.glb'
// 静态资源引入方法
import { getAssetsFile } from '@/utils/getAssetsFile'
// 导入three.js
import * as THREE from 'three'
// 导入网格的类型
import type { Mesh } from 'three'
// 导入外包加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入加载
import { loadFalse } from '@/utils/loading'

// 导入工具方法类
import { CreatedUtils } from '@/glsltype/utils_renderer'

export class LoaderIphone extends CreatedUtils {
  // 环境贴图参数
  envMap!: THREE.CubeTexture
  iphoneMap!: THREE.Mesh

  // 加载的手机模型
  iphone = new THREE.Group()
  // 旋转启动
  rotateGo = false
  // 创建glTF加载器
  loader = new GLTFLoader()
  // 创建纹理加载器
  textureLoader = new THREE.TextureLoader()
  // 设置一个环境贴图加载器
  envMapLoader = new THREE.CubeTextureLoader()

  // getIphone = async () => {

  // }

  // 加载手机模型的操作
  loadIphone = async (envMap: THREE.CubeTexture) => {
    // 开始加载
    loadFalse()

    // 异步获得加载的模型
    const gltf = await this.loader.loadAsync(huawei)

    // 赋值模型
    this.iphone = gltf.scene
    // 添加场景中去
    this.scene.add(this.iphone)
    // 查看模型大小
    this.getBoxSize(this.iphone)
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
    const alphaMapTexture = await this.textureLoader.loadAsync(
      getAssetsFile('iphone/opacity.png')
    )

    // 导入法线贴图
    const normalMapTexture = this.textureLoader.loadAsync(
      getAssetsFile('iphone/normal.png')
    )

    // 请求贴图数据
    const [map, metalnessMap, roughnessMap, alphaMap, normalMap] =
      await Promise.all([
        mapTexture,
        metalnessMapTexture,
        roughnessMapTexture,
        alphaMapTexture,
        normalMapTexture
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

    loadFalse(true)
  }

  // 加载环境贴图
  loadEnvMap = async () => {
    // 加载环境贴图
    this.envMap = await this.envMapLoader.loadAsync([
      getAssetsFile('envMap/px.jpg'),
      getAssetsFile('envMap/nx.jpg'),
      getAssetsFile('envMap/py.jpg'),
      getAssetsFile('envMap/ny.jpg'),
      getAssetsFile('envMap/pz.jpg'),
      getAssetsFile('envMap/nz.jpg')
    ] as any)

    // 加载手机模型
    this.loadIphone(this.envMap)

    // envMap.flipY = false
    // 添加场景添加背景
    this.scene.background = this.envMap
  }
}
