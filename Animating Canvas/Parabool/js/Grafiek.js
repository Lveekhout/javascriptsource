function Grafiek(canvas) {
    canvas.width = canvas.parentNode.clientWidth
    canvas.height = canvas.parentNode.clientHeight

    let drag

    canvas.addEventListener("mousewheel", e => { e.preventDefault(); zoom -= e.deltaY/10; window.requestAnimationFrame(draw); })//if (zoom<zoominput.min) zoom = parseInt(zoominput.min); if (zoom>zoominput.max) zoom = parseInt(zoominput.max); zoominput.value = zoom; })
    canvas.addEventListener("mousedown", e => drag=true)
    canvas.addEventListener("mouseup", e => drag=false)
    canvas.addEventListener("mouseleave", e => drag=false)
    canvas.addEventListener("mousemove", e => { if (drag) { origin[0] += e.movementX;  origin[1] += e.movementY; window.requestAnimationFrame(draw) } })
    canvas.addEventListener("dblclick", e => console.log(e))

    const ctx = canvas.getContext('2d')
    ctx.font = "10pt Verdana"
    ctx.fillStyle = "gray"
    ctx.lineWidth = 3

    origin = [Math.trunc(canvas.clientWidth/2), Math.trunc(canvas.clientHeight/2)]
    zoom = 100

    const raster = () => {
        ctx.save()
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let x = origin[0] + zoom; x < canvas.clientWidth; x += zoom) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.clientHeight)
        }
        for (let y = origin[1] + zoom; y < canvas.clientHeight; y += zoom) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.clientWidth, y)
        }
        for (let x = origin[0] - zoom; x > 0; x -= zoom) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.clientHeight)
        }
        for (let y = origin[1] - zoom; y > 0; y -= zoom) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.clientWidth, y)
        }
        ctx.strokeStyle = "#CCC"
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(origin[0], 0)
        ctx.lineTo(origin[0], canvas.clientHeight)
        ctx.moveTo(0, origin[1])
        ctx.lineTo(canvas.clientWidth, origin[1])
        ctx.strokeStyle = "#F88"
        ctx.stroke()
        ctx.restore()
    }
    const draw = m => {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        let datum = new Date()
        ctx.fillText(datum, 5, 15)

        raster()

        ctx.beginPath()
        let y = NaN
        let expressie = document.getElementById('expressie1')
        for (let _x = 0; _x < canvas.clientWidth; _x++) {
            let x = (-origin[0] + _x) / zoom
            if (isNaN(y)) {
                y = eval(expressie.value);
                if (!isNaN(y)) ctx.moveTo(_x, y * -zoom + origin[1])
            } else {
                y = eval(expressie.value);
                if (!isNaN(y)) ctx.lineTo(_x, y * -zoom + origin[1])
            }
        }
        ctx.strokeStyle = "deepskyblue"
        ctx.stroke()

        ctx.beginPath()
        y = NaN
        expressie = document.getElementById('expressie2')
        for (let _x = 0; _x < canvas.clientWidth; _x++) {
            let x = (-origin[0] + _x) / zoom
            if (isNaN(y)) {
                y = eval(expressie.value);
                if (!isNaN(y)) ctx.moveTo(_x, y * -zoom + origin[1])
            } else {
                y = eval(expressie.value);
                if (!isNaN(y)) ctx.lineTo(_x, y * -zoom + origin[1])
            }
        }
        ctx.strokeStyle = "brown"
        ctx.stroke()

        ctx.beginPath()
        y = NaN
        expressie = document.getElementById('expressie3')
        for (let _x = 0; _x < canvas.clientWidth; _x++) {
            let x = (-origin[0] + _x) / zoom
            if (isNaN(y)) {
                y = eval(expressie.value);
                if (!isNaN(y)) ctx.moveTo(_x, y * -zoom + origin[1])
            } else {
                y = eval(expressie.value);
                if (!isNaN(y)) ctx.lineTo(_x, y * -zoom + origin[1])
            }
        }
        ctx.strokeStyle = "purple"
        ctx.stroke()

        // window.requestAnimationFrame(draw)
    }
    this.draw = () => {
        window.requestAnimationFrame(draw)
    }
}
