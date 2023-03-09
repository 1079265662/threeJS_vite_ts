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

// 调试参数
// 金属条
export const guiControlsLine = <THREE.MeshStandardMaterial>{
  metalness: 1.0,
  roughness: 0.2,
  envMapIntensity: 1.0,
  type: '高光金属'
}

// 后视镜
export const guiControlsMirror = <THREE.MeshStandardMaterial>{
  metalness: 1.0,
  roughness: 0,
  envMapIntensity: 1.0,
  type: '后视镜'
}

// 车子外壳效果
export const guiControlsShell = <THREE.MeshPhysicalMaterial>{
  clearcoat: 1, //
  clearcoatRoughness: 0.01,
  metalness: 0.9,
  roughness: 0.5,
  envMapIntensity: 2.5,
  type: '外壳'
}

// 所有玻璃效果(非金属)
export const guiControlsGlass = <THREE.MeshPhysicalMaterial>{
  metalness: 0, // 设置金属度
  roughness: 0, // 设置粗糙度
  transmission: 1, // 设置透光度
  envMapIntensity: 1, // 设置环境贴图强度
  opacity: 0.5, // 设置透明度
  type: '玻璃'
}

export class LoaderCar extends CreatedUtils {
  mapFunction = new Map([
    // 金属条
    [
      '高光金属',
      (child: THREE.Object3D) => {
        // 修改材质
        const meshOject = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshStandardMaterial
        >
        meshOject.material = new THREE.MeshStandardMaterial({
          color: meshOject.material.color,
          metalness: guiControlsLine.metalness,
          roughness: guiControlsLine.roughness,
          envMapIntensity: guiControlsLine.envMapIntensity
        })
      }
    ],
    // 后视镜
    [
      '后视镜',
      (child: THREE.Object3D) => {
        // 修改材质
        const meshOject = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshStandardMaterial
        >
        meshOject.material = new THREE.MeshStandardMaterial({
          color: '#ffffff',
          metalness: guiControlsMirror.metalness,
          roughness: guiControlsMirror.roughness,
          envMapIntensity: guiControlsMirror.envMapIntensity
        })
      }
    ],
    // 车的油漆外壳
    [
      '外壳',
      (child: THREE.Object3D) => {
        // 修改材质
        const meshOject = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshPhysicalMaterial
        >
        meshOject.material = new THREE.MeshPhysicalMaterial({
          color: meshOject.material.color,
          clearcoat: guiControlsShell.clearcoat, // 设置清晰度
          clearcoatRoughness: guiControlsShell.clearcoatRoughness, // 设置清晰度粗糙度
          metalness: guiControlsShell.metalness, // 设置金属度
          roughness: guiControlsShell.roughness, // 设置粗糙度
          envMapIntensity: guiControlsShell.envMapIntensity // 设置环境贴图强度
        })
      }
    ],
    // 车的玻璃
    [
      '玻璃',
      (child: THREE.Object3D) => {
        // 修改材质
        const meshOject = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshPhysicalMaterial
        >
        console.log(meshOject)

        meshOject.material = new THREE.MeshPhysicalMaterial({
          color: '#000000', // 设置颜色
          opacity: 0.5, // 设置透明度, 默认为1 透明度可以实现车窗膜效果
          transparent: true, // 设置透明
          transmission: guiControlsGlass.transmission, // .transmission属性用于设置玻璃材质
          metalness: guiControlsGlass.metalness, // 设置金属度
          roughness: guiControlsGlass.roughness, // 设置粗糙度
          envMapIntensity: guiControlsGlass.envMapIntensity // 设置环境贴图强度
        })
      }
    ]
  ])

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
          this.mapFunction.get('高光金属')?.(child)
        }

        // 如果名称中包含后视镜
        if (child.name.includes('后视镜')) {
          this.mapFunction.get('后视镜')?.(child)
        }

        // 如果名称中包含外壳
        if (child.name.includes('外壳')) {
          this.mapFunction.get('外壳')?.(child)
        }

        // 如果名称中包含玻璃
        if (child.name.includes('玻璃')) {
          this.mapFunction.get('玻璃')?.(child)
        }

        // this.carGroup.getObjectByName('天窗黑玻璃')!.material =
        //   new THREE.MeshPhysicalMaterial({
        //     color: 0x00000,
        //     metalness: 0,
        //     roughness: 0,
        //     envMapIntensity: 1.0,
        //     transmission: 0.2, // .transmission属性用于设置玻璃材质
        //     transparent: true
        //   })
      }
    })

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
    // 加载汽车模型
    this.loadCar()

    // 设置环境贴图
    this.setEnvMap()
  }
}
