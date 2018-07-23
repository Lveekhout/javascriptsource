let canvas
let ctx
function update() {
    //TODO: update situatie
}

function draw(millisec) {
    update()

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillText(millisec, 5, 15)

    p001.innerHTML = window.requestAnimationFrame(draw)
}

window.onload = () => {
    canvas = document.getElementById('canvas001')
    ctx = canvas.getContext('2d')
    ctx.font = "12pt Courrier new"

    draw()
}