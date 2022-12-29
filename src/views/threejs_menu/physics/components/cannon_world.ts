// 导入conoon.js
import * as CANNON from 'cannon-es'

export class CreateConnon {
  // 1. 创建物理引擎模型和物理世界
  // 创建物理引擎模型
  sphereBody!: CANNON.Body
  // 创建物理世界
  world = new CANNON.World()

  // 创建物理世界
  createPhysics = () => {
    // 设置重力方向 (x, y, z)
    this.world.gravity.set(0, -9.8, 0) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反

    // 设置物理小球
    const sphereShape = new CANNON.Sphere(1) // 半径为1的球体
    // 设置物理小球材质
    const sphereMaterial = new CANNON.Material() // 默认物理材质
    // 设置物理小球的刚体
    this.sphereBody = new CANNON.Body({
      mass: 10, // 质量
      position: new CANNON.Vec3(0, 10, 0), // 位置
      shape: sphereShape, // 形状
      material: sphereMaterial // 材质
    })

    // 设置物理平面
    const planeShape = new CANNON.Plane() // 平面
    // 设置物理平面材质
    const planeMaterial = new CANNON.Material() // 默认物理材质
    // 设置物理平面的刚体
    const planeBody = new CANNON.Body({
      mass: 0, // 质量
      position: new CANNON.Vec3(0, -5, 0), // 位置
      quaternion: new CANNON.Quaternion().setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0), // 设置旋转轴 (x, y, z) x轴旋转
        -Math.PI / 2 // 旋转-90度
      ), // 旋转90度
      shape: planeShape, // 形状
      material: planeMaterial // 材质
    })

    // 将物理小球添加到物理世界中
    this.world.addBody(this.sphereBody)
    // 将物理平面添加到物理世界中
    this.world.addBody(planeBody)
  }
}
