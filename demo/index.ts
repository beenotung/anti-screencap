import { attachCanvas } from '../core'

let article = document.querySelector('article')!
let canvas = article.querySelector('canvas')!
let cover = attachCanvas(canvas, {
  patternSize: 5,
  autoStart: false,
  density: 1 / 2,
})

article.style.opacity = '1'

Object.assign(window, {
  tick() {
    cover.render()
  },
  toggle() {
    cover.running = !cover.running
  },
  switchImage(input: HTMLInputElement) {
    let file = input.files?.[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = () => {
        let img = article.querySelector('img')!
        img.src = reader.result as string
        img.removeAttribute('width')
        img.removeAttribute('height')
      }
      reader.readAsDataURL(file)
    }
  },
})
