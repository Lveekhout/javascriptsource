let canvas
let ctx
let background = new Image()
let layer1 = new Layer([0, 215], [191, 194])
let layer2 = new Layer([0, 291], [  0, 400])
let scale = 1
let speed = 0.0005

function draw(millisec) {
    scale += speed
    layer1.scale = scale
    layer2.scale = 1.1*scale

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0)
    layer1.draw(ctx)
    layer2.draw(ctx)

    if (scale<1.5) window.requestAnimationFrame(draw)
}

window.onload = () => {
    canvas = document.getElementById('canvas001')
    ctx = canvas.getContext('2d')
    ctx.font = "12pt Courrier new"

    draw()

    canvas.addEventListener("mousedown", e => layer2.offset = [e.offsetX, e.offsetY])
}

background.src = 'images/background.png'
layer1.src = 'images/layer1.png'
layer2.src = 'images/layer2.png'