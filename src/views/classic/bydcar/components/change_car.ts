import { GuiCreated } from './car_gui'
import { guiControlsShell } from './car_loader'
// 导入three.js
import * as THREE from 'three'
export class ChangeCar extends GuiCreated {
  // 修改汽车默认颜色
  changeCarColor = (color: string | undefined) => {
    console.log(color)

    this.changCarMaterial({
      name: guiControlsShell.type,
      type: 'color',
      value: new THREE.Color(color)
    })

    console.log(this.camera.position.length())
  }
}
