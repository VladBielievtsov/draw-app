const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

function resize () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

resize()

const colorsBtns = document.querySelectorAll('.colors button')
const sizeBtns = document.querySelectorAll('.size button')

function changeColor() {
  colorsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorsBtns.forEach(btn => {
        btn.classList.remove('active')
      })
      btn.classList.add('active')
      ctx.strokeStyle = btn.getAttribute('title')
    })
  });
}

function changeLineWidth() {
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(btn => {
        btn.classList.remove('active')
      })
      btn.classList.add('active')
      ctx.lineWidth = btn.getAttribute('title')
    })
  });
}

function defaultSettings() {
  ctx.fillStyle  = '#121212'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#d3d3d3'
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  colorsBtns.forEach((btn, id) => {
    btn.classList.remove('active')
    if (id === 0) {
      btn.classList.add('active')
    }
  })
  sizeBtns.forEach((btn, id) => {
    btn.classList.remove('active')
    if (id === 0) {
      btn.classList.add('active')
    }
  })
}

defaultSettings()

changeColor()

changeLineWidth()

let painting = false

function startPosition(e) {
  painting = true
  draw(e)
}

function finishedPosition() {
  painting = false
  ctx.beginPath()
}

function draw(e) {
  if (!painting || e.buttons !== 1) return;

  ctx.lineTo(e.clientX, e.clientY)
  ctx.stroke()
  ctx.beginPath()
  ctx.lineTo(e.clientX, e.clientY)
}

canvas.addEventListener('mousedown', startPosition)
canvas.addEventListener('mouseup', finishedPosition)
canvas.addEventListener('mousemove', draw)

function clearCanvas (canvas) {
  canvas.width = canvas.width
  defaultSettings()
}

document.querySelector('.clear').addEventListener('click', () => {
  clearCanvas(canvas)
})

function save() {
  let canvasUrl = canvas.toDataURL();
  const createEl = document.createElement('a');
  createEl.href = canvasUrl;
  createEl.download = "download-this-canvas";
  createEl.click();
  createEl.remove();
}

document.querySelector('.save').addEventListener('click', () => {
  save()
})