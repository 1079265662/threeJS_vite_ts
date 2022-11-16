import { CreateWorld } from './galaxy_renderer'
// 导入three.js
import * as THREE from 'three'
//导入纹理
import texture from '@/assets/particles/1.png'
export class Planet extends CreateWorld {
  constructor(canvas: any) {
    super(canvas)
  }
  points: any
  private clock = new THREE.Clock()

  // 设置配置
  params = {
    // 设置顶点数量
    paramsConst: 10000,
    // 设置大小
    size: 0.1,
    // 设置半径
    radius: 5,
    // 设置分支
    branch: 6,
    // 开始颜色
    CreatedColor: '#fea202',
    // 结束颜色
    EndColor: '#1b3984',
    // 随机范围
    randomRange: 0.3
  }

  // 创建材质加载
  textureLoader = new THREE.TextureLoader()

  // 创建材质
  particleMaterial = this.textureLoader.load(texture)

  // 创建自定义几何
  geometry = new THREE.BufferGeometry()

  // 创建初始颜色
  createdColor = new THREE.Color(this.params.CreatedColor)
  // 创建结束颜色
  endColor = new THREE.Color(this.params.EndColor)

  // 创建点材质
  material = new THREE.PointsMaterial({
    // 设置大小
    size: this.params.size,
    // 关闭深度写入
    depthWrite: false,
    // 设置叠加模式
    blending: THREE.AdditiveBlending,
    // 设置纹理
    map: this.particleMaterial,
    // 设置透明度
    transparent: true,
    // 设置透明度纹理
    alphaMap: this.particleMaterial,
    // 设置顶点着色
    vertexColors: true
  })

  // 创建多个行星
  createPlanet() {
    const { paramsConst, radius, branch, randomRange } = this.params

    // 随机生成位置
    const positions = new Float32Array(paramsConst * 3)
    // 设置顶点颜色
    const colors = new Float32Array(paramsConst * 3)

    for (let index = 0; index < 10000; index++) {
      /// 设置弧度 0-2π之间
      const branchAngle = (index % branch) * ((Math.PI * 2) / branch)
      // 设置随机半径
      const randomRadius = Math.random() * radius * Math.pow(Math.random(), 3)

      // 设置XYZ坐标
      const randomX =
        (Math.pow(Math.random() * 2 - 1, 3) * (radius - randomRadius)) / 10
      const randomY =
        (Math.pow(Math.random() * 2 - 1, 3) * (radius - randomRadius)) / 10
      const randomZ =
        (Math.pow(Math.random() * 2 - 1, 3) * (radius - randomRadius)) / 10

      // 设置三个为一组
      const current = index * 3 // 3个一组 对应x,y,z

      positions[current] =
        Math.sin(branchAngle + randomRadius * randomRange) * randomRadius +
        randomX // x坐标
      positions[current + 1] = randomY // 设置y坐标
      positions[current + 2] =
        Math.cos(branchAngle + randomRadius * randomRange) * randomRadius +
        randomZ // 设置z坐标

      // 克隆颜色
      const mixColor = this.createdColor.clone()
      // 设置颜色混入
      mixColor.lerp(this.endColor, (randomRadius / radius) * 1.5) // 设置颜色混入 当前的距离/半径 * 1.5 越远颜色越深(混入效果越强)
      // 设置顶点颜色 rgb都要设置
      colors[current] = mixColor.r
      colors[current + 1] = mixColor.g
      colors[current + 2] = mixColor.b

      // // 克隆颜色
      // const mixColor = this.createdColor.clone()

      // // 设置颜色混入
      // mixColor.lerp(this.endColor, index / 10000)
      // // 设置顶点颜色 rgb都要设置
      // colors[current] = mixColor.r
      // colors[current + 1] = mixColor.g
      // colors[current + 2] = mixColor.b
    }

    // 设置属性
    // 设置顶点坐标
    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
    // 设置顶点颜色
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // 声明点材质 传入几何体和材质
    this.points = new THREE.Points(this.geometry, this.material)
    // 添加到场景
    this.scene.add(this.points)

    this.render()
  }

  render = () => {
    this.points.rotation.y += 0.001

    // if (this.clock.getElapsedTime() > 20) {
    //   this.clock.stop()
    // }

    // 设置阻尼感必须在动画中调用.update()
    this.controls.update()
    // 使用渲染器,通过相机将场景渲染出来
    this.renderer.render(this.scene, this.camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    this.animationId = requestAnimationFrame(this.render)
  }
}
