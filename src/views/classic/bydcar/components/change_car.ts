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
        if (this.sound.isPlaying) {
          this.sound.stop()
        } else {
          this.sound.play()
        }

        // 执行车门的点击事件
        doorClick.get(spriteMeshRay[0].object.parent.name)?.(this.carMesh)
      }
    }
  }

  // 打开全部车门
  openAllCarDoor = () => {
    this.spriteMeshList.forEach((item) => {
      // 全部展开
      doorClick.get(item.parent!.name)?.(this.carMesh)
    })
    if (this.sound.isPlaying) {
      this.sound.stop()
    } else {
      this.sound.play()
    }
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
