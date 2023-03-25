import { GuiCreated } from './car_gui'
import { guiControlsShell, doorClick } from './car_map'
// 导入three.js
import * as THREE from 'three'

export class ChangeCar extends GuiCreated {
  // 创建一个光线投射器
  raycaster = new THREE.Raycaster()

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

        // 判断父级是否旋转过
        if (
          carMesh.parent?.rotation.y === 0 &&
          carMesh.parent?.rotation.z === 0
        ) {
          if (this.soundOpen.isPlaying) {
            this.soundOpen.stop()
          } else {
            this.soundOpen.play()
          }
        } else {
          if (this.soundClose.isPlaying) {
            this.soundClose.stop()
          } else {
            this.soundClose.play()
          }
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

      // 判断父级是否旋转过

      // 判断父级是否旋转过
      if (
        carMesh.parent?.rotation.y === 0 &&
        carMesh.parent?.rotation.z === 0
      ) {
        if (this.soundOpen.isPlaying) {
          this.soundOpen.stop()
        } else {
          this.soundOpen.play()
        }
      } else {
        if (this.soundClose.isPlaying) {
          this.soundClose.stop()
        } else {
          this.soundClose.play()
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
