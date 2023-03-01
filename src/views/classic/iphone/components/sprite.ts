// 导入工具方法类
import { CreatedUtils } from '@/glsltype/utils_renderer'
// 导入three.js
import * as THREE from 'three'
// 静态资源引入方法
import { getAssetsFile } from '@/utils/getAssetsFile'

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
    })

    const sprite = new THREE.Sprite(material)

    sprite.scale.set(10, 10, 10)

    sprite.position.set(0, 5, -5)

    this.spriteMesh.add(sprite)

    console.log(sprite)

    // 创建精灵材质
  }
}
