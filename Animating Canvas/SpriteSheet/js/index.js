let canvas
let ctx
let sheet = new Image()
sheet.src = "images/Earth1024x1024_256Frames.png"
let origin = [0, 0]
let idx = 0
let scale = 20

function update() {
    //TODO: update situatie
}

function draw(millisec) {
    update()

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillText(millisec, 5, 15)
    ctx.drawImage(sheet, origin[0], origin[1], 64, 64, 50, 0, 192, 192)
    if (idx%2===0) next()
    idx++
    testDraw(ctx)

    document.getElementById("p001").innerHTML = window.requestAnimationFrame(draw)
}

const next = () => {
    origin[0] += 64
    if (origin[0]===1024) {
        origin[0] = 0
        origin[1] += 64
        if (origin[1]===1024) origin[1] = 0
    }
}

const testDraw = ctx => {
    ctx.save()
    ctx.translate(50, 50)
    ctx.scale(scale, scale)
    ctx.beginPath()
    ctx.moveTo(-1, -1)
    ctx.lineTo(1, -1)
    ctx.lineTo(-1, 1)
    ctx.lineTo(1, 1)
    ctx.closePath()
    ctx.lineWidth = 0.5/scale
    ctx.stroke()
    ctx.restore()
}

window.onload = () => {
    canvas = document.getElementById('canvas001')
    ctx = canvas.getContext('2d')
    ctx.font = "12pt Courrier new"

    draw()
}