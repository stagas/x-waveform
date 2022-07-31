import $ from 'sigl'

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
}

canvas {
  image-rendering: crisp-edges;
}`

export interface WaveformElement extends $.Element<WaveformElement> {}

@$.element()
export class WaveformElement extends HTMLElement {
  root = $.shadow(this, /*html*/ `<style>${style}</style><canvas></canvas>`)

  @$.attr() autoResize = false

  @$.attr() width = 300
  @$.attr() height = 100
  @$.attr() pixelRatio = window.devicePixelRatio

  @$.attr() background = '#123'
  @$.attr() color = '#1ff'

  // @ts-ignore
  workerUrl = new URL('./x-waveform-worker.js', import.meta.url).href
  worker = new Worker(this.workerUrl, { type: 'module' })
  workerData?: Float32Array // = new Float32Array([0])

  analyser?: AnalyserNode
  analyserData?: Float32Array
  canvas?: HTMLCanvasElement
  draw?: () => void
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

  destroy = $(this).reduce(({ worker }) => () => worker.terminate())

  mounted($: WaveformElement['$']) {
    let animFrame: any

    $.effect(({ root, worker }) => {
      if ($.canvas) return

      const canvas = $.canvas = root.querySelector('canvas') as HTMLCanvasElement

      // @ts-ignore
      const offscreen = canvas.transferControlToOffscreen()

      worker.postMessage({ canvas: offscreen }, [offscreen])
    })

    // $.screen = reduce(({ root }) => {
    //   const canvas = root.querySelector('canvas')!
    //   const ctx = canvas.getContext('2d', {
    //     alpha: false,
    //     desynchronized: true,
    //   })!
    //   return { canvas, ctx }
    // })

    $.effect(({ canvas, width, height, pixelRatio, background, worker }) => {
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'

      worker.postMessage({
        pixelRatio,
        width,
        height,
        background,
      })
    })

    // $.draw = reduce(({ screen: { canvas, ctx }, pixelRatio: p }) =>
    //   (data: Float32Array, start: number, end: number) => {
    //     let top = 0, bottom = 0, s
    //     for (let i = start; i < end; i++) {
    //       s = data[i] ** 2.1
    //       if (s > 0) {
    //         if (s > bottom) bottom = s
    //         else if (s < top) top = s
    //       }
    //     }
    //     const h = (bottom - top) * canvas.height
    //     const y = (canvas.height - h) / 2
    //     const gradient = ctx.createLinearGradient(0, y, 0, y + h)
    //     gradient.addColorStop(0, 'rgba(20, 255, 255, 0.28)')
    //     gradient.addColorStop(0.35, 'rgba(20, 255, 255, 0.69)')
    //     gradient.addColorStop(0.48, 'rgba(20, 255, 255, 0.9)')
    //     gradient.addColorStop(0.5, 'rgba(20, 255, 255, 1.0)')
    //     gradient.addColorStop(0.52, 'rgba(20, 255, 255, 0.9)')
    //     gradient.addColorStop(0.65, 'rgba(20, 255, 255, 0.69)')
    //     gradient.addColorStop(1, 'rgba(20, 255, 255, 0.28)')
    //     ctx.fillStyle = gradient
    //     ctx.fillRect(canvas.width - p, y, p, h)
    //   }
    // )

    $.draw = $.reduce(({ analyser, analyserData, worker, workerData }) => {
      cancelAnimationFrame(animFrame)

      worker.postMessage({
        analyserData: workerData,
      })

      return function draw() {
        animFrame = requestAnimationFrame(draw)

        // NOTE: it's a pity we can't write directly to the
        // shared buffer and we have to perform a copy
        analyser.getFloatTimeDomainData(analyserData)
        workerData.set(analyserData)
      }
    })

    $.analyserData = $.reduce(({ analyser }) => new Float32Array(analyser.frequencyBinCount))
    $.workerData = $.reduce(({ analyser }) => new Float32Array(new SharedArrayBuffer(analyser.frequencyBinCount * 4)))

    $.loop = $.reduce(({ draw, worker }) => ({
      start() {
        animFrame = requestAnimationFrame(draw)
        worker.postMessage({ start: true })
      },
      stop() {
        cancelAnimationFrame(animFrame)
        worker.postMessage({ stop: true })
      },
    }))

    $.effect(({ loop }) => {
      loop.start()
      return () => loop.stop()
    })
  }
}
