let canvas
let ctx
let origin
let autoos = []
let marge = 0.2//1124901351309333
let status = { animate:true }
let animate = true

function botsing(a) {
    if (a.position>a.next.cc+a.next.position-marge) status.error = "botsing"
}

function beslis(a) {
    if (a.next.cc+a.next.position-a.position>0.5) a.speed = 0.011
    else a.speed = 0.009
}

function draw(millisec) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillText(millisec, 0, 8)

    ctx.save() // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
    ctx.translate(origin[0], origin[1])
    autoos.forEach(v => {
        v.position += v.speed
        v.speed += v.force
        if (v.speed<0) { v.speed=0; v.force=0 }
        if (v.speed>v.maxspeed) { v.speed=v.maxspeed; v.force=0 }
        if (v.botsing) v.botsing(v)

        ctx.save()
        ctx.rotate(-v.position)
        ctx.fillStyle = v.color
        ctx.fillRect(100, -10, 10, 20)
        ctx.restore()

        //if (v.position>Math.PI*2) v.position -= Math.PI*2
    })
    ctx.restore()

    if (status.error) throw status.error

    let now = new Date().getTime()
    autoos.forEach(v => {
        if (now-v.time>2000) {
            v.time = now
            if (v.beslis) beslis(v)
        }
    })

    if (status.animate) window.requestAnimationFrame(draw)
}

window.onload = () => {
    canvas = document.getElementById('canvas001')
    ctx = canvas.getContext('2d')
    ctx.font = "8pt Courier New"

    origin = [canvas.clientWidth/2, canvas.clientHeight/2]
    createAutoos(autoos)
    window.requestAnimationFrame(draw)
}