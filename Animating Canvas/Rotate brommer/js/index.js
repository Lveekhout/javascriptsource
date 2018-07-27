//http://codetheory.in/canvas-rotating-and-scaling-images-around-a-particular-point/
let canvas
let ctx
let brommer, buggy
let football = {scale: 0.05, posx: 0, posy: 0, speedx: 1/0.05, speedy: 0, image:new Image()}
let lfo2 = new LFO(0.01)
let lfo = new LFO(lfo2.value/10)
let stop = false
function update() {
    lfo2.update()
    lfo.speed = lfo2.value/10
    lfo.update()
    
    football.speedy += 10
    football.posx += football.speedx
    football.posy += football.speedy
    if (football.posx > ((canvas.clientWidth/football.scale)-football.image.width)) {
        football.posx = 2*((canvas.clientWidth/football.scale)-football.image.width) - football.posx
        football.speedx = -football.speedx
    }
    if (football.posx < 0) {
        football.posx = -football.posx
        football.speedx = -football.speedx
    }
    if (football.posy > ((canvas.clientHeight/football.scale)-football.image.height)) {
        football.posy = 2*((canvas.clientHeight/football.scale)-football.image.height) - football.posy
        football.speedy = -football.speedy
    }
}

function draw(millisec) {
    update()

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.save()
    ctx.translate(buggy.width/2, buggy.height/2)
    ctx.rotate(-lfo.angle)
    ctx.scale(0.7-lfo.value/2, 0.7-lfo.value/2)
    ctx.drawImage(buggy, -buggy.width/2, -buggy.height/2)
    ctx.restore()

    ctx.save()
    ctx.translate(brommer.width/2, brommer.height/2)
    ctx.rotate(lfo.angle)
    ctx.scale(0.7+lfo.value/2, 0.7+lfo.value/2)
    ctx.drawImage(brommer, -brommer.width/2, -brommer.height/2)
    ctx.restore()

    ctx.save()
    ctx.scale(football.scale, football.scale)
    ctx.drawImage(football.image, football.posx, football.posy)
    ctx.restore()

    if (!stop) p001.innerHTML = window.requestAnimationFrame(draw)
}

window.onload = () => {
    canvas = document.getElementById('canvas001')
    canvas.addEventListener("click", () => {
        stop = !stop
        if (!stop) p001.innerHTML = window.requestAnimationFrame(draw)
    })

    ctx = canvas.getContext('2d')
 
    football.url = ""
    football.image.src = "image/football.png"

    buggy = new Image()
    buggy.src = "image/4uom1wh-3cc80.png"

    brommer = new Image()
    brommer.src = "image/hmijxsr-85743.png"
    
    brommer.addEventListener("load", () => p001.innerHTML = window.requestAnimationFrame(draw))
}