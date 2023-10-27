// let grafiek
// let canvas
// let ctx
// let step = 1
// let zoom = 100
// let ox, oy
// let drag
let a = 0
let b = 1
let c = 0
let d = 0
// function raster() {
//     ctx.save()
//     ctx.lineWidth = 1
//     ctx.beginPath()
//         for (let x=ox+zoom; x<canvas.clientWidth; x+=zoom) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.clientHeight) }
//         for (let y=oy+zoom; y<canvas.clientHeight; y+=zoom) { ctx.moveTo(0, y); ctx.lineTo(canvas.clientWidth, y) }
//         for (let x=ox-zoom; x>0; x-=zoom) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.clientHeight) }
//         for (let y=oy-zoom; y>0; y-=zoom) { ctx.moveTo(0, y); ctx.lineTo(canvas.clientWidth, y) }
//         ctx.strokeStyle = "#CCC"
//     ctx.stroke()
//     ctx.beginPath()
//         ctx.moveTo(ox, 0)
//         ctx.lineTo(ox, canvas.clientHeight)
//         ctx.moveTo(0, oy)
//         ctx.lineTo(canvas.clientWidth, oy)
//         ctx.strokeStyle = "#F88"
//     ctx.stroke()
//     ctx.restore()
// }
// function calcIntersectTime(src) {
//     if (src[0]==0) { // Lineair oplossen
//         if (src[1]==0) return
//         else {
//             const x = src[2]/-src[1]
//             if (x<0) return; else return x
//         }
//     } else {
//         const d = src[1]*src[1]-4*src[0]*src[2]
//         if (d<0) return;
//         else {
//             const x = (-src[1]-Math.sqrt(d))/(2*src[0])
//             if (x<0) return (-src[1]+Math.sqrt(d))/(2*src[0]); else return x
//         }
//     }
// }
// function draw() {
//     let y
//     ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas
//
//     raster()
//
//     let datum = new Date()
//     // ctx.fillText(datum, 5, 15)
//     ctx.fillText("a = " + a.toFixed(2), 5, 15)
//     ctx.fillText("b = " + b.toFixed(2), 5, 27)
//     ctx.fillText("c = " + c.toFixed(2), 5, 39)
//
//     ctx.beginPath()
//     y = NaN
//     for (let _x=0;_x<canvas.clientWidth+step;_x+=step) {
//         let x = (-ox+_x)/zoom
//         if (isNaN(y)) { y = eval(functie1.value); if (!isNaN(y)) ctx.moveTo(_x, y*-zoom+oy) }
//         else          { y = eval(functie1.value); if (!isNaN(y)) ctx.lineTo(_x, y*-zoom+oy) }
//     }
//     ctx.strokeStyle = "deepskyblue"
//     ctx.stroke()
//
//     ctx.beginPath()
//     y = NaN
//     for (let _x=0;_x<canvas.clientWidth+step;_x+=step) {
//         let x = (-ox+_x)/zoom
//         if (isNaN(y)) { y = eval(functie2.value); if (!isNaN(y)) ctx.moveTo(_x, y*-zoom+oy) }
//         else          { y = eval(functie2.value); if (!isNaN(y)) ctx.lineTo(_x, y*-zoom+oy) }
//     }
//     ctx.strokeStyle = "brown"
//     ctx.stroke()
//
//     // ctx.beginPath()
//     // y = NaN
//     // for (let _x=0;_x<canvas.clientWidth+step;_x+=step) {
//     //     let x = (-ox+_x)/zoom
//     //     if (isNaN(y)) { y = eval("(" + functie1.value + ")-(" + functie2.value + ")"); if (!isNaN(y)) ctx.moveTo(_x, y*-zoom+oy) }
//     //     else          { y = eval("(" + functie1.value + ")-(" + functie2.value + ")"); if (!isNaN(y)) ctx.lineTo(_x, y*-zoom+oy) }
//     // }
//     // ctx.strokeStyle = "purple"
//     // ctx.stroke()
// }
//
const f = x => {
    if (x<1) return x*x
    else return -x*x + 4*x - 2
}

function l(x) { // 2022-10-23 voor differentieren: (l(a+x)-l(a))/x
    return Math.sqrt(1 - Math.pow(x, 2))
}

// https://www.youtube.com/watch?v=hL6MPoqgwHU
// input: 3 * g(-x)  + g(1/x) + g(x)
const g = x => {
    return (-2 * Math.pow(x, 2) - 1) / (3 * x)
}

