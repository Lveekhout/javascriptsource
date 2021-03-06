let canvas
let ctx
let step = 1
let zoom = 100
let ox, oy
let drag
let a = 1
let b = 0
let c = 0
function raster() {
    ctx.save()
    ctx.lineWidth = 1
    ctx.beginPath()
        for (let x=ox+zoom; x<canvas.clientWidth; x+=zoom) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.clientHeight) }
        for (let y=oy+zoom; y<canvas.clientHeight; y+=zoom) { ctx.moveTo(0, y); ctx.lineTo(canvas.clientWidth, y) }
        for (let x=ox-zoom; x>0; x-=zoom) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.clientHeight) }
        for (let y=oy-zoom; y>0; y-=zoom) { ctx.moveTo(0, y); ctx.lineTo(canvas.clientWidth, y) }
        ctx.strokeStyle = "#CCC"
    ctx.stroke()
    ctx.beginPath()
        ctx.moveTo(ox, 0)
        ctx.lineTo(ox, canvas.clientHeight)
        ctx.moveTo(0, oy)
        ctx.lineTo(canvas.clientWidth, oy)
        ctx.strokeStyle = "#F88"
    ctx.stroke()
    ctx.restore()
}
function calcIntersectTime(src) {
    if (src[0]==0) { // Lineair oplossen
        if (src[1]==0) return
        else {
            const x = src[2]/-src[1]
            if (x<0) return; else return x
        }
    } else {
        const d = src[1]*src[1]-4*src[0]*src[2]
        if (d<0) return;
        else {
            const x = (-src[1]-Math.sqrt(d))/(2*src[0])
            if (x<0) return (-src[1]+Math.sqrt(d))/(2*src[0]); else return x
        }
    }
}
function draw() {
    let y
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

    raster()

    ctx.fillText("a = " + a.toFixed(2), 5, 15)
    ctx.fillText("b = " + b.toFixed(2), 5, 35)
    ctx.fillText("c = " + c.toFixed(2), 5, 55)

    ctx.beginPath()
    y = NaN
    for (let _x=0;_x<canvas.clientWidth+step;_x+=step) {
        let x = (-ox+_x)/zoom
        if (isNaN(y)) { y = eval(functie1.value); if (!isNaN(y)) ctx.moveTo(_x, y*-zoom+oy) }
        else          { y = eval(functie1.value); if (!isNaN(y)) ctx.lineTo(_x, y*-zoom+oy) }
    }
    ctx.strokeStyle = "deepskyblue"
    ctx.stroke()

    ctx.beginPath()
    y = NaN
    for (let _x=0;_x<canvas.clientWidth+step;_x+=step) {
        let x = (-ox+_x)/zoom
        if (isNaN(y)) { y = eval(functie2.value); if (!isNaN(y)) ctx.moveTo(_x, y*-zoom+oy) }
        else          { y = eval(functie2.value); if (!isNaN(y)) ctx.lineTo(_x, y*-zoom+oy) }
    }
    ctx.strokeStyle = "brown"
    ctx.stroke()

    ctx.beginPath()
    y = NaN
    for (let _x=0;_x<canvas.clientWidth+step;_x+=step) {
        let x = (-ox+_x)/zoom
        if (isNaN(y)) { y = eval("(" + functie1.value + ")-(" + functie2.value + ")"); if (!isNaN(y)) ctx.moveTo(_x, y*-zoom+oy) }
        else          { y = eval("(" + functie1.value + ")-(" + functie2.value + ")"); if (!isNaN(y)) ctx.lineTo(_x, y*-zoom+oy) }
    }
    ctx.strokeStyle = "purple"
    ctx.stroke()

    let datum = new Date()
    // ctx.fillText(datum, 5, 15)
}

const f = x => {
    if (x<1) return x*x
    else return -x*x + 4*x - 2
}

const at = (b, distance, speed) => {
    const t = 2*distance/(speed+b)
    const a = (speed-b)/(2*t)
    return [a, t]
}

window.onload = () => {
    canvas = document.getElementById('canvas')
    ox = Math.trunc(canvas.clientWidth/2)
    oy = Math.trunc(canvas.clientHeight/2)

    canvas.addEventListener("mousewheel", e => { zoom -= e.deltaY/10; if (zoom<zoominput.min) zoom = parseInt(zoominput.min); if (zoom>zoominput.max) zoom = parseInt(zoominput.max); zoominput.value = zoom; window.requestAnimationFrame(draw) })
    canvas.addEventListener("mousedown", e => drag=true)
    canvas.addEventListener("mouseup", e => drag=false)
    canvas.addEventListener("mouseleave", e => drag=false)
    canvas.addEventListener("mousemove", e => { if (drag) { ox += e.movementX;  oy += e.movementY; window.requestAnimationFrame(draw) } })
    canvas.addEventListener("dblclick", e => console.log(e))
    
    ctx = canvas.getContext('2d')
//    ctx.globalCompositeOperation = 'source-over'
    ctx.font = "10pt Verdana"
    ctx.fillStyle = "gray"
    ctx.lineWidth = 3

    zoominput.value = zoom
    window.requestAnimationFrame(draw)
}