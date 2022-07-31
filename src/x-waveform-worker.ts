export {}

let canvas: any
let pixelRatio: any
let analyserData: any
let background: any

let animFrame: any
const draw = (data: Float32Array, start: number, end: number) => {
  let top = 0, bottom = 0, s
  for (let i = start; i < end; i++) {
    s = data[i] ** 2.1
    if (s > 0) {
      if (s > bottom) bottom = s
      else if (s < top) top = s
    }
  }
  const h = (bottom - top) * canvas.height
  const y = (canvas.height - h) / 2
  const gradient = ctx.createLinearGradient(0, y, 0, y + h)
  gradient.addColorStop(0, 'rgba(20, 255, 255, 0.28)')
  gradient.addColorStop(0.35, 'rgba(20, 255, 255, 0.69)')
  gradient.addColorStop(0.48, 'rgba(20, 255, 255, 0.9)')
  gradient.addColorStop(0.5, 'rgba(20, 255, 255, 1.0)')
  gradient.addColorStop(0.52, 'rgba(20, 255, 255, 0.9)')
  gradient.addColorStop(0.65, 'rgba(20, 255, 255, 0.69)')
  gradient.addColorStop(1, 'rgba(20, 255, 255, 0.28)')
  ctx.fillStyle = gradient
  ctx.fillRect(canvas.width - pixelRatio, y, pixelRatio, h)
}

const drawFrame = () => {
  animFrame = requestAnimationFrame(drawFrame)
  if (!analyserData || !isFinite(analyserData[0]) || analyserData[0] === 0) return

  const data = analyserData
  ctx.globalCompositeOperation = 'source-over'

  ctx.drawImage(canvas, -1, 0, canvas.width, canvas.height)
  ctx.fillStyle = background
  ctx.fillRect(canvas.width - pixelRatio, 0, pixelRatio, canvas.height)

  const chunks = 8
  const chunk = data.length / chunks | 0

  draw(data, 0, chunk)
  ctx.globalCompositeOperation = 'lighten'
  for (let i = 1; i < chunks; i++)
    draw(data, i * chunk, i * chunk + chunk)

  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = 'rgba(0,0,0,0.3)'
  ctx.fillRect(canvas.width - pixelRatio, canvas.height / 2, pixelRatio, canvas.height / 2)
}

const start = () => {
  cancelAnimationFrame(animFrame)
  drawFrame()
}

const stop = () => {
  cancelAnimationFrame(animFrame)
}

let ctx: any

self.onmessage = (e: any) => {
  if (e.data.canvas) {
    //!? 'received canvas from main thread'
    canvas = e.data.canvas
    ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    })
  } else if (e.data.width) {
    pixelRatio = e.data.pixelRatio

    const width = e.data.width
    const height = e.data.height
    const w = width * pixelRatio | 0
    const h = height * pixelRatio | 0
    background = e.data.background

    if (w !== canvas.width || h !== canvas.height) {
      canvas.width = w
      canvas.height = h
      ctx.fillStyle = e.data.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2)
    }
  } else if (e.data.start)
    start()
  else if (e.data.stop)
    stop()
  else if (e.data.analyserData)
    analyserData = e.data.analyserData
}
