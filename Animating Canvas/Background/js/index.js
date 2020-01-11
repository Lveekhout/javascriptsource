let p
let canvas
let ctx
let map, cloud
let r

function mouseMove(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillText(e.offsetX + "/" + canvas.width, 10, 50)

    let cx = e.offsetX / (canvas.width-1)
    let cy = e.offsetY / (canvas.height-1)
    let maxx = map.width - canvas.width
    let maxy = map.height - canvas.height

    ctx.drawImage(map, cx*maxx, cy*maxy, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
}

function draw(m) {
    if (m<30000) window.requestAnimationFrame(draw)

    p.innerHTML = m
    let depth = 850
    let view = [depth+depth*Math.sin(r), depth+depth*Math.sin(r), map.width-2*(depth+depth*Math.sin(r)), map.height-2*(depth+depth*Math.sin(r))]
    ctx.drawImage(map, view[0], view[1], view[2], view[3], 0, 0, canvas.width, canvas.height)
//    ctx.drawImage(map, map.width/2+300*Math.cos(r), map.height/2-100*Math.sin(r), canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.globalAlpha = 0.6;
    ctx.drawImage(cloud, canvas.width/3+300*Math.cos(r/3), canvas.height/3+100*Math.sin(r/3))
    ctx.restore()
    r+=0.05
}

window.onload = () => {
    p = document.getElementById('p001')
    canvas = document.getElementById('canvas001')
    canvas.width = document.getElementsByTagName("body")[0].clientWidth
    canvas.addEventListener("mousemove", e => window.requestAnimationFrame(() => mouseMove(e)))

    ctx =  canvas.getContext('2d')
    ctx.font = "12pt Courrier new"
    ctx.fillStyle = "black"

    canvas.addEventListener("mousemove", e => {
        console.log(e)
    })

    cloud = new Image()
    cloud.onload = () => {
        map = new Image()
        map.onload = () => {
            r=0
            window.requestAnimationFrame(draw)
        }
        map.src = "images/Duinrell Vakantiepark plattegrond 2019.jpg"
    }
    cloud.src = "images/cloud-big-blue-2.png"
}