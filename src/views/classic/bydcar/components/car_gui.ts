import {
  LoaderCar,
  guiControlsLine,
  guiControlsMirror,
  guiControlsShell,
  guiControlsGlass
} from './car_loader'
// ES6:
import GUI from 'lil-gui'

export class GuiCreated extends LoaderCar {
  // 创建GUI调试面板的实例
  gui = new GUI()

  // 创建GUI调试面板
  createGui = () => {
    this.gui.hide()

    this.gui.title('汽车调试面板')

    // 创建一个文件夹
    const folder = this.gui.addFolder('金属内容')

    folder
      .add(guiControlsLine, 'metalness', 0, 1.0)
      .name('金属度')
      .onChange((value: number) => {
        console.log(value)

        this.changCarMaterial({
          name: guiControlsLine.type,
          type: 'metalness',
          value
        })
      })

    folder
      .add(guiControlsLine, 'roughness', 0, 1.0)
      .name('粗糙度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsLine.type,
          type: 'roughness',
          value
        })
      })

    folder
      .add(guiControlsLine, 'envMapIntensity', 0, 2.0)
      .name('环境影响')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsLine.type,
          type: 'envMapIntensity',
          value
        })
      })

    // 创建一个文件夹
    const folder1 = this.gui.addFolder('后视镜里的世界')

    folder1
      .add(guiControlsMirror, 'metalness', 0, 1.0)
      .name('金属度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsMirror.type,
          type: 'metalness',
          value
        })
      })

    folder1
      .add(guiControlsMirror, 'roughness', 0, 1.0)
      .name('粗糙度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsMirror.type,
          type: 'roughness',
          value
        })
      })

    folder1
      .add(guiControlsMirror, 'envMapIntensity', 0, 2.0)
      .name('环境影响')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsMirror.type,
          type: 'envMapIntensity',
          value
        })
      })

    // 车漆效果
    const folder2 = this.gui.addFolder('车漆效果')

    folder2
      .add(guiControlsShell, 'clearcoat', 0, 1.0)
      .name('清漆层厚度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsShell.type,
          type: 'clearcoat',
          value
        })
      })

    folder2
      .add(guiControlsShell, 'clearcoatRoughness', 0, 1.0)
      .name('清漆层粗糙度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsShell.type,
          type: 'clearcoatRoughness',
          value
        })
      })

    folder2
      .add(guiControlsShell, 'metalness', 0, 1.0)
      .name('金属度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsShell.type,
          type: 'metalness',
          value
        })
      })

    folder2
      .add(guiControlsShell, 'roughness', 0, 1.0)
      .name('粗糙度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsShell.type,
          type: 'roughness',
          value
        })
      })

    folder2
      .add(guiControlsShell, 'envMapIntensity', 0, 2.0)
      .name('环境影响')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsShell.type,
          type: 'envMapIntensity',
          value
        })
      })

    // 玻璃效果
    const folder3 = this.gui.addFolder('玻璃效果')

    folder3
      .add(guiControlsGlass, 'transmission', 0, 1.0)
      .name('透光度(对车窗不明显)')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsGlass.type,
          type: 'transmission',
          value
        })
      })

    folder3
      .add(guiControlsGlass, 'opacity', 0.3, 0.8)
      .name('透明度(对车窗明显)')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsGlass.type,
          type: 'opacity',
          value
        })
      })

    folder3
      .add(guiControlsGlass, 'envMapIntensity', 0, 2.0)
      .name('环境影响')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsGlass.type,
          type: 'envMapIntensity',
          value
        })
      })

    folder3
      .add(guiControlsGlass, 'metalness', 0, 1.0)
      .name('金属度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsGlass.type,
          type: 'metalness',
          value
        })
      })

    folder3
      .add(guiControlsGlass, 'roughness', 0, 1.0)
      .name('粗糙度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: guiControlsGlass.type,
          type: 'roughness',
          value
        })
      })

    // this.gui.w = 320
    // 打开文件夹
    folder.open()
    // folder1.open()
    folder2.open()
    folder3.open()
  }

  /**
   * 修改汽车材质
   * @param obj
   * @param obj.name 名称
   * @param obj.type 类型
   * @param obj.value 值
   */
  changCarMaterial = (obj: { name: string; type: string; value: any }) => {
    const { name, type, value } = obj

    this.carGroup.traverse((child) => {
      if (child.type === 'Mesh') {
        // 如果名称中包含后视镜
        if (child.name.includes(name)) {
          // 修改材质
          const meshOject = child as THREE.Mesh<
            THREE.BufferGeometry,
            THREE.MeshStandardMaterial
          >
          ;(meshOject as any).material[type] = value
        }
      }
    })
  }
}
