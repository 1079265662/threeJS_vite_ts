// 导入工具方法类
import { CreatedUtils } from '@/glsltype/utils_renderer'
// 导入three.js
import * as THREE from 'three'
// 导入外包加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入加载
import { loadTexture } from '@/utils/loading'
// 静态资源引入方法
import { getAssetsFile } from '@/utils/getAssetsFile'
// 导入汽车模型gltf
import car from '@/assets/car/轿车.gltf'

export class LoaderCar extends CreatedUtils {
  // 创建汽车glTF加载器
  loader = new GLTFLoader(loadTexture())
  // 创建汽车组
  carGroup = new THREE.Group()

  // 设置一个环境贴图加载器
  envMapLoader = new THREE.CubeTextureLoader()

  // 加载轿车模型
  loadCar = async () => {
    // 异步获得加载的模型
    const gltf = await this.loader.loadAsync(car)

    // 添加到汽车组中
    this.carGroup.add(gltf.scene)

    // 创建包围盒
    this.getBoxSize(this.carGroup)

    // 添加到场景中
    this.scene.add(this.carGroup)
  }

  // 设置环境贴图
  setEnvMap = async () => {
    const envMapTexture = await this.envMapLoader.loadAsync([
      getAssetsFile('car/envMap/px.jpg'),
      getAssetsFile('car/envMap/nx.jpg'),
      getAssetsFile('car/envMap/py.jpg'),
      getAssetsFile('car/envMap/ny.jpg'),
      getAssetsFile('car/envMap/pz.jpg'),
      getAssetsFile('car/envMap/nz.jpg')
    ] as any)

    // 设置环境贴图
    this.scene.background = envMapTexture

    // 场景内所有的物体添加默认的环境贴图 (如果物体不单独设置环境贴图 默认使用这个环境贴图)
    this.scene.environment = envMapTexture
  }

  // 设置场景方面的内容
  setScene = () => {
    this.loadCar()
    this.setEnvMap()
  }
}
