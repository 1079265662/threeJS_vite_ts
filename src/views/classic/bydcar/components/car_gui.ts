import {
  LoaderCar,
  guiControlsLine,
  guiControlsMirror,
  guiControlsShell,
  guiControlsGlass,
  tires,
  headLights,
  tailLights,
  tailLights2,
  tailLights3,
  tailLights4,
  plastic,
  seatConfig
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

    // 创建重置方法
    const guiObj = {
      myFunction: () => {
        this.gui.reset()
      }
    }

    // 创建一个按钮
    this.gui.add(guiObj, 'myFunction').name('重置')

    // 创建一个文件夹
    const folder = this.gui.addFolder('金属内容')

    folder
      .add(guiControlsLine, 'metalness', 0, 1.0)
      .name('金属度')
      .onChange((value: number) => {
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
      .add(guiControlsLine, 'envMapIntensity', 0, 2.5)
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
      .add(guiControlsMirror, 'envMapIntensity', 0, 2.5)
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
      .addColor(guiControlsShell, 'color')
      .name('颜色')
      .onChange((value: string) => {
        this.changCarMaterial({
          name: guiControlsShell.type,
          type: 'color',
          value
        })
      })

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
      .add(guiControlsShell, 'envMapIntensity', 0, 2.5)
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
      .add(guiControlsGlass, 'envMapIntensity', 0, 2.5)
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

    // 轮胎效果
    const folder4 = this.gui.addFolder('轮胎效果')
    folder4
      .add(tires, 'metalness', 0, 1.0)
      .name('金属度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: tires.type,
          type: 'metalness',
          value
        })
      })

    folder4
      .add(tires, 'roughness', 0, 1.0)
      .name('粗糙度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: tires.type,
          type: 'roughness',
          value
        })
      })

    folder4
      .addColor(tires, 'color')
      .name('轮胎颜色')
      .onChange((value: string) => {
        this.changCarMaterial({
          name: tires.type,
          type: 'color',
          value
        })
      })

    // 前灯罩效果
    const folder5 = this.gui.addFolder('前车灯')

    folder5
      .add(headLights, 'metalness', 0, 1.0)
      .name('金属度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: headLights.type,
          type: 'metalness',
          value
        })
      })

    folder5
      .add(headLights, 'roughness', 0, 1.0)
      .name('粗糙度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: headLights.type,
          type: 'roughness',
          value
        })
      })

    folder5
      .add(headLights, 'envMapIntensity', 0, 2.5)
      .name('环境影响')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: headLights.type,
          type: 'envMapIntensity',
          value
        })
      })

    folder5
      .add(headLights, 'opacity', 0, 1.0)
      .name('透明度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: headLights.type,
          type: 'opacity',
          value
        })
      })

    folder5
      .add(headLights, 'transmission', 0, 1.0)
      .name('透光度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: headLights.type,
          type: 'transmission',
          value
        })
      })

    const folder6 = this.gui.addFolder('尾灯灯罩')

    folder6
      .addColor(tailLights, 'color')
      .name('尾灯颜色')
      .onChange((value: string) => {
        this.changCarMaterial({
          name: tailLights.type,
          type: 'color',
          value
        })
      })

    const folder7 = this.gui.addFolder('尾灯第二层')

    folder7
      .addColor(tailLights2, 'color')
      .name('尾灯颜色')
      .onChange((value: string) => {
        this.changCarMaterial({
          name: tailLights2.type,
          type: 'color',
          value
        })
      })

    const folder8 = this.gui.addFolder('尾灯第三层')

    folder8
      .addColor(tailLights3, 'color')
      .name('尾灯颜色')
      .onChange((value: string) => {
        this.changCarMaterial({
          name: tailLights3.type,
          type: 'color',
          value
        })
      })

    const folder9 = this.gui.addFolder('尾灯发光')

    folder9
      .addColor(tailLights4, 'color')
      .name('尾灯颜色')
      .onChange((value: string) => {
        this.changCarMaterial({
          name: tailLights4.type,
          type: 'color',
          value
        })
      })

    // 创建塑料
    const folder10 = this.gui.addFolder('塑料')

    folder10
      .add(plastic, 'metalness', 0, 1.0)
      .name('金属度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: plastic.type,
          type: 'metalness',
          value
        })
      })

    folder10
      .add(plastic, 'roughness', 0, 1.0)
      .name('粗糙度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: plastic.type,
          type: 'roughness',
          value
        })
      })

    folder10
      .addColor(plastic, 'color')
      .name('塑料颜色')
      .onChange((value: string) => {
        this.changCarMaterial({
          name: plastic.type,
          type: 'color',
          value
        })
      })

    folder10
      .add(plastic, 'envMapIntensity', 0, 2.5)
      .name('环境影响')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: plastic.type,
          type: 'envMapIntensity',
          value
        })
      })

    // 车座颜色
    const folder11 = this.gui.addFolder('车座')

    folder11
      .addColor(seatConfig, 'color')
      .name('车座颜色')
      .onChange((value: string) => {
        this.changCarMaterial({ name: seatConfig.type, type: 'color', value })
      })

    // 车座颜色
    folder11
      .add(seatConfig, 'roughness', 0, 1.0)
      .name('粗糙度')
      .onChange((value: number) => {
        this.changCarMaterial({
          name: seatConfig.type,
          type: 'roughness',
          value
        })
      })

    folder1.close()
    // folder4.close()
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
