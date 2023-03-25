import { GuiCreated } from './car_gui'
import { guiControlsShell, doorClick } from './car_map'
// 导入three.js
import * as THREE from 'three'
// 导入颜色内容
import { colorMap } from '../index.vue'
// 导入gsap
import { gsap } from 'gsap'

export class ChangeCar extends GuiCreated {
  // 创建一个光线投射器
  raycaster = new THREE.Raycaster()

  // 换色时间轴
  changeColorTimeline = gsap.timeline()

  // 修改汽车默认颜色
  changeCarColor = (color: string | undefined) => {
    this.changCarMaterial({
      name: guiControlsShell.type,
      type: 'color',
      value: new THREE.Color(color)
    })
  }

  // 打开车门
  openCarDoor = (item: MouseEvent) => {
    // 获得全屏的webgl设备坐标
    const FullXY = this.calculateFullXY(item)

    this.raycaster.setFromCamera(FullXY, this.camera)

    if (this.carMesh) {
      // 获得光线投射的内容
      const spriteMeshRay = this.raycaster.intersectObjects(this.spriteMeshList)

      // 如果点击的是车门
      if (spriteMeshRay[0]?.object.parent?.name) {
        const carMesh = this.carMesh.getObjectByName(
          spriteMeshRay[0].object.parent.name
        ) as THREE.Mesh

        // 执行车门的点击事件
        doorClick.get(spriteMeshRay[0].object.parent.name)?.(
          // 车门的父级是车身
          carMesh.parent as THREE.Object3D
        )

        if (
          carMesh.parent?.rotation.y === 0 &&
          carMesh.parent?.rotation.z === 0
        ) {
          if (!this.soundOpen.isPlaying) this.soundOpen.play()
        } else {
          if (!this.soundClose.isPlaying) this.soundClose.play()
        }
      }
    }
  }

  // 打开全部车门
  openAllCarDoor = () => {
    this.spriteMeshList.forEach((item) => {
      const carMesh = this.carMesh.getObjectByName(
        item.parent!.name
      ) as THREE.Mesh

      // 全部展开
      doorClick.get(item.parent!.name)?.(carMesh.parent as THREE.Object3D)

      if (
        carMesh.parent?.rotation.y === 0 &&
        carMesh.parent?.rotation.z === 0
      ) {
        if (!this.soundOpen.isPlaying) this.soundOpen.play()
      } else {
        if (!this.soundClose.isPlaying) this.soundClose.play()
      }
    })
  }

  // 变换颜色
  changeCarMaterial = () => {
    // 创建rgb颜色数组
    const rgbValue: THREE.Color[] = []

    // 遍历颜色数组
    colorMap.forEach((item) => {
      rgbValue.push(new THREE.Color(item))
    })

    for (let index = 0; index < rgbValue.length; index++) {
      if (index === rgbValue.length - 1) return

      // 通过gsap变化颜色
      this.changeColorTimeline.to(rgbValue[index], {
        r: rgbValue[index + 1]?.r,
        g: rgbValue[index + 1]?.g,
        b: rgbValue[index + 1]?.b,
        duration: 1,
        delay: 3,
        onUpdate: () => {
          this.getCarShell(rgbValue[index])
        }
      })
    }
  }

  // 暂停换色动画
  pauseChangeColor = () => {
    // 暂停时间轴
    this.changeColorTimeline.pause()
  }

  // 恢复换色动画
  resumeChangeColor = () => {
    // 重置时间轴
    this.changeColorTimeline.time(0)

    // 恢复时间轴
    this.changeColorTimeline.resume()
  }
  // 获取所有的车外壳
  getCarShell = (rgbValue: THREE.Color) => {
    // 替换金属内容的材质
    this.carGroup.traverse((child) => {
      // 符合mesh类型(只有mesh网格模型类型才有材质)
      if (child.type === 'Mesh') {
        // 如果名称中包含外壳
        if (child.name.includes('外壳')) {
          const meshShell = child as THREE.Mesh<
            THREE.BufferGeometry,
            THREE.MeshStandardMaterial
          >

          meshShell.material.color.copy(rgbValue)
        }
      }
    })
  }

  // 监听光线投射内容
  onAddEventListenerClick = () => {
    // 监听车门事件
    window.addEventListener('click', this.openCarDoor)
  }

  // 销毁监听
  onRemoveEventListener = () => {
    // 销毁车门监听
    window.removeEventListener('click', this.openCarDoor)
  }
}
