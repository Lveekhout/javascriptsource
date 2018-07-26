//http://codetheory.in/canvas-rotating-and-scaling-images-around-a-particular-point/
let canvas
let ctx
let brommer, background
let lfo = 0
function update() {
    //TODO: update situatie
    lfo += 0.1
    if (lfo>Math.PI*2) lfo -= Math.PI*2
}

function draw(millisec) {
    update()

//    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.drawImage(background, 0, 0)
    ctx.fillText(millisec, 5, 15)

    ctx.save()
    ctx.translate(brommer.width/2, brommer.height/2)
    ctx.rotate(lfo)
    ctx.scale(0.7+Math.sin(lfo)/2, 0.7+Math.sin(lfo)/2)
    ctx.drawImage(brommer, -brommer.width/2, -brommer.height/2)
    ctx.restore()

    p001.innerHTML = window.requestAnimationFrame(draw)
}

window.onload = () => {
    canvas = document.getElementById('canvas001')
    ctx = canvas.getContext('2d')
    ctx.font = "12pt Courrier new"

    background = new Image()
    background.src = "image/Bremen_background.jpg"

    brommer = new Image()
    brommer.src = "image/hmijxsr-85743.png"
    
    brommer.addEventListener("load", () => p001.innerHTML = window.requestAnimationFrame(draw))
}