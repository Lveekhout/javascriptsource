let canvas
let ctx
let origin
let autoos = []
let marge = 0.2//1124901351309333
let status = {animate:true,error:""}
let animate = true

function beslis(a0, a1, c) {
        if (c+a1.position-a0.position>0.5) a0.speed = 0.011
        else a0.speed = 0.009
}

function draw(millisec) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillText(millisec, 5, 15)

    ctx.save() // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
    ctx.translate(origin[0], origin[1])
    for (i=0;i<autoos.length;i++) {
        ctx.save()
        ctx.rotate(-autoos[i].position)
        ctx.fillStyle = autoos[i].color
        ctx.fillRect(100, -10, 10, 20)
        ctx.restore()
        autoos[i].position += autoos[i].speed
        autoos[i].speed += autoos[i].force

        if (i<autoos.length-1) {
            if (autoos[i].position>autoos[i+1].position+autoos[i+1].speed-marge) status.error = "botsing"
        } else {
            if (autoos[i].position>Math.PI*2+autoos[0].position+autoos[0].speed-marge) status.error = "botsing"
        }
        //if (v.position>Math.PI*2) v.position -= Math.PI*2
    }
    ctx.restore()

    if (status.error) throw status.error

    let now = new Date().getTime()
    for (i=1;i<autoos.length;i++) {
        if (now-autoos[i].time>100) {
            autoos[i].time = now
            if (i<autoos.length-1) beslis(autoos[i], autoos[i+1], 0)
            else beslis(autoos[i], autoos[0], Math.PI*2)
        }
    }

    if (status.animate) window.requestAnimationFrame(draw)
}

window.onload = () => {
    canvas = document.getElementById('canvas001')
    ctx = canvas.getContext('2d')
    ctx.font = "12pt Courrier new"

    origin = [canvas.clientWidth/2, canvas.clientHeight/2]
    for (i=0;i<Math.PI*2;i+=0.5+Math.random()) autoos.push({color:0,position:i,speed:0.01,force:0,time:0})
    autoos[0].color = "red"

    window.requestAnimationFrame(draw)
}