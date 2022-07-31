<h1>
x-waveform <a href="https://npmjs.org/package/x-waveform"><img src="https://img.shields.io/badge/npm-v2.0.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-179-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/x-waveform@2.0.0/dist/x-waveform.min.js"><img src="https://img.shields.io/badge/brotli-16.1K-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
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
import { WaveformElement } from 'x-waveform/dist/esm'

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

<p>  <details id="WaveformElement$1" title="Class" open><summary><span><a href="#WaveformElement$1">#</a></span>  <code><strong>WaveformElement</strong></code>    </summary>  <a href="src/x-waveform.ts#L29">src/x-waveform.ts#L29</a>  <ul>        <p>  <details id="constructor$2" title="Constructor" ><summary><span><a href="#constructor$2">#</a></span>  <code><strong>constructor</strong></code><em>()</em>    </summary>    <ul>    <p>  <details id="new WaveformElement$3" title="ConstructorSignature" ><summary><span><a href="#new WaveformElement$3">#</a></span>  <code><strong>new WaveformElement</strong></code><em>()</em>    </summary>    <ul><p><a href="#WaveformElement$1">WaveformElement</a></p>        </ul></details></p>    </ul></details><details id="analyser$14" title="Property" ><summary><span><a href="#analyser$14">#</a></span>  <code><strong>analyser</strong></code>    </summary>  <a href="src/x-waveform.ts#L46">src/x-waveform.ts#L46</a>  <ul><p><span>AnalyserNode</span></p>        </ul></details><details id="analyserData$15" title="Property" ><summary><span><a href="#analyserData$15">#</a></span>  <code><strong>analyserData</strong></code>    </summary>  <a href="src/x-waveform.ts#L47">src/x-waveform.ts#L47</a>  <ul><p><span>Float32Array</span></p>        </ul></details><details id="autoResize$5" title="Property" ><summary><span><a href="#autoResize$5">#</a></span>  <code><strong>autoResize</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>false</code></span>  </summary>  <a href="src/x-waveform.ts#L32">src/x-waveform.ts#L32</a>  <ul><p>boolean</p>        </ul></details><details id="background$9" title="Property" ><summary><span><a href="#background$9">#</a></span>  <code><strong>background</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'#123'</code></span>  </summary>  <a href="src/x-waveform.ts#L38">src/x-waveform.ts#L38</a>  <ul><p>string</p>        </ul></details><details id="canvas$16" title="Property" ><summary><span><a href="#canvas$16">#</a></span>  <code><strong>canvas</strong></code>    </summary>  <a href="src/x-waveform.ts#L48">src/x-waveform.ts#L48</a>  <ul><p><span>HTMLCanvasElement</span></p>        </ul></details><details id="color$10" title="Property" ><summary><span><a href="#color$10">#</a></span>  <code><strong>color</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'#1ff'</code></span>  </summary>  <a href="src/x-waveform.ts#L39">src/x-waveform.ts#L39</a>  <ul><p>string</p>        </ul></details><details id="destroy$30" title="Property" ><summary><span><a href="#destroy$30">#</a></span>  <code><strong>destroy</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-waveform.ts#L67">src/x-waveform.ts#L67</a>  <ul><p><details id="__type$31" title="Function" ><summary><span><a href="#__type$31">#</a></span>  <em>()</em>    </summary>    <ul>    <p>      <p><strong></strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p>        </ul></details><details id="draw$17" title="Property" ><summary><span><a href="#draw$17">#</a></span>  <code><strong>draw</strong></code>    </summary>  <a href="src/x-waveform.ts#L49">src/x-waveform.ts#L49</a>  <ul><p><details id="__type$18" title="Function" ><summary><span><a href="#__type$18">#</a></span>  <em>()</em>    </summary>    <ul>    <p>      <p><strong></strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p>        </ul></details><details id="height$7" title="Property" ><summary><span><a href="#height$7">#</a></span>  <code><strong>height</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>100</code></span>  </summary>  <a href="src/x-waveform.ts#L35">src/x-waveform.ts#L35</a>  <ul><p>number</p>        </ul></details><details id="loop$20" title="Property" ><summary><span><a href="#loop$20">#</a></span>  <code><strong>loop</strong></code>    </summary>  <a href="src/x-waveform.ts#L50">src/x-waveform.ts#L50</a>  <ul><p>{<p>  <details id="start$22" title="Method" ><summary><span><a href="#start$22">#</a></span>  <code><strong>start</strong></code><em>()</em>    </summary>    <ul>    <p>      <p><strong>start</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="stop$24" title="Method" ><summary><span><a href="#stop$24">#</a></span>  <code><strong>stop</strong></code><em>()</em>    </summary>    <ul>    <p>      <p><strong>stop</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p>}</p>        </ul></details><details id="onmounted$45" title="Property" ><summary><span><a href="#onmounted$45">#</a></span>  <code><strong>onmounted</strong></code>    </summary>    <ul><p><span>EventHandler</span>&lt;<a href="#WaveformElement$1">WaveformElement</a>, <span>CustomEvent</span>&lt;any&gt;&gt;</p>        </ul></details><details id="onunmounted$46" title="Property" ><summary><span><a href="#onunmounted$46">#</a></span>  <code><strong>onunmounted</strong></code>    </summary>    <ul><p><span>EventHandler</span>&lt;<a href="#WaveformElement$1">WaveformElement</a>, <span>CustomEvent</span>&lt;any&gt;&gt;</p>        </ul></details><details id="pixelRatio$8" title="Property" ><summary><span><a href="#pixelRatio$8">#</a></span>  <code><strong>pixelRatio</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>window.devicePixelRatio</code></span>  </summary>  <a href="src/x-waveform.ts#L36">src/x-waveform.ts#L36</a>  <ul><p>number</p>        </ul></details><details id="root$4" title="Property" ><summary><span><a href="#root$4">#</a></span>  <code><strong>root</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-waveform.ts#L30">src/x-waveform.ts#L30</a>  <ul><p><span>ShadowRoot</span></p>        </ul></details><details id="width$6" title="Property" ><summary><span><a href="#width$6">#</a></span>  <code><strong>width</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>300</code></span>  </summary>  <a href="src/x-waveform.ts#L34">src/x-waveform.ts#L34</a>  <ul><p>number</p>        </ul></details><details id="worker$12" title="Property" ><summary><span><a href="#worker$12">#</a></span>  <code><strong>worker</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-waveform.ts#L43">src/x-waveform.ts#L43</a>  <ul><p><span>Worker</span></p>        </ul></details><details id="workerData$13" title="Property" ><summary><span><a href="#workerData$13">#</a></span>  <code><strong>workerData</strong></code>    </summary>  <a href="src/x-waveform.ts#L44">src/x-waveform.ts#L44</a>  <ul><p><span>Float32Array</span></p>        </ul></details><details id="workerUrl$11" title="Property" ><summary><span><a href="#workerUrl$11">#</a></span>  <code><strong>workerUrl</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-waveform.ts#L42">src/x-waveform.ts#L42</a>  <ul><p>string</p>        </ul></details><details id="mounted$33" title="Method" ><summary><span><a href="#mounted$33">#</a></span>  <code><strong>mounted</strong></code><em>($)</em>    </summary>  <a href="src/x-waveform.ts#L69">src/x-waveform.ts#L69</a>  <ul>    <p>    <details id="$$35" title="Parameter" ><summary><span><a href="#$$35">#</a></span>  <code><strong>$</strong></code>    </summary>    <ul><p><span>Context</span>&lt;<a href="#WaveformElement$1">WaveformElement</a> &amp; <span>JsxContext</span>&lt;<a href="#WaveformElement$1">WaveformElement</a>&gt; &amp; <span>Omit</span>&lt;{<p>    <details id="ctor$39" title="Parameter" ><summary><span><a href="#ctor$39">#</a></span>  <code><strong>ctor</strong></code>    </summary>    <ul><p><span>Class</span>&lt;<a href="#T$38">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctor)</em>  &nbsp;=&gt;  <ul><span>CleanClass</span>&lt;<a href="#T$38">T</a>&gt;</ul></p>  <details id="ctx$43" title="Parameter" ><summary><span><a href="#ctx$43">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><a href="#T$42">T</a> | <span>Class</span>&lt;<a href="#T$42">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctx)</em>  &nbsp;=&gt;  <ul><span>Wrapper</span>&lt;<a href="#T$42">T</a>&gt;</ul></p></p>} &amp; <span>__module</span> &amp; {}, <code>"transition"</code>&gt;&gt;</p>        </ul></details>  <p><strong>mounted</strong><em>($)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="start$26" title="Method" ><summary><span><a href="#start$26">#</a></span>  <code><strong>start</strong></code><em>()</em>     &ndash; Start displaying the spectrum.</summary>  <a href="src/x-waveform.ts#L57">src/x-waveform.ts#L57</a>  <ul>    <p>      <p><strong>start</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="stop$28" title="Method" ><summary><span><a href="#stop$28">#</a></span>  <code><strong>stop</strong></code><em>()</em>     &ndash; Stop displaying the spectrum.</summary>  <a href="src/x-waveform.ts#L63">src/x-waveform.ts#L63</a>  <ul>    <p>      <p><strong>stop</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p></ul></details></p>

## Credits

- [sigl](https://npmjs.org/package/sigl) by [stagas](https://github.com/stagas) &ndash; Web framework

## Contributing

[Fork](https://github.com/stagas/x-waveform/fork) or [edit](https://github.dev/stagas/x-waveform) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
