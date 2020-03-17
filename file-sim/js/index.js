// let canvas
// let ctx
// let origin = []
// let autoos = []
// let status = {animate:true,error:""}
// let animate = true

// const MARGE = 0.2//1124901351309333
// const STEP = 1

// function botsing(a) {
//     if (a.position>a.next.cc+a.next.position-MARGE) status.error = "botsing"
// }

// function beslis(a) {
//     if (a.next.cc+a.next.position-a.position>0.5) a.speed = 0.011
//     else a.speed = 0.009
// }

// function draw(millisec) {
//     ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
//     ctx.fillText("autoos[0].speed="+autoos[0].speed, 5, 15)

//     ctx.save() // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
//     ctx.translate(origin[0], origin[1])
//     autoos.forEach(v => {
//         v.position += v.acceleration*Math.pow(STEP, 2) + v.speed*STEP
//         v.speed += 2*v.acceleration*STEP
//         ctx.save()
//         ctx.rotate(-v.position)
//         ctx.fillStyle = v.color
//         ctx.fillRect(100, -10, 10, 20)
//         ctx.restore()

//         v.botsing(v)
//     })
//     ctx.restore()

//     if (status.error) throw status.error

//     // let now = new Date().getTime()
//     // autoos.forEach((v, i) => {
//     //     if (now-v.time>100) {
//     //         v.time = now
//     //         if (v.beslis) beslis(v)
//     //     }
//     // })

//     if (status.animate) window.requestAnimationFrame(draw)
// }

const max = 1000
let cm
window.onload = () => {
    // canvas = document.getElementById('canvas001')
    // ctx = canvas.getContext('2d')
    // ctx.font = "10pt Courrier new"

    // origin = [canvas.clientWidth/2, canvas.clientHeight/2]
    // // for (i=0;i<Math.PI*2;i+=0.5+Math.random()) autoos.push({color: 0,position: i,cc: 0,speed: 0.01,acceleration: 0,time: 0,botsing: botsing,beslis: beslis})
    // autoos.push({color: 0,position: 0,      cc: 0,speed: 0.01,acceleration: 0,time: 0,botsing: botsing})
    // autoos.push({color: 0,position: Math.PI,cc: 0,speed: 0.01,acceleration: 0,time: 0,botsing: botsing})
    // for (i=0;i<autoos.length-1;i++) autoos[i].next = autoos[i+1]
    // autoos[0].color = "red"
    // autoos[0].cc = Math.PI*2
    // autoos[0].beslis = undefined
    // autoos[autoos.length-1].next = autoos[0]

    // window.requestAnimationFrame(draw)

    cm = new CarManager(document.getElementById('canvas001'), 100)
    cm.addCar(new Car(90, 10, "red", 500 + random(max)))
    cm.addCar(new Car(80, 10, "blue", 500 + random(max)))
    cm.addCar(new Car(70, 10, "blue", 500 + random(max)))
    cm.addCar(new Car(60, 10, "blue", 500 + random(max)))
    cm.addCar(new Car(50, 10, "blue", 500 + random(max)))
    cm.addCar(new Car(40, 10, "blue", 500 + random(max)))
    cm.addCar(new Car(30, 10, "blue", 500 + random(max)))
    cm.addCar(new Car(20, 10, "blue", 500 + random(max)))
    cm.addCar(new Car(10, 10, "blue", 500 + random(max)))
    cm.addCar(new Car( 0, 10, "blue", 500 + random(max)))
    cm.startAnimation()
}