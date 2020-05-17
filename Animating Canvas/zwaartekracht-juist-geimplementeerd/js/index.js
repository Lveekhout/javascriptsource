let display
let canvas = []
let ctx = []
let iHelicopter = new Helicopter([158, 20])
let iField = new Image()
let iTest = new Image()
let iSvg = [new Tile(), new Tile()]
let vect = [0, 0]
let camera = 0
let poshis = []
let rolling = false

function drawSpeed(canvas, ctx, acc, speed) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    ctx.fillText(new Date(), 10, 10)
    let _x=-canvas.width/2
    ctx.beginPath()
    ctx.moveTo(0, canvas.height/2); ctx.lineTo(canvas.width, canvas.height/2)
    ctx.moveTo(canvas.height/2, 0); ctx.lineTo(canvas.width/2, canvas.height)
    ctx.lineWidth = 1
    ctx.strokeStyle = "#ffffff"
    ctx.stroke()
    ctx.beginPath()
    for (x=0;x<canvas.width;x++) {
        ctx.lineTo(x, canvas.height/2-(acc * Math.pow(_x, 2) + speed*_x))
        _x += 1
    }
    ctx.lineWidth = 3
    ctx.strokeStyle = "red"
    ctx.stroke()
    _x=-canvas.width/2
    ctx.beginPath()
    for (x=0;x<canvas.width;x++) {
        ctx.lineTo(x, canvas.height/2-(speed*_x))
        _x += 1
    }
    ctx.lineWidth = 3
    ctx.strokeStyle = "yellow"
    ctx.stroke()
}

function draw(m) {
    if (iHelicopter.pos[1]<canvas[0].height-iHelicopter.height/2+iHelicopter.offset[1]/2) window.requestAnimationFrame(draw)

    ctx[0].drawImage(iField, 0, 0, canvas[0].width, canvas[0].height)
    iSvg[0].drawTile(canvas[0], Math.floor(-camera/5), 700-512)
    iSvg[1].drawTile(canvas[0], Math.floor(-camera), 700-256)

    display.innerHTML = "speed: " + Math.sqrt(Math.pow(iHelicopter.speed[0],2)+Math.pow(iHelicopter.speed[1],2))
    ctx[0].save()
    ctx[0].translate(iHelicopter.pos[0]-camera, iHelicopter.pos[1])
    ctx[0].rotate(iHelicopter.rotation)
    if (navigator.getGamepads()[0]) {
        let x = navigator.getGamepads()[0].axes[3]
        let s = 10/Math.pow(x+2, Math.log(10)/Math.log(2))
        ctx[0].scale(1/2/s, 1/2/s)
    } else ctx[0].scale(1/2, 1/2)
    ctx[0].save()
    ctx[0].filter = 'blur(3px)'
    ctx[0].drawImage(iHelicopter, -iHelicopter.offset[0], -iHelicopter.offset[1], iHelicopter.width, iHelicopter.height)
    ctx[0].restore()
    ctx[0].drawImage(iHelicopter, -iHelicopter.offset[0], -iHelicopter.offset[1], iHelicopter.width, iHelicopter.height)

    // ctx[0].beginPath();
    // ctx[0].arc(0, 0, 3, 0, 2 * Math.PI, false);
    // ctx[0].fillStyle = 'red';
    // ctx[0].fill();
    ctx[0].restore()

    if (navigator.getGamepads()[0]) {
        if (!rolling) setTimeout(() => rolling = true, 1000)

        // vect = [navigator.getGamepads()[0].axes[2]/15, navigator.getGamepads()[0].axes[3]/15]
        iHelicopter.rotation = navigator.getGamepads()[0].axes[2]/2
        vect[0] = navigator.getGamepads()[0].axes[2]/60
        if (navigator.getGamepads()[0].buttons[6].touched) vect[1] = navigator.getGamepads()[0].buttons[6].value/-60; else vect[1] = 0

        iHelicopter.apply_acc(vect)
        poshis.push(iHelicopter.pos[0])
        if (rolling) camera = poshis.shift()-canvas[0].width/2
        iHelicopter.apply_acc([0, 0.005]) // Gravity
    }

    drawSpeed(canvas[1], ctx[1], vect[0], iHelicopter.speed[0])
    drawSpeed(canvas[2], ctx[2], vect[1], iHelicopter.speed[1])
}

window.onload = () => {
    console.log("onload")
    canvas = [document.getElementById("canvas001"), document.getElementById("canvas002"), document.getElementById("canvas003")]
    ctx = [canvas[0].getContext("2d"), canvas[1].getContext("2d"), canvas[2].getContext("2d")]
    display = document.getElementById("display")

    iHelicopter.pos = [canvas[0].width/2, canvas[0].height/2]

    document.getElementById("canvas004").addEventListener("mousedown", e => vect = [(e.offsetX-e.target.width/2)/e.target.width/50, (e.offsetY-e.target.height/2)/e.target.height/50])
    document.getElementById("canvas004").addEventListener("mousemove", e => {
        if (e.buttons&1===1) vect = [(e.offsetX-e.target.width/2)/e.target.width/50, (e.offsetY-e.target.height/2)/e.target.height/50]
    })

    window.requestAnimationFrame(draw)
}

iHelicopter.src = "image/helicopter-256-modified.png"
iField.src = "image/sydney.bmp"
iSvg[0].src = "image/mountain.png"
iSvg[1].src = "image/nature.png"