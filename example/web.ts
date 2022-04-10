import { fetchAudioBuffer } from 'webaudio-tools'
import { WaveformElement } from '../src'

customElements.define('x-waveform', WaveformElement)
document.body.innerHTML = `
<div id="demo" style="display:inline-flex;height:80px;">
  <x-waveform autoresize></x-waveform>
</div>
`

const ctx = new AudioContext({ sampleRate: 44100, latencyHint: 'playback' })

const analyser = ctx.createAnalyser()
analyser.fftSize = 512
analyser.smoothingTimeConstant = 0
analyser.maxDecibels = 0
analyser.minDecibels = -100

// @ts-ignore
const url = new URL('alpha_molecule.ogg', import.meta.url).toString()

fetchAudioBuffer(ctx, url).then(audioBuffer => {
  const source = ctx.createBufferSource()
  source.buffer = audioBuffer
  source.loop = true
  source.connect(ctx.destination)
  source.start(0, 75)
  source.connect(analyser)
  ;(document.querySelector('x-waveform') as WaveformElement).analyser = analyser
})

window.onclick = () => ctx.state !== 'running' ? ctx.resume() : ctx.suspend()
if (ctx.state !== 'running') document.body.appendChild(new Text('click to start/stop'))
