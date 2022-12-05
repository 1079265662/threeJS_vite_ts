let frame = 0
let allFrameCount = 0
let lastTime = Date.now()
let lastFameTime = Date.now()

export const loop = function () {
  const now = Date.now()
  const fs = now - lastFameTime
  const fps = Math.round(1000 / fs)

  lastFameTime = now
  // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
  allFrameCount++
  frame++

  if (now > 1000 + lastTime) {
    const fps = Math.round((frame * 1000) / (now - lastTime))
    console.log(`${new Date()} 1S内 FPS：`, fps)
    frame = 0
    lastTime = now
  }
  rAF(loop)

  return fps
}

const rAF = (function () {
  return (
    window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()
