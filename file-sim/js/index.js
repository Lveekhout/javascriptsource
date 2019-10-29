let canvas
let ctx
let origin
let autoos = []
let marge = 0.2//1124901351309333
let status = {animate:true,error:""}
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
    ctx.fillText(millisec, 5, 15)

    ctx.save() // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
    ctx.translate(origin[0], origin[1])
    autoos.forEach(v => {
        v.position += v.speed
        v.speed += v.force
        ctx.save()
        ctx.rotate(-v.position)
        ctx.fillStyle = v.color
        ctx.fillRect(100, -10, 10, 20)
        ctx.restore()

        v.botsing(v)
        //if (v.position>Math.PI*2) v.position -= Math.PI*2
    })
    ctx.restore()

    if (status.error) throw status.error

    let now = new Date().getTime()
    autoos.forEach(v => {
        if (now-v.time>100) {
            v.time = now
            if (v.beslis) beslis(v)
        }
    })

    if (status.animate) window.requestAnimationFrame(draw)
}

window.onload = () => {
    canvas = document.getElementById('canvas001')
    ctx = canvas.getContext('2d')
    ctx.font = "12pt Courrier new"

    origin = [canvas.clientWidth/2, canvas.clientHeight/2]
    for (i=0;i<Math.PI*2;i+=0.5+Math.random()) autoos.push(
        {
            color: 0,
            position: i,
            cc: 0,
            speed: 0.01,
            force: 0,
            time: 0,
            botsing: botsing,
            beslis: beslis
        })
    for (i=0;i<autoos.length-1;i++) autoos[i].next = autoos[i+1]
    autoos[0].color = "red"
    autoos[0].cc = Math.PI*2
    autoos[0].beslis = undefined
    autoos[autoos.length-1].next = autoos[0]

    window.requestAnimationFrame(draw)
}