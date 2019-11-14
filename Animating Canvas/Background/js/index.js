let p
let canvas
let ctx
let map, cloud
let r
let tijden = []

function draw(m) {
    let start = new Date().getTime()
    p.innerHTML = m
    ctx.drawImage(map, map.width/2+300*Math.cos(r), map.width/2-100*Math.sin(r), canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(cloud, 300*Math.cos(r/3), 100*Math.sin(r/3))
    r+=0.05
    let afterdraw = new Date().getTime()
    if (m>10000) tijden.push({start:start,afterdraw:afterdraw})
    // if (m<30000) window.requestAnimationFrame(draw)
    if (m<30000) setTimeout(()=>draw(m+10),16)
    else {
        console.log(JSON.stringify(tijden))
        // console.log(tijden.length)
        // let sum=0
        // for (i=1;i<tijden.length;i++) sum+=tijden[i]-tijden[i-1]
        // console.log(sum)
        // console.log(sum/tijden.length)
        // p.innerHTML = 'KLAAR!'
    }
}

window.onload = () => {
    p = document.getElementById('p001')
    canvas = document.getElementById('canvas001')
    ctx =  canvas.getContext('2d')
    ctx.font = "12pt Courrier new"

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