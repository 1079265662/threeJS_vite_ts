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
export class changeLoading extends LoaderIphone {
  // 创建一个毛玻璃效果的面板
  glassPanel = new THREE.Group()
  demoMesh!: THREE.Mesh
  // 创建圆弧加载的组
  loadingGroup = new THREE.Group()

  createGlassPanel = () => {
    // 清除文字
    this.clearDigital()

    // 创建毛玻璃材质
    const material = new THREE.MeshPhysicalMaterial({
      side: THREE.DoubleSide,
      specularColor: new THREE.Color('#ffffff'),
      color: 0xffffff,
      transmission: 0.9063505503810331,
      opacity: 0.9713801862828112,
      metalness: 0,
      roughness: 0.45114309906858596,
      ior: 1.52,
      specularIntensity: 1
    })

    // 设置材质
    this.iphoneMap.material = material

    // 启动加载圆弧
    this.createArc()

    // 修改文字

    // // 创建一个网格模型
    // this.demoMesh = new THREE.Mesh(geometry, material)

    // // 添加到组里
    // this.glassPanel.add(this.demoMesh)

    // //  修改位置
    // this.glassPanel.position.set(0, 0, 65)

    // // 添加到场景里
    // this.scene.add(this.glassPanel)
  }

  //创建圆弧
  createArc = () => {
    // console.log(this.loadingGroup.name)

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
        y: 3,
        delay: i * 0.2,
        repeat: -1,
        yoyo: true
      })
    }

    // 加载的设置位置
    this.loadingGroup.position.set(-42.5, 0, 40)
    this.loadingGroup.rotateY(-Math.PI / 5.6)
    this.loadingGroup.name = '加载环'

    // 添加到总组里
    this.lineAndNumber.add(this.loadingGroup)
  }

  // 修改手机贴图
  changeIphoneMap = async (mapName: string) => {
    // 实现毛玻璃效果
    this.createGlassPanel()

    this.loadIphone(mapName)

    // 取消加载
    this.clearArc()

    // 创建文字
    this.digitalCube('720°')
  }

  // 清除加载圆弧
  clearArc = () => {
    this.loadingGroup.clear()
    this.loadingGroup = new THREE.Group()
  }

  // // 清除毛玻璃面板
  // clearGlassPanel = () => {
  //   this.glassPanel.remove(this.demoMesh)
  //   this.demoMesh.geometry.dispose()
  //   this.demoMesh = null as any
  //   console.log(this.demoMesh)
  // }
}
