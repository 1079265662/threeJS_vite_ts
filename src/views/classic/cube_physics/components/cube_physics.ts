// 导入conoon.js
import * as CANNON from 'cannon-es'
// 导入音频
import ballAudio from '@/assets/ball/ball_music.mp3'
export class CreateConnon {
  // 创建物理世界 并且设置重力属性
  world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.8, 0) }) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反
  // 创建物理引擎模型
  sphereBody!: CANNON.Body

  // 创建立方体材质
  sphereMaterial!: CANNON.Material
  // 创建立方体跌落的音频
  audio = new Audio(ballAudio)

  vec3Number = [0.5, 0.5, 0.5]

  // 创建物理世界
  createPhysics = () => {
    // 设置重力方向 (x, y, z)
    // this.world.gravity.set(0, -9.8, 0) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反

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

    // 设置材质碰撞关联
    const defaultContactMaterial = new CANNON.ContactMaterial(
      // 两个材质碰撞关联
      this.sphereMaterial, // 立方体材质
      planeMaterial, // 平面(地板)材质
      {
        friction: 0.1, // 摩擦力
        restitution: 0.7 // 弹性
      }
    )
    // 将材质碰撞关联添加到物理世界中
    // this.world.addContactMaterial(defaultContactMaterial)

    // 设置物理世界碰撞的默认材料, 如果材料没有设置都用这个材料
    this.world.defaultContactMaterial = defaultContactMaterial

    // 绑定碰撞事件
    this.onSphereBody()

    // 将物理平面添加到物理世界中
    this.world.addBody(planeBody)
  }

  // 创建立方体刚体
  createSphereBody = () => {
    // 设置物理立方体
    const sphereShape = new CANNON.Box(new CANNON.Vec3(...this.vec3Number)) // 半径为1的立方体
    // 设置物理立方体材质
    this.sphereMaterial = new CANNON.Material('cube') // 默认物理材质
    // 设置物理立方体的刚体
    this.sphereBody = new CANNON.Body({
      shape: sphereShape, // 物理形状绑定
      material: this.sphereMaterial, // 物理材质绑定
      mass: 1, // 设置物理立方体的质量(默认为0，不受重力影响)
      position: new CANNON.Vec3(0, 0, 0) // 设置物理立方体的位置
    })
    // 设置物体施加力
    this.sphereBody.applyLocalForce(
      new CANNON.Vec3(0, 20, 0), // 添加力的方向
      new CANNON.Vec3(0, 0, 3) // 施加力所在的物体位置(受力点)
    )
    // 将物理立方体添加到物理世界中
    this.world.addBody(this.sphereBody)
  }

  // 监听球体刚体落地
  onSphereBody = () => {
    // 给球体刚体绑定碰撞事件
    this.sphereBody.addEventListener('collide', (e: CANNON.Body | any) => {
      const shock = e.contact.getImpactVelocityAlongNormal() // 获取物体冲击强度
      // 获取物体冲击强度 大于5强度时播放音频
      if (shock > 3) {
        this.audio.currentTime = 0 // 重置音频播放时间 从头开始播放 防止音频播放不完整
        this.audio.volume = shock / 10 > 1 ? 1 : shock / 12 /// 设置音频音量 重力强度/10 大于1时音量为1
        this.audio.play() // 播放音频
      }
    })
  }
}
