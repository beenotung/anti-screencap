export function attachCanvas(
  canvas: HTMLCanvasElement,
  options: { patternSize: number; autoStart?: boolean },
) {
  let ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('2d context not supported')
  let context = ctx
  function matchSize() {
    let rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
  }
  let offset = 0
  let patternSize = options.patternSize
  let running = false
  function paint() {
    clear()
    let H = canvas.height
    let W = canvas.width
    offset = (offset + 1) % 2
    let i = offset
    let adjust = (Math.ceil(W / patternSize) + 1) % 2
    for (let y = 0; y < H; y += patternSize) {
      i += adjust
      for (let x = 0; x < W; x += patternSize) {
        i++
        if (i % 2 == 0) {
          context.fillRect(x, y, patternSize, patternSize)
        }
      }
    }
  }
  function loop() {
    paint()
    if (running) requestAnimationFrame(loop)
  }
  function start() {
    running = false
    requestAnimationFrame(() => {
      running = true
      matchSize()
      loop()
    })
  }
  function render() {
    matchSize()
    paint()
  }
  function pause() {
    running = false
  }
  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }
  if (options.autoStart) {
    start()
  } else {
    render()
  }
  return {
    start,
    pause,
    render,
    clear,
    get running() {
      return running
    },
    set running(value: boolean) {
      if (value) start()
      else pause()
    },
  }
}
