import { attachCanvas } from '../core'

let article = document.querySelector('article')!
let canvas = article.querySelector('canvas')!
let cover = attachCanvas(canvas, { patternSize: 5, autoStart: false })

article.style.opacity = '1'

Object.assign(window, {
  tick() {
    cover.render()
  },
  toggle() {
    cover.running = !cover.running
  },
})
