export const waterClick = {
  mounted(el: HTMLElement) {
    el.addEventListener('mousedown', (event) => {
      // 计算出水波的样式
      const computeRippleStyles = (el: HTMLElement, event: MouseEvent) => {
        const { top, left } = el.getBoundingClientRect()
        const { clientWidth, clientHeight } = el

        // 计算出水波的半径
        const radius = Math.sqrt(clientWidth ** 2 + clientHeight ** 2) / 2

        // 计算出水波的大小
        const size = radius * 2

        // 计算出水波的位置
        const localX = event.clientX - left
        const localY = event.clientY - top

        // 计算出水波的中心点
        const centerX = (clientWidth - radius * 2) / 2
        const centerY = (clientHeight - radius * 2) / 2

        // 计算出水波的偏移量
        const x = localX - radius
        const y = localY - radius

        return { x, y, centerX, centerY, size }
      }

      // 创建水波
      const createRipple = () => {
        // const container = this
        const { x, y, centerX, centerY, size } = computeRippleStyles(el, event)
        const ripple = document.createElement('div')
        ripple.classList.add('ripple-water-global')
        ripple.style.opacity = `0`
        ripple.style.transform = `translate(${x}px, ${y}px) scale3d(.3, .3, .3)`
        ripple.style.width = `${size}px`
        ripple.style.height = `${size}px`
        // 记录水波的创建时间
        ripple.dataset.createdAt = String(performance.now())

        const { position } = window.getComputedStyle(el)

        el.style.overflow = 'hidden'
        position === 'static' && (el.style.position = 'relative')

        el.appendChild(ripple)

        window.setTimeout(() => {
          ripple.style.transform = `translate(${centerX}px, ${centerY}px) scale3d(1, 1, 1)`
          ripple.style.opacity = `.25`
        })

        //执行完毕后移除水波
        removeRipple()
      }

      const removeRipple = () => {
        const ripples = el.querySelectorAll('.ripple-water-global')

        if (!ripples.length) {
          return
        }

        const lastRipple = ripples[ripples.length - 1]

        // 通过水波的创建时间计算出扩散动画还需要执行多久，确保每一个水波都完整的执行了扩散动画
        const delay =
          300 -
          performance.now() +
          Number((lastRipple as HTMLElement).dataset.createdAt)

        setTimeout(() => {
          ;(lastRipple as HTMLElement).style.opacity = `0`

          setTimeout(() => lastRipple.parentNode?.removeChild(lastRipple), 300)
        }, delay)
      }

      createRipple()
    })
  }
}
