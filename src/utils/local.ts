// 缓存储存
const session = window.sessionStorage
// 储存镜头距离(z轴)
const distanceName = 'distance'
// 储存镜头距离
function setDistance(distance: string) {
  return session.setItem(distanceName, distance)
}

// 获取镜头距离
const getDistance = () => session.getItem(distanceName)

export { distanceName, setDistance, getDistance }
