let canvas
let ctx
let brommer
function update() {
    //TODO: update situatie
}

function draw(millisec) {
    update()

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillText(millisec, 5, 15)
    ctx.rotate(0.03)
    ctx.drawImage(brommer, 0, 0)

    p001.innerHTML = window.requestAnimationFrame(draw)
}

window.onload = () => {
    canvas = document.getElementById('canvas001')
    ctx = canvas.getContext('2d')
    ctx.font = "12pt Courrier new"

    brommer = new Image()
    brommer.src = "image/hmijxsr-85743.png"

    draw()
}