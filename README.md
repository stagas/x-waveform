<h1>
x-waveform <a href="https://npmjs.org/package/x-waveform"><img src="https://img.shields.io/badge/npm-v1.0.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-136-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/x-waveform@1.0.0/dist/x-waveform.min.js"><img src="https://img.shields.io/badge/brotli-2.5K-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

Audio waveform visualizer Web Component

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i x-waveform </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add x-waveform </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add x-waveform</code>
</td></tr></table>
</h4>

## Examples

<details id="example$web" title="web" open><summary><span><a href="#example$web">#</a></span>  <code><strong>web</strong></code></summary>  <ul><p></p>  <a href="https://stagas.github.io/x-waveform/example/web.html"><img width="182.85714285714283" src="example/web.png"></img>  <p><strong>Try it live</strong></p></a>    <details id="source$web" title="web source code" ><summary><span><a href="#source$web">#</a></span>  <code><strong>view source</strong></code></summary>  <a href="example/web.ts">example/web.ts</a>  <p>

```ts
import { fetchAudioBuffer } from 'webaudio-tools'
import { WaveformElement } from 'x-waveform'

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
if (ctx.state !== 'running')
  document.body.appendChild(new Text('click to start/stop'))
```

</p>
</details></ul></details>

## API

<p>  <details id="WaveformElement$1" title="Class" open><summary><span><a href="#WaveformElement$1">#</a></span>  <code><strong>WaveformElement</strong></code>    </summary>  <a href="src/x-waveform.ts#L22">src/x-waveform.ts#L22</a>  <ul>        <p>  <details id="constructor$3" title="Constructor" ><summary><span><a href="#constructor$3">#</a></span>  <code><strong>constructor</strong></code><em>()</em>    </summary>    <ul>    <p>  <details id="new WaveformElement$4" title="ConstructorSignature" ><summary><span><a href="#new WaveformElement$4">#</a></span>  <code><strong>new WaveformElement</strong></code><em>()</em>    </summary>    <ul><p><a href="#WaveformElement$1">WaveformElement</a></p>        </ul></details></p>    </ul></details><details id="analyser$11" title="Property" ><summary><span><a href="#analyser$11">#</a></span>  <code><strong>analyser</strong></code>    </summary>  <a href="src/x-waveform.ts#L39">src/x-waveform.ts#L39</a>  <ul><p><span>AnalyserNode</span></p>        </ul></details><details id="autoResize$5" title="Property" ><summary><span><a href="#autoResize$5">#</a></span>  <code><strong>autoResize</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>false</code></span>  </summary>  <a href="src/x-waveform.ts#L27">src/x-waveform.ts#L27</a>  <ul><p>boolean</p>        </ul></details><details id="background$9" title="Property" ><summary><span><a href="#background$9">#</a></span>  <code><strong>background</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'#123'</code></span>  </summary>  <a href="src/x-waveform.ts#L33">src/x-waveform.ts#L33</a>  <ul><p>string</p>        </ul></details><details id="color$10" title="Property" ><summary><span><a href="#color$10">#</a></span>  <code><strong>color</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'#1ff'</code></span>  </summary>  <a href="src/x-waveform.ts#L34">src/x-waveform.ts#L34</a>  <ul><p>string</p>        </ul></details><details id="height$7" title="Property" ><summary><span><a href="#height$7">#</a></span>  <code><strong>height</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>100</code></span>  </summary>  <a href="src/x-waveform.ts#L30">src/x-waveform.ts#L30</a>  <ul><p>number</p>        </ul></details><details id="pixelRatio$8" title="Property" ><summary><span><a href="#pixelRatio$8">#</a></span>  <code><strong>pixelRatio</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>window.devicePixelRatio</code></span>  </summary>  <a href="src/x-waveform.ts#L31">src/x-waveform.ts#L31</a>  <ul><p>number</p>        </ul></details><details id="width$6" title="Property" ><summary><span><a href="#width$6">#</a></span>  <code><strong>width</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>200</code></span>  </summary>  <a href="src/x-waveform.ts#L29">src/x-waveform.ts#L29</a>  <ul><p>number</p>        </ul></details><details id="start$32" title="Method" ><summary><span><a href="#start$32">#</a></span>  <code><strong>start</strong></code><em>()</em>     &ndash; Start displaying the spectrum.</summary>  <a href="src/x-waveform.ts#L59">src/x-waveform.ts#L59</a>  <ul>    <p>      <p><strong>start</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="stop$34" title="Method" ><summary><span><a href="#stop$34">#</a></span>  <code><strong>stop</strong></code><em>()</em>     &ndash; Stop displaying the spectrum.</summary>  <a href="src/x-waveform.ts#L65">src/x-waveform.ts#L65</a>  <ul>    <p>      <p><strong>stop</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p></ul></details></p>

## Credits

- [mixter](https://npmjs.org/package/mixter) by [stagas](https://github.com/stagas) &ndash; A Web Components framework.

## Contributing

[Fork](https://github.com/stagas/x-waveform/fork) or [edit](https://github.dev/stagas/x-waveform) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
