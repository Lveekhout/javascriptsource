let display
let canvas
let ctx
let iBall
let thing
let vect = [0, 1]

function makeVector(src, length) {
    let l = Math.sqrt(Math.pow(src[0], 2) + Math.pow(src[1], 2))
    return [src[0]*(length/l), src[1]*(length/l)]
}

function Thing2D(bound) {
    this.pos = [200, canvas.height/2]
    this.speed = [0, 0]
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
    if (thing.pos[1]<canvas.height-iBall.height/20) window.requestAnimationFrame(draw)

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    display.innerHTML = "speed: " + Math.floor(Math.sqrt(Math.pow(thing.speed[0],2)+Math.pow(thing.speed[1],2)))
    ctx.drawImage(iBall, thing.pos[0], thing.pos[1], iBall.width/20, iBall.height/20)

//    vect = makeVector([canvas.width/2-thing.pos[0], canvas.height/2-thing.pos[1]], 0.3)
//    console.log(Math.sqrt(Math.pow(vect[0],2+Math.pow(vect[1],2))))
//    thing.apply_acc(vect)
    thing.apply_acc(vect)
}

window.onload = () => {
    display = document.getElementById('display')
    canvas = document.getElementById('canvas001')
    ctx = canvas.getContext('2d')
    ctx.font = "12pt Courrier new"

    iBall = new Image()
    iBall.src = "image/football.png"
    iBall.onload = () => {
        thing = new Thing2D([canvas.width-iBall.width/20, canvas.height-iBall.height/20])
        window.requestAnimationFrame(draw)
    }

    canvas.addEventListener("mouseup", e => vect = [0, 1])
    canvas.addEventListener("mousedown", e => vect = [0, -1])
}