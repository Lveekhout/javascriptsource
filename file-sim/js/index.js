let canvas
let ctx
let origin = []
let autoos = []
<<<<<<< HEAD
let marge = 0.2//1124901351309333
let status = { animate:true }
=======
let status = {animate:true,error:""}
>>>>>>> 06af65a5a693964bf3dc2f50d49652cb0ab5e9c7
let animate = true

const MARGE = 0.2//1124901351309333
const STEP = 1

function botsing(a) {
    if (a.position>a.next.cc+a.next.position-MARGE) status.error = "botsing"
}

function beslis(a) {
    if (a.next.cc+a.next.position-a.position>0.5) a.speed = 0.011
    else a.speed = 0.009
}

function draw(millisec) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
<<<<<<< HEAD
    ctx.fillText(millisec, 0, 8)
=======
    ctx.fillText("autoos[0].speed="+autoos[0].speed, 5, 15)
>>>>>>> 06af65a5a693964bf3dc2f50d49652cb0ab5e9c7

    ctx.save() // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
    ctx.translate(origin[0], origin[1])
    autoos.forEach(v => {
<<<<<<< HEAD
        v.position += v.speed
        v.speed += v.force
        if (v.speed<0) { v.speed=0; v.force=0 }
        if (v.speed>v.maxspeed) { v.speed=v.maxspeed; v.force=0 }
        if (v.botsing) v.botsing(v)

=======
        v.position += v.acceleration*Math.pow(STEP, 2) + v.speed*STEP
        v.speed += 2*v.acceleration*STEP
>>>>>>> 06af65a5a693964bf3dc2f50d49652cb0ab5e9c7
        ctx.save()
        ctx.rotate(-v.position)
        ctx.fillStyle = v.color
        ctx.fillRect(100, -10, 10, 20)
        ctx.restore()

<<<<<<< HEAD
        //if (v.position>Math.PI*2) v.position -= Math.PI*2
=======
        v.botsing(v)
>>>>>>> 06af65a5a693964bf3dc2f50d49652cb0ab5e9c7
    })
    ctx.restore()

    if (status.error) throw status.error

<<<<<<< HEAD
    let now = new Date().getTime()
    autoos.forEach(v => {
        if (now-v.time>2000) {
            v.time = now
            if (v.beslis) beslis(v)
        }
    })
=======
    // let now = new Date().getTime()
    // autoos.forEach((v, i) => {
    //     if (now-v.time>100) {
    //         v.time = now
    //         if (v.beslis) beslis(v)
    //     }
    // })
>>>>>>> 06af65a5a693964bf3dc2f50d49652cb0ab5e9c7

    if (status.animate) window.requestAnimationFrame(draw)
}

window.onload = () => {
    canvas = document.getElementById('canvas001')
    ctx = canvas.getContext('2d')
<<<<<<< HEAD
    ctx.font = "8pt Courier New"

    origin = [canvas.clientWidth/2, canvas.clientHeight/2]
    createAutoos(autoos)
=======
    ctx.font = "10pt Courrier new"

    origin = [canvas.clientWidth/2, canvas.clientHeight/2]
    // for (i=0;i<Math.PI*2;i+=0.5+Math.random()) autoos.push({color: 0,position: i,cc: 0,speed: 0.01,acceleration: 0,time: 0,botsing: botsing,beslis: beslis})
    autoos.push({color: 0,position: 0,      cc: 0,speed: 0.01,acceleration: 0,time: 0,botsing: botsing})
    autoos.push({color: 0,position: Math.PI,cc: 0,speed: 0.01,acceleration: 0,time: 0,botsing: botsing})
    for (i=0;i<autoos.length-1;i++) autoos[i].next = autoos[i+1]
    autoos[0].color = "red"
    autoos[0].cc = Math.PI*2
    autoos[0].beslis = undefined
    autoos[autoos.length-1].next = autoos[0]

>>>>>>> 06af65a5a693964bf3dc2f50d49652cb0ab5e9c7
    window.requestAnimationFrame(draw)
}