const at = (b, s, v) => {
    console.log(   (Math.pow(v,2)-Math.pow(b,2))   / (4*s)    )
    const t = 2*s/(v+b)
    const a = (v-b)/(2*t)
    return [a, t]
}

const stop = (x,s) => {
    // 2ax + b = s
    // 2ax = -b + s
    // x = (s-b)/2a

    let t = (s-b) / (2*a)
    if (x<t) return a*x*x + b*x + c
    else return a*t*t + b*t + x*s - t*s  + c // a*t*t + b*t + (x-t)*s + c // a*t*t + (b-s)*t + x*s + c
}

const cone = (x, a, b) => {
    const x2 = x * x
    const b2 = b * b
    const a2_1 = a * a - 1
    if (a2_1 === 0) {
        if (b < 0) {
            const z = (x2 - b2) / (2 * b)
            const y = [a * z[0], a * z[1]]
            const len = [Math.sqrt(Math.pow(y[0], 2) + Math.pow(z[0], 2)), Math.sqrt(Math.pow(y[1], 2) + Math.pow(z[1], 2))]
            return [(z[0] < 0 ? -1 : 1) * len[0], (z[1] < 0 ? -1 : 1) * len[1]]
        } else {

        }
    } else {
        const ab = a * b
        const z = [(-ab - Math.sqrt(a2_1 * x2 + b2)) / a2_1, (-ab + Math.sqrt(a2_1 * x2 + b2)) / a2_1]
        const y = [a * z[0], a * z[1]]
        const len = [Math.sqrt(Math.pow(y[0], 2) + Math.pow(z[0], 2)), Math.sqrt(Math.pow(y[1], 2) + Math.pow(z[1], 2))]
        return [(z[0] < 0 ? -1 : 1) * len[0], (z[1] < 0 ? -1 : 1) * len[1]]
    }
}

//console.log(new Date().getTime()); for (i=0;i<100000000;i++) ggd1(752,372); console.log(new Date().getTime())
const ggd1 = (t, n) => {
    if (n==0) return t
    else return ggd1(n, t%n)
}

//console.log(new Date().getTime()); for (i=0;i<100000000;i++) ggd2(752,372); console.log(new Date().getTime())
const ggd2 = (a, b) => {
    while (a!=b) {
        if (a>b) a -= b
        else b -= a
    }
    return a
}

const bots = (b, b_, c_) => {
    const t = c_ / (b - b_)
    return ({duration: t, distance: b * t})
}

const handleEvent = e => {
    switch (e.type) {
        case "resize":
            document.getElementById('canvas').width = document.getElementsByClassName('right')[0].clientWidth
            document.getElementById('canvas').height = document.getElementsByClassName('right')[0].clientHeight
            break;
        case "input":
            eval(e.target.parentNode.children[1].value + '=' + e.target.value)
            e.target.parentNode.children[9].value = parseFloat(e.target.value).toFixed(2)
            grafiek.draw()
            break;
    }
}

window.onload = () => {
//     canvas = document.getElementById('canvas')
//     ox = Math.trunc(canvas.clientWidth/2)
//     oy = Math.trunc(canvas.clientHeight/2)
//
//     canvas.addEventListener("mousewheel", e => { zoom -= e.deltaY/10; if (zoom<zoominput.min) zoom = parseInt(zoominput.min); if (zoom>zoominput.max) zoom = parseInt(zoominput.max); zoominput.value = zoom; window.requestAnimationFrame(draw) })
//     canvas.addEventListener("mousedown", e => drag=true)
//     canvas.addEventListener("mouseup", e => drag=false)
//     canvas.addEventListener("mouseleave", e => drag=false)
//     canvas.addEventListener("mousemove", e => { if (drag) { ox += e.movementX;  oy += e.movementY; window.requestAnimationFrame(draw) } })
//     canvas.addEventListener("dblclick", e => console.log(e))
//
//     ctx = canvas.getContext('2d')
// //    ctx.globalCompositeOperation = 'source-over'
//     ctx.font = "10pt Verdana"
//     ctx.fillStyle = "gray"
//     ctx.lineWidth = 3
//
//     zoominput.value = zoom
//     window.requestAnimationFrame(draw)

    grafiek = new Grafiek(document.getElementById('canvas'))
    grafiek.draw()
}
