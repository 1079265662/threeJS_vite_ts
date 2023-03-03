// 导入工具方法类
import { CreatedUtils } from '@/glsltype/utils_renderer'
// 导入three.js
import * as THREE from 'three'
// 静态资源引入方法
import { getAssetsFile } from '@/utils/getAssetsFile'
// 导入gsap
import { gsap } from 'gsap'
// 创建2D标签
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

export class CreatedSprite extends CreatedUtils {
  spriteMesh!: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>

  // 创建后置摄像头提示
  createdSprite = async (iphone: THREE.Group) => {
    // 查找后置摄像头简介的Mesh
    this.spriteMesh = iphone.getObjectByName('后置摄像头位置') as THREE.Mesh<
      THREE.BufferGeometry,
      THREE.MeshStandardMaterial
    >

    // 导入精灵图
    const spriteMap = await this.textureLoader.loadAsync(
      getAssetsFile('iphone/sprite/光点.png')
    )

    const material = new THREE.SpriteMaterial({
      map: spriteMap,
      transparent: true
      // depthTest: true, // 默认为true
      // depthWrite: false
    })

    const sprite = new THREE.Sprite(material)

    // 设置透明材质的渲染顺序
    sprite.renderOrder = 2

    sprite.scale.set(10, 10, 0)

    gsap.to(sprite.scale, {
      x: 7,
      y: 7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power3.out'
    })

    sprite.position.set(0, 5, -5)

    // this.spriteMesh.add(
    //   // 创建辅助线
    //   this.addaxesHelper(100)
    // )

    this.spriteMesh.add(sprite)
  }

  // 创建2D标签
  Created2DLabel = (label: HTMLElement) => {
    const label2D = new CSS2DObject(label)

    label2D.position.set(0, 0, 0)

    this.scene.add(label2D)
  }
}
