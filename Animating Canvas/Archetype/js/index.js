let canvas
let ctx
function update() {
    p001.innerHTML = window.requestAnimationFrame(draw)
}

function draw(millisec) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillText(millisec, 5, 15)
    setTimeout(update, 0)
}

window.onload = () => {
    canvas = document.getElementById('canvas001')
    ctx = canvas.getContext('2d')
    ctx.font = "12pt Courrier new"
    update()
}