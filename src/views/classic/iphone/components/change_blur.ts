// 导入模型渲染操作
import { LoaderIphone } from './loader_iphone'
// 导入three.js
import * as THREE from 'three'
// 导入gsap
import { gsap } from 'gsap'
// 静态资源引入方法
import { getAssetsFile } from '@/utils/getAssetsFile'

/**
 * 切换加载的毛玻璃效果
 */
export class ChangeLoading extends LoaderIphone {
  // 创建一个毛玻璃效果的面板
  glassPanel = new THREE.Group()
  demoMesh!: THREE.Mesh
  // 创建圆弧加载的组
  loadingGroup = new THREE.Group()

  // 作废
  createGlassPanel = () => {
    // 清除文字
    this.clearDigitalText()

    // // 创建毛玻璃材质
    // const material = new THREE.MeshPhysicalMaterial({
    //   side: THREE.DoubleSide,
    //   specularColor: new THREE.Color('#ffffff'),
    //   color: 0xffffff,
    //   transmission: 0.9063505503810331,
    //   opacity: 0.9713801862828112,
    //   metalness: 0,
    //   roughness: 0.45114309906858596,
    //   ior: 1.52,
    //   specularIntensity: 1
    // })

    // // 设置材质
    // this.iphoneMap.material = material
  }

  //创建圆弧
  createArc = async () => {
    if (this.loadingGroup.name === '加载环') return

    // 创建圆弧模板
    const geometry = new THREE.TorusGeometry(1.8, 0.5, 10, 30)
    const material = new THREE.MeshLambertMaterial({
      color: '#ffffff',
      side: THREE.DoubleSide
    })

    // 生成6个圆弧
    for (let i = 0; i < 6; i++) {
      // 创建圆弧网格模型
      const torus = new THREE.Mesh(geometry, material)
      torus.name = i.toString()

      // 设置位置
      torus.position.set(i * 6, 0, 0)
      this.loadingGroup.add(torus)

      // 设置圆弧加载动画
      gsap.to(this.loadingGroup.children[i].position, {
        y: 4,
        delay: i * 0.2,
        repeat: -1,
        yoyo: true
      })
      // gsao
    }

    // 加载的设置位置
    this.loadingGroup.position.set(-15, 0, -100)
    // this.loadingGroup.rotateY(-Math.PI / 5.6)
    // 设置到透视相机中
    this.camera.add(this.loadingGroup)
    // 设置名称
    this.loadingGroup.name = '加载环'
  }

  // 修改手机贴图
  changeIphoneMap = async (mapName: string) => {
    this.clearDigitalText()

    // 添加几何体文字
    this.digitalCube(mapName)

    // 启动加载
    this.createArc()

    // 导入色彩贴图
    const texture = await this.textureLoader.loadAsync(
      getAssetsFile(`iphone/map/${mapName}.png`)
    )

    texture.flipY = false

    const iphoneMapMaterial = this.iphoneMap.material
    // 标记为需要更新
    iphoneMapMaterial.needsUpdate = true
    // 更新贴图
    iphoneMapMaterial.map = texture

    // 清除加载
    this.clearArcText()
  }

  // 清除加载圆弧
  clearArcText = () => {
    this.loadingGroup.clear()
    this.loadingGroup = new THREE.Group()
  }

  // 清除文字
  clearDigitalText = () => {
    console.log(this.lineAndNumber)
    // 删除文字
    this.lineAndNumber.remove(this.text)
  }

  // // 清除毛玻璃面板
  // clearGlassPanel = () => {
  //   this.glassPanel.remove(this.demoMesh)
  //   this.demoMesh.geometry.dispose()
  //   this.demoMesh = null as any
  //   console.log(this.demoMesh)
  // }
}
