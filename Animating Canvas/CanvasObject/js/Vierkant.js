function Vierkant(canvas) {
    canvas.addEventListener("mousewheel", e => {
        let _zoom = zoom - e.deltaY/10
        if (_zoom<10) _zoom = 10
        if (_zoom>500) _zoom = 500
        this.setZoom(_zoom)
    })

    let drag = false
    canvas.addEventListener("mousedown", e => drag=true)
    canvas.addEventListener("mouseup", e => drag=false)
    canvas.addEventListener("mouseleave", e => drag=false)
    canvas.addEventListener("mousemove", e => {
        if (e.altKey) this.setOrigin(e.offsetX, e.offsetY)
        else if (drag) this.setOrigin(x0+e.movementX, y0+e.movementY)
    })

    let ctx = canvas.getContext('2d')
    let x0 = canvas.clientWidth / 2
    let y0 = canvas.clientHeight / 2
    let animate = false

    let x = 0
    let b = 0
    let c = 0
    let zoom = 50

    let raster = () => {
        ctx.save()
        ctx.lineWidth = 1
        ctx.beginPath()
            for (let x=x0+zoom; x<canvas.clientWidth; x+=zoom) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.clientHeight) }
            for (let y=y0+zoom; y<canvas.clientHeight; y+=zoom) { ctx.moveTo(0, y); ctx.lineTo(canvas.clientWidth, y) }
            for (let x=x0-zoom; x>0; x-=zoom) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.clientHeight) }
            for (let y=y0-zoom; y>0; y-=zoom) { ctx.moveTo(0, y); ctx.lineTo(canvas.clientWidth, y) }
            ctx.strokeStyle = "#CCC"
        ctx.stroke()
        ctx.beginPath()
            ctx.moveTo(x0, 0)
            ctx.lineTo(x0, canvas.clientHeight)
            ctx.moveTo(0, y0)
            ctx.lineTo(canvas.clientWidth, y0)
            ctx.strokeStyle = "#F88"
        ctx.stroke()
        ctx.restore()
    }
    let draw = m => {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        raster()
        ctx.font = "10pt Verdana"
        ctx.fillStyle = "blue"
        ctx.fillText(new Date(), 5, 15)

        ctx.save()
        ctx.beginPath()
            ctx.globalAlpha = 0.5
            ctx.fillStyle = "blue"
            ctx.fillRect(x0, y0, x*zoom, -x*zoom)
            ctx.fillStyle = "red"
            ctx.fillRect(x0 + x*zoom, y0, b*zoom, -x*zoom)
            ctx.fillStyle = "green"
            ctx.fillRect(x0, y0 - x*zoom, x*zoom, -c*zoom)
            ctx.fillStyle = "orange"
            ctx.fillRect(x0 + x*zoom, y0 - x*zoom, b*zoom, -c*zoom)

            if (Math.abs((x+b)*(x+c)) > 0) {
                ctx.globalAlpha = 1
                ctx.lineWidth = 2
                ctx.rect(x0, y0, x*zoom + b*zoom, -(x*zoom + c*zoom))
            }
        ctx.stroke()
        ctx.restore()
 
        if (animate) window.requestAnimationFrame(draw)
    }
    let paint = () => {
        if (!animate) window.requestAnimationFrame(draw)
    }
    this.setX = v => {
        x = v
        paint()
    }
    this.setB = v => {
        b = v
        paint()
    }
    this.setC = v => {
        c = v
        paint()
    }
    this.setZoom = v => {
        zoom = v
        paint()
    }
    this.setOrigin = (vx,vy) => {
        x0 = vx
        y0 = vy
        paint()
    }
    this.setAnimate = v => {
        animate = v
        if (animate) window.requestAnimationFrame(draw)
    }
}