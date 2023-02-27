// 导入模型渲染操作
import { LoaderIphone } from './loader_iphone'
// 导入three.js
import * as THREE from 'three'

/**
 * 切换加载的高斯面板
 */
export class changeLoading extends LoaderIphone {
  // 创建一个毛玻璃效果的面板
  glassPanel = new THREE.Group()
  demoMesh!: THREE.Mesh

  createGlassPanel = () => {
    console.log(this.iphoneSize)
    // 解构手机大小
    const { x, y } = this.iphoneSize
    // 创建一个面板
    const geometry = new THREE.PlaneGeometry(x, y)

    // 创建一个材质
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

    // // 创建一个网格模型
    // this.demoMesh = new THREE.Mesh(geometry, material)

    // // 添加到组里
    // this.glassPanel.add(this.demoMesh)

    // //  修改位置
    // this.glassPanel.position.set(0, 0, 65)

    // // 添加到场景里
    // this.scene.add(this.glassPanel)
  }

  // 清除毛玻璃面板
  clearGlassPanel = () => {
    this.glassPanel.remove(this.demoMesh)
    this.demoMesh.geometry.dispose()
  }
}
