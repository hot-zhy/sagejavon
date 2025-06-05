/* eslint-disable prefer-const */
export default function fireworkCanvas (id) {
  const container = document.querySelector('.fires-canvas')
  const [width, height] = [container.clientWidth, container.clientHeight]
  let playTimer = null
  let hiddenVisible = false
  let requestFrameId = null
  const ele = document.querySelector(`#${id}`)
  ele.width = width
  ele.height = height
  const ctx = ele.getContext('2d')
  const fireworkList = []
  const particleList = []
  const colors = [['86, 124, 237'], ['86, 189, 237'], ['86, 237, 209'], ['80, 202, 102'], ['222, 113, 47'], ['228, 21, 20'], ['166, 20, 228'], ['228, 20, 142'], ['7, 242, 198']]

  /**
   * 烟花粒子类
   * @param {*} x
   * @param {*} y
   * @param {*} radians
   * @param {*} color
   */
  function Firework (x, y, radians, color) {
    this.color = color
    this.speedRadius = (Math.random() * 8) + 0.4
    this.radius = this.speedRadius
    this.radians = radians
    this.x = x + Math.cos(this.radians) * this.radius
    this.y = y + Math.sin(this.radians) * this.radius
    this.alpha = (Math.floor(Math.random() * 60) + 40) / 100
    this.speedAlpha = Math.random() * 0.05 + 0.016
    const speedY = Math.random() * 2
    this.speedY = speedY < 0.5 ? 0 : speedY
    this.explosion = Boolean(Math.random() > 0.999)
  }

  Firework.prototype.draw = function () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 2, Math.PI * 2, false)
    ctx.closePath()
    ctx.fillStyle = `rgba(${this.color.join(',')}, ${this.alpha})`
    ctx.fill()
  }

  Firework.prototype.move = function () {
    const moveX = Math.cos(this.radians) * this.radius
    const moveY = Math.sin(this.radians) * this.radius + this.speedY
    this.x += moveX
    this.y += moveY
    this.radius *= 1 - this.speedRadius / 100
    this.alpha -= this.speedAlpha
    this.draw()
  }

  function Particle (x, y, color) {
    this.x = x
    this.y = y
    this.size = 4
    this.alpha = 1
    this.color = color
    this.vy = Math.random() * 100 + 300
    if (this.x < width / 2) {
      this.vx = Math.random() + 0.1
    } else {
      this.vx = Math.random() * -1 - 0.1
    }
  }

  Particle.prototype.draw = function () {
    ctx.beginPath()
    ctx.fillStyle = `rgba(${this.color.join(',')}, ${this.alpha})`
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  Particle.prototype.move = function () {
    this.x += this.vx
    this.y -= this.vy * 0.022
    this.alpha -= 0.01
    this.vy *= 0.995
    this.draw()
  }

  function createParticle (x, y) {
    const color = colors[Math.floor(Math.random() * 9)]
    const p = new Particle(x, y, color)
    particleList.push(p)
  }

  function renderParticles () {
    for (let i = 0; i < particleList.length; i++) {
      particleList[i].move()
      if (particleList[i].alpha <= 0) {
        const { x, y, color } = particleList[i]
        createFirework(x, y, color)
        particleList.splice(i, 1)
        i--
      }
    }
  }

  function createFirework (x, y, color, num) {
    const count = num || Math.floor(Math.random() * 50 + 100)
    for (let i = 0; i < count; i++) {
      const angle = 360 / count * i
      const radians = angle * Math.PI / 180
      const firework = new Firework(x, y, radians, color)
      fireworkList.push(firework)
    }
  }

  function renderFireworks () {
    for (let i = 0; i < fireworkList.length; i++) {
      fireworkList[i].move()
      if (fireworkList[i].alpha <= 0) {
        if (fireworkList[i].explosion) {
          const { x, y } = fireworkList[i]
          const color = colors[Math.floor(Math.random() * 9)]
          createFirework(x, y, color, 20)
        }
        fireworkList.splice(i, 1)
        i--
      }
    }
  }

  function tick () {
    if (hiddenVisible) return
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, width, height)
    ctx.globalCompositeOperation = 'lighter'
    renderFireworks()
    renderParticles()
    requestFrameId = requestAnimationFrame(tick)
  }

  ele.addEventListener('click', function (e) {
    const { offsetX: x, offsetY: y } = e
    const color = colors[Math.floor(Math.random() * 9)]
    createFirework(x, y, color)
  })

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hiddenVisible = true
      cancelAnimationFrame(requestFrameId)
      clearInterval(playTimer)
      ctx.clearRect(0, 0, width, height)
    } else {
      hiddenVisible = false
      tick()
      play()
    }
  })

  function play () {
    playTimer = setInterval(() => {
      const x = Math.random() * (width - 40) + 20
      const y = Math.random() * 10 + (height - 10)
      createParticle(x, y)
    }, 200)
  }

  tick()
  play()
}
