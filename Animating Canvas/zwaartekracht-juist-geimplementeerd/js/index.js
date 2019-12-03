let display
let canvas = []
let ctx = []
let iBall
let thing
let vect = [0, 1]

function makeVector(src, length) {
    let l = Math.sqrt(Math.pow(src[0], 2) + Math.pow(src[1], 2))
    return [src[0]*(length/l), src[1]*(length/l)]
}

function Thing2D(bound) {
    this.pos = [canvas[0].width/2-100, canvas[0].height/2]
    this.speed = [0, 2]
    this.bound = bound
    this.step = 0.4

    this.apply_acc = (acc) => {
        for (i=0;i<2;i++) {
            this.pos[i] += acc[i] * Math.pow(this.step, 2) + this.speed[i] * this.step
            this.speed[i] += 2 * acc[i] * this.step
//            if (this.pos[i]>this.bound[i]) this.speed[i] = -this.speed[i]
        }
    }
}

function draw(m) {
    if (thing.pos[1]<canvas[0].height-iBall.height/10) window.requestAnimationFrame(draw)

    ctx[0].clearRect(0, 0, canvas[0].clientWidth, canvas[0].clientHeight)

    display.innerHTML = "speed: " + Math.floor(Math.sqrt(Math.pow(thing.speed[0],2)+Math.pow(thing.speed[1],2)))
    ctx[0].drawImage(iBall, thing.pos[0], thing.pos[1], iBall.width/10, iBall.height/10)

    vect = makeVector([canvas[0].width/2-thing.pos[0], canvas[0].height/2-thing.pos[1]], 0.3)
    thing.apply_acc(vect)

    ctx[1].clearRect(0, 0, canvas[1].clientWidth, canvas[1].clientHeight)
    ctx[1].fillText(new Date(), 10, 10)
    let _x=-canvas[1].width/2
    ctx[1].beginPath()
    ctx[1].moveTo(0, canvas[1].height/2); ctx[1].lineTo(canvas[1].width, canvas[1].height/2)
    ctx[1].moveTo(canvas[1].height/2, 0); ctx[1].lineTo(canvas[1].width/2, canvas[1].height)
    ctx[1].lineWidth = 1
    ctx[1].strokeStyle = "#ffffff"
    ctx[1].stroke()
    ctx[1].beginPath()
    for (x=0;x<canvas[1].width;x++) {
        ctx[1].lineTo(x, canvas[1].height/2-(vect[0] * Math.pow(_x, 2) + thing.speed[0]*_x))
        _x += 1
    }
    ctx[1].lineWidth = 3
    ctx[1].strokeStyle = "red"
    ctx[1].stroke()

    ctx[2].clearRect(0, 0, canvas[2].clientWidth, canvas[2].clientHeight)
    ctx[2].fillText(new Date(), 10, 10)
    _x=-canvas[1].width/2
    ctx[2].beginPath()
    ctx[2].moveTo(0, canvas[2].height/2); ctx[2].lineTo(canvas[2].width, canvas[2].height/2)
    ctx[2].moveTo(canvas[2].height/2, 0); ctx[2].lineTo(canvas[2].width/2, canvas[2].height)
    ctx[2].lineWidth = 1
    ctx[2].strokeStyle = "#ffffff"
    ctx[2].stroke()
    ctx[2].beginPath()
    for (x=0;x<canvas[2].width;x++) {
        ctx[2].lineTo(x, canvas[2].height/2-(vect[1] * Math.pow(_x, 2) + thing.speed[1]*_x))
        _x += 1
    }
    ctx[2].lineWidth = 3
    ctx[2].strokeStyle = "red"
    ctx[2].stroke()
}

window.onload = () => {
    display = document.getElementById('display')
    canvas = [document.getElementById('canvas001'), document.getElementById('canvas002'), document.getElementById('canvas003')]
    canvas[0].addEventListener("mouseup", e => vect = [0, 1])
    canvas[0].addEventListener("mousedown", e => vect = [0, -1])

    ctx = [canvas[0].getContext('2d'), canvas[1].getContext('2d'), canvas[2].getContext('2d')]
    ctx[1].font = "10pt Arial"

    iBall = new Image()
    iBall.src = "image/football.png"
    iBall.onload = () => {
        thing = new Thing2D([canvas[0].width-iBall.width/10, canvas[0].height-iBall.height/10])
        window.requestAnimationFrame(draw)
    }
}