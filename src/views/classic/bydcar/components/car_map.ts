// 导入three.js
import * as THREE from 'three'
// 导入gsap
import { gsap } from 'gsap'

const startTime = 1
const endTime = 0.5

// 创建车门相关的交互
export const doorClick = new Map([
  [
    '右前光标',
    (carMesh: THREE.Object3D) => {
      const angle = Math.PI / 3.5

      if (carMesh.rotation.y === 0) {
        gsap.to(carMesh.rotation, {
          y: angle,
          duration: startTime,
          ease: 'power2.out'
        })
      } else {
        gsap.to(carMesh.rotation, {
          y: 0,
          duration: endTime,
          ease: 'power4.out'
        })
      }
    }
  ],
  [
    '左前光标',
    (carMesh: THREE.Object3D) => {
      const angle = Math.PI / 3.5

      if (carMesh.rotation.y === 0) {
        gsap.to(carMesh.rotation, {
          y: -angle,
          duration: startTime,
          ease: 'power2.out'
        })
      } else {
        gsap.to(carMesh.rotation, {
          y: 0,
          duration: endTime + 0.1,
          ease: 'power4.out'
        })
      }
    }
  ],
  [
    '右后光标',
    (carMesh: THREE.Object3D) => {
      const angle = Math.PI / 3.5

      if (carMesh.rotation.y === 0) {
        gsap.to(carMesh.rotation, {
          y: angle,
          duration: startTime,
          ease: 'power2.out'
        })
      } else {
        gsap.to(carMesh.rotation, {
          y: 0,
          duration: endTime + 0.1,
          ease: 'power4.out'
        })
      }
    }
  ],
  [
    '左后光标',
    (carMesh: THREE.Object3D) => {
      const angle = Math.PI / 3.5

      if (carMesh.rotation.y === 0) {
        gsap.to(carMesh.rotation, {
          y: -angle,
          duration: startTime,
          ease: 'power2.out'
        })
      } else {
        gsap.to(carMesh.rotation, {
          y: 0,
          duration: endTime + 0.1,
          ease: 'power4.out'
        })
      }
    }
  ],
  [
    '后备箱光标',
    (carMesh: THREE.Object3D) => {
      const angle = Math.PI / 3.5

      if (carMesh.rotation.z === 0) {
        gsap.to(carMesh.rotation, {
          z: angle,
          duration: startTime,
          ease: 'power2.out'
        })
      } else {
        gsap.to(carMesh.rotation, {
          z: 0,
          duration: endTime + 0.1,
          ease: 'power4.out'
        })
      }
    }
  ]
])

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

// 汽车相关的材质
export const mapFunction = new Map([
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
