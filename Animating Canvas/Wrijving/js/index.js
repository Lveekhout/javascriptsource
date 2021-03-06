let grafiek

const handleEvent = e => {
    switch (e.type) {
        case "resize":
            let canvas = document.getElementById('canvas')
            canvas.width = canvas.parentNode.clientWidth
            canvas.height = canvas.parentNode.clientHeight
            grafiek.initContext()
            grafiek.draw()
            break;
        case "input":
            eval(e.target.parentNode.children[1].value + '=' + e.target.value)
            e.target.parentNode.children[9].value = parseFloat(e.target.value).toFixed(2)
            window.requestAnimationFrame(grafiek.draw)
            break;
    }
}

window.onload = () => {
    grafiek = new Grafiek(document.getElementById('canvas'))
    grafiek.draw()
}