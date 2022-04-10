import { attrs, mixter, props, shadow, state } from 'mixter'

const style = /*css*/ `
:host {
  display: inline-flex;
  outline: none;
  user-select: none;
  touch-action: none;
}

:host([autoresize]) {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

:host([autoresize]) canvas {
  width: 100% !important;
  height: 100% !important;
}`

export class WaveformElement extends mixter(
  HTMLElement,
  shadow(`<style>${style}</style><canvas></canvas>`),
  attrs(
    class {
      autoResize = false

      width = 200
      height = 100
      pixelRatio = window.devicePixelRatio

      background = '#123'
      color = '#1ff'
    }
  ),
  props(
    class {
      analyser?: AnalyserNode
      /** @private */
      analyserData?: Float32Array
      /** @private */
      screen?: {
        canvas: HTMLCanvasElement
        ctx: CanvasRenderingContext2D
      }
      /** @private */
      draw?: (data: Float32Array, start: number, end: number) => void
      /** @private */
      drawFrame?: () => void
      /** @private */
      loop?: {
        start(): void
        stop(): void
      }
      /**
       * Start displaying the spectrum.
       */
      start() {
        this.loop?.start()
      }
      /**
       * Stop displaying the spectrum.
       */
      stop() {
        this.loop?.stop()
      }
    }
  ),
  state<WaveformElement>(function({ $, effect, reduce }) {
    let animFrame: any

    $.screen = reduce(({ root }) => {
      const canvas = root.querySelector('canvas')!
      const ctx = canvas.getContext('2d', {
        alpha: false,
        desynchronized: true,
      })!
      return { canvas, ctx }
    })

    effect(({ screen: { canvas, ctx }, background, width, height, pixelRatio }) => {
      const w = width * pixelRatio | 0
      const h = height * pixelRatio | 0
      if (w !== canvas.width || h !== canvas.height) {
        canvas.width = w
        canvas.height = h
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
        ctx.fillStyle = background
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'rgba(0,0,0,0.3)'
        ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2)
      }
    })

    $.draw = reduce(({ screen: { canvas, ctx }, pixelRatio: p }) =>
      (data: Float32Array, start: number, end: number) => {
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
        ctx.fillRect(canvas.width - p, y, p, h)
      }
    )

    $.drawFrame = reduce(({ analyser, analyserData, background, screen: { canvas, ctx }, pixelRatio: p, draw }) =>
      function drawFrame() {
        animFrame = requestAnimationFrame(drawFrame)
        analyser.getFloatTimeDomainData(analyserData)

        const data = analyserData
        ctx.globalCompositeOperation = 'source-over'

        ctx.drawImage(canvas, -1, 0, canvas.width, canvas.height)
        ctx.fillStyle = background
        ctx.fillRect(canvas.width - p, 0, p, canvas.height)

        const chunks = 8
        const chunk = data.length / chunks | 0

        draw(data, 0, chunk)
        ctx.globalCompositeOperation = 'lighten'
        for (let i = 1; i < chunks; i++)
          draw(data, i * chunk, i * chunk + chunk)

        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = 'rgba(0,0,0,0.3)'
        ctx.fillRect(canvas.width - p, canvas.height / 2, p, canvas.height / 2)
      }
    )

    $.analyserData = reduce(({ analyser }) => new Float32Array(analyser.frequencyBinCount))

    $.loop = reduce(({ drawFrame }) => ({
      start() {
        animFrame = requestAnimationFrame(drawFrame)
      },
      stop() {
        cancelAnimationFrame(animFrame)
      },
    }))

    effect(({ loop }) => {
      loop.start()
      return () => loop.stop()
    })
  })
) {}
