// 导入conoon.js
import * as CANNON from 'cannon-es'
// 导入音频
import ballAudio from '@/assets/ball/ball_music.mp3'
export class CreateConnon {
  // 创建物理世界 并且设置重力属性
  world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.8, 0) }) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反
  // 创建物理引擎模型
  sphereBody!: CANNON.Body

  // 创建球体跌落的音频
  audio = new Audio(ballAudio)

  // 创建物理世界
  createPhysics = () => {
    // 设置重力方向 (x, y, z)
    // this.world.gravity.set(0, -9.8, 0) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反

    // 设置物理小球
    const sphereShape = new CANNON.Sphere(1) // 半径为1的球体
    // 设置物理小球材质
    const sphereMaterial = new CANNON.Material('sphereMaterial') // 默认物理材质

    // 设置物理小球的刚体
    this.sphereBody = new CANNON.Body({
      shape: sphereShape, // 物理形状绑定
      material: sphereMaterial, // 物理材质绑定
      mass: 1, // 设置物理小球的质量(默认为0，不受重力影响)
      position: new CANNON.Vec3(0, 15, 0) // 设置物理小球的位置
    })

    // 设置物理平面
    const planeShape = new CANNON.Plane() // 平面
    // 设置物理平面材质
    const planeMaterial = new CANNON.Material('planeMaterial') // 默认物理材质

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
    const materialLink = new CANNON.ContactMaterial(
      // 两个材质碰撞关联
      sphereMaterial, // 小球材质
      planeMaterial, // 平面(地板)材质
      {
        friction: 10, // 摩擦力
        restitution: 0.7 // 弹性
      }
    )
    // 将材质碰撞关联添加到物理世界中
    this.world.addContactMaterial(materialLink)

    // 将物理小球添加到物理世界中
    this.world.addBody(this.sphereBody)
    // 将物理平面添加到物理世界中
    this.world.addBody(planeBody)
    // 监听球体落地
    this.onSphereBody()
  }

  // 监听球体刚体落地
  onSphereBody = () => {
    // 给球体刚体绑定碰撞事件
    this.sphereBody.addEventListener('collide', (e: CANNON.Body | any) => {
      const shock = e.contact.getImpactVelocityAlongNormal() // 获取物体冲击强度
      // 获取物体冲击强度 大于5强度时播放音频
      if (shock > 5) {
        this.audio.currentTime = 0 // 重置音频播放时间 从头开始播放 防止音频播放不完整
        this.audio.volume = shock / 10 > 1 ? 1 : shock / 12 /// 设置音频音量 重力强度/10 大于1时音量为1
        this.audio.play() // 播放音频
      }
    })
  }
}
