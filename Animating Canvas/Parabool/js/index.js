let canvas
let ctx
let step = 5
let zoom = 100
let ox, oy
let drag
function rooster() {
    ctx.save()
    ctx.lineWidth = 1
    ctx.strokeStyle = "#CCC"
    ctx.beginPath();
        for (let x=ox+zoom; x<canvas.clientWidth; x+=zoom) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.clientHeight) }
        for (let y=oy+zoom; y<canvas.clientHeight; y+=zoom) { ctx.moveTo(0, y); ctx.lineTo(canvas.clientWidth, y) }
        for (let x=ox-zoom; x>0; x-=zoom) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.clientHeight) }
        for (let y=oy-zoom; y>0; y-=zoom) { ctx.moveTo(0, y); ctx.lineTo(canvas.clientWidth, y) }
    ctx.stroke();
    ctx.beginPath();
        ctx.strokeStyle = "#F88"
        ctx.moveTo(ox, 0)
        ctx.lineTo(ox, canvas.clientHeight)
        ctx.moveTo(0, oy)
        ctx.lineTo(canvas.clientWidth, oy)
    ctx.stroke();
    ctx.restore()
}
function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); // clear canvas

    rooster()

    ctx.beginPath();
    for (let _x=0;_x<canvas.clientWidth+step;_x+=step) {
        let x = (-ox+_x)/zoom
        try { ctx.lineTo(_x, eval(functie.value)*-zoom+oy) } catch(e) {}
    }
    ctx.stroke();

    let datum = new Date()
    ctx.fillText(datum, 5, 15)
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

    ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'source-over';
    ctx.font = "10pt Verdana"
    ctx.fillStyle = "gray"
    ctx.strokeStyle = "deepskyblue"
    ctx.lineWidth = 3

    zoominput.value = zoom
    window.requestAnimationFrame(draw)
}