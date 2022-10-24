// 缓存储存
const session = window.sessionStorage
// 储存镜头距离(z轴)
export const distanceName = 'distance'
// 储存相机全部信息
export const cameraData = 'cameraData'

// 储存镜头距离
export function setDistance(distance: string) {
  return session.setItem(distanceName, distance)
}

// 储存镜头全部数据
export function setCameraData(data: object) {
  return session.setItem(cameraData, JSON.stringify(data))
}
// 获取镜头全部数据
export function getCameraData() {
  return JSON.parse(session.getItem(cameraData) || '{}') || '{}'
}

// 获取镜头距离
export const getDistance = () => session.getItem(distanceName)
