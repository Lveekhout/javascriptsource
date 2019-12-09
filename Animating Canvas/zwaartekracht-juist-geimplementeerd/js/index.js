let display
let canvas = []
let ctx = []
let iBall, iField
let thing
let vect = [0, 0]

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

function makeVector(src, length) {
    let l = Math.sqrt(Math.pow(src[0], 2) + Math.pow(src[1], 2))
    return [src[0]*(length/l), src[1]*(length/l)]
}

function Thing2D(bound) {
    this.pos = [canvas[0].width/2-100, canvas[0].height/2]
    this.speed = [0, 0]
    this.bound = bound
    this.step = 0.9

    this.apply_acc = (acc) => {
        for (i=0;i<2;i++) {
            this.pos[i] += acc[i] * Math.pow(this.step, 2) + this.speed[i] * this.step
            this.speed[i] += 2 * acc[i] * this.step
//            if (this.pos[i]>this.bound[i]) this.speed[i] = -this.speed[i]
        }
    }
}

function draw(m) {
    if (thing.pos[1]<canvas[0].height-iBall.height/2) window.requestAnimationFrame(draw)

    ctx[0].drawImage(iField, 0, 0, canvas[0].width, canvas[0].height)
    
//    display.innerHTML = "speed: " + Math.floor(Math.sqrt(Math.pow(thing.speed[0],2)+Math.pow(thing.speed[1],2)))
    display.innerHTML = "speed: " + Math.sqrt(Math.pow(thing.speed[0],2)+Math.pow(thing.speed[1],2))
    ctx[0].drawImage(iBall, thing.pos[0], thing.pos[1], iBall.width/2, iBall.height/2)

//    vect = makeVector([canvas[0].width/2-thing.pos[0], canvas[0].height/2-thing.pos[1]], 0.01)
    thing.apply_acc(vect)

    drawSpeed(canvas[1], ctx[1], vect[0], thing.speed[0])
    drawSpeed(canvas[2], ctx[2], vect[1], thing.speed[1])
}

window.onload = () => {
    display = document.getElementById('display')
    canvas = [document.getElementById('canvas001'), document.getElementById('canvas002'), document.getElementById('canvas003')]
    canvas[0].addEventListener("mouseup", e => vect = [0, 1])
    canvas[0].addEventListener("mousedown", e => vect = [0, -1])

    ctx = [canvas[0].getContext('2d'), canvas[1].getContext('2d'), canvas[2].getContext('2d')]

    iBall = new Image()
    iBall.src = "image/helicopter-256-modified.png"
    iBall.onload = () => {
        iField = new Image()
        iField.src="image/voetbalveld.jpg"
        iField.onload = () => {
            thing = new Thing2D([canvas[0].width-iBall.width/10, canvas[0].height-iBall.height/10])
            window.requestAnimationFrame(draw)
        }
    }
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) {
            alert('Left was pressed');
        }
        else if(event.keyCode == 39) {
            alert('Right was pressed');
        }
    });

    document.getElementById('canvas004').addEventListener("mousedown", e => vect = [(e.offsetX-e.target.width/2)/e.target.width/5, (e.offsetY-e.target.height/2)/e.target.height/5])
    document.getElementById('canvas004').addEventListener("mousemove", e => {
        if (e.buttons&1===1) vect = [(e.offsetX-e.target.width/2)/e.target.width/5, (e.offsetY-e.target.height/2)/e.target.height/5]
    })
}