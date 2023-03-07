// 导入工具方法类
import { CreatedUtils } from '@/glsltype/utils_renderer'
// 导入three.js
import * as THREE from 'three'
// 导入外包加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入加载
import { loadTexture } from '@/utils/loading'
// 导入汽车模型gltf
import car from '@/assets/car/轿车.gltf'

export class LoaderCar extends CreatedUtils {
  // 创建汽车glTF加载器
  loader = new GLTFLoader(loadTexture())
  // 创建汽车组
  carGroup = new THREE.Group()

  // 加载轿车模型
  loadCar = async () => {
    this.setScene()

    // 异步获得加载的模型
    const gltf = await this.loader.loadAsync(car)

    this.carGroup.add(gltf.scene)

    // 创建包围盒
    this.getBoxSize(this.carGroup)

    this.scene.add(this.carGroup)
  }

  // 设置场景方面的内容
  setScene = () => {
    // 添加场景添加背景
    this.scene.background = new THREE.Color('#757575')
  }
}
