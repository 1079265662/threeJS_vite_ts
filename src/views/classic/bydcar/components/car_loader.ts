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
  color: new THREE.Color('#9d0b12'), // 设置颜色
  clearcoat: 1, // 设置清漆度
  clearcoatRoughness: 0.01, // 设置清漆粗糙度
  metalness: 0.9, // 设置金属度
  roughness: 0.5, // 设置粗糙度
  envMapIntensity: 1.5, // 设置环境贴图强度
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

// 轮胎效果
export const tires = <THREE.MeshStandardMaterial>{
  metalness: 0, // 设置金属度
  roughness: 0.6, // 设置粗糙度
  normalScale: new THREE.Vector2(3, 3), // 设置法线贴图缩放
  color: new THREE.Color(0x000000), // 设置颜色
  type: '轮胎'
}

// 前灯罩
export const headLights = <THREE.MeshPhysicalMaterial>{
  metalness: 0,
  roughness: 0,
  transmission: 1, // 设置透光度
  transparent: true,
  opacity: 0.9,
  envMapIntensity: 1.5, // 设置环境贴图强度
  type: '前灯罩'
}

// 尾灯灯罩
export const tailLights = <THREE.MeshPhysicalMaterial>{
  color: new THREE.Color(0xff0000),
  type: '尾灯灯罩'
}

// 尾灯第二层
export const tailLights2 = <THREE.MeshPhysicalMaterial>{
  color: new THREE.Color('#ff0000'),
  type: '尾灯第二层'
}

// 尾灯第三层
export const tailLights3 = <THREE.MeshPhysicalMaterial>{
  color: new THREE.Color(0x19190000),
  type: '尾灯第三层'
}

// 尾灯发光
export const tailLights4 = <THREE.MeshPhysicalMaterial>{
  color: new THREE.Color(0x660000),
  type: '尾灯发光'
}

// 塑料
export const plastic = <THREE.MeshStandardMaterial>{
  color: new THREE.Color(0x010101),
  metalness: 0, // 设置金属度
  roughness: 0.4, // 设置粗糙度
  envMapIntensity: 1, // 设置环境贴图强度
  type: '塑料'
}

// 车座
export const seatConfig = <THREE.MeshStandardMaterial>{
  color: new THREE.Color(0x010101),
  roughness: 0.5, // 设置粗糙度
  type: '车座'
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

        //  0.06 , 0.2 ,0.007
        meshOject.material = new THREE.MeshPhysicalMaterial({
          color: guiControlsShell.color,
          clearcoat: guiControlsShell.clearcoat, // 设置清漆度
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
    ],
    // 轮胎凹凸感增强
    [
      '轮胎',
      (child: THREE.Object3D) => {
        const childMesh = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshStandardMaterial
        >
        childMesh.material.color = tires.color // 设置颜色
        childMesh.material.normalScale = tires.normalScale //加强法线贴图凹凸效果
        childMesh.material.metalness = tires.metalness // 设置金属度
        childMesh.material.roughness = tires.roughness // 设置粗糙度
      }
    ],
    // 前灯罩
    [
      '前灯罩',
      (child: THREE.Object3D) => {
        const childMesh = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshPhysicalMaterial
        >
        childMesh.material = new THREE.MeshPhysicalMaterial({
          color: '#ffffff',
          metalness: headLights.metalness,
          roughness: headLights.roughness,
          transmission: headLights.transmission,
          transparent: true,
          opacity: headLights.opacity,
          envMapIntensity: headLights.envMapIntensity
        })
      }
    ],
    // 尾灯灯罩
    [
      '尾灯灯罩',
      (child: THREE.Object3D) => {
        const childMesh = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshPhysicalMaterial
        >

        childMesh.material = new THREE.MeshPhysicalMaterial({
          color: tailLights.color,
          metalness: 0,
          roughness: 0,
          transmission: 0.5, // 设置透光度
          opacity: 1,
          transparent: true,
          envMapIntensity: 1.5
        })
      }
    ],
    // 尾灯第二层
    [
      '尾灯第二层',
      (child: THREE.Object3D) => {
        const childMesh = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshPhysicalMaterial
        >

        childMesh.material = new THREE.MeshPhysicalMaterial({
          color: tailLights2.color,
          metalness: 0,
          roughness: 0,
          transmission: 0.5,
          transparent: true
        })
      }
    ],
    // 尾灯第三层
    [
      '尾灯第三层',
      (child: THREE.Object3D) => {
        const childMesh = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshLambertMaterial
        >

        childMesh.material = new THREE.MeshLambertMaterial({
          color: tailLights3.color
        })
      }
    ],

    // 尾灯发光
    [
      '尾灯发光',
      (child: THREE.Object3D) => {
        const childMesh = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshLambertMaterial
        >
        childMesh.material = new THREE.MeshLambertMaterial({
          color: tailLights4.color
        })
      }
    ],
    // 塑料
    [
      '塑料',
      (child: THREE.Object3D) => {
        const childMesh = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshStandardMaterial
        >

        childMesh.material = new THREE.MeshStandardMaterial({
          color: plastic.color,
          metalness: plastic.metalness,
          roughness: plastic.roughness,
          envMapIntensity: plastic.envMapIntensity
        })
      }
    ]
  ])

  // 创建汽车glTF加载器
  loader = new GLTFLoader(this.createLoadingGLTF())
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

        // 如果名称中包含轮胎
        if (child.name.includes('轮胎')) {
          this.mapFunction.get('轮胎')?.(child)
        }

        // 如果名称中包含前灯罩
        if (child.name.includes('前灯罩')) {
          this.mapFunction.get('前灯罩')?.(child)
        }

        // 如果名称中包含尾灯灯罩
        if (child.name.includes('尾灯灯罩')) {
          this.mapFunction.get('尾灯灯罩')?.(child)
        }

        // 如果名称中包含尾灯第二层
        if (child.name.includes('尾灯第二层')) {
          this.mapFunction.get('尾灯第二层')?.(child)
        }

        // 如果名称中包含尾灯第三层
        if (child.name.includes('尾灯第三层')) {
          this.mapFunction.get('尾灯第三层')?.(child)
        }

        // 如果名称中包含尾灯发光
        if (child.name.includes('尾灯发光')) {
          this.mapFunction.get('尾灯发光')?.(child)
        }

        // 如果名称中包含塑料
        if (child.name.includes('塑料')) {
          this.mapFunction.get('塑料')?.(child)
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

    // 创建包围盒
    this.getBoxSize(this.carGroup)

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

  // 添加雾化
  addFog = () => {
    // 设置雾化效果
    this.scene.fog = new THREE.Fog('#000000', 500, 1500)
  }

  // 设置场景方面的内容
  setScene = () => {
    // 加载汽车模型
    this.loadCar()

    // 设置环境贴图
    this.setEnvMap()

    // 创建地面
    this.createPlane()

    // 添加雾化
    this.addFog()
  }
}
