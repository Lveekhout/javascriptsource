function Pi(canvas) {
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
    ctx.strokeStyle = "deepskyblue"
    ctx.lineWidth = 3
    ctx.font = "10pt Verdana"
    ctx.fillStyle = "blue"
    ctx.globalAlpha = 1

    let x0 = canvas.clientWidth / 4
    let y0 = canvas.clientHeight / 2
    let animate = false

    let r = 1
    let angle
    let zoom = 200
    let lfo = new LFO(0.02)

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
        if (animate) { lfo.update(); angle = lfo.angle * 180 / Math.PI }

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        raster()

        ctx.fillText(new Date(), 5, 15)

        ctx.save()
        ctx.beginPath()
        ctx.arc(x0, y0, r * zoom, 0, 2*Math.PI, false);
        ctx.strokeStyle = "rgba(0,0,255,0.1)"
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x0 + r*zoom*Math.cos(angle/180*Math.PI), y0)
        ctx.lineTo(x0 + r*zoom*Math.cos(angle/180*Math.PI), y0 - r*zoom*Math.sin(angle/180*Math.PI))
        ctx.lineTo(x0, y0 - r*zoom*Math.sin(angle/180*Math.PI))
        ctx.strokeStyle = "rgba(255,0,255,0.5)"
        ctx.setLineDash([8, 4]);
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x0, y0, r/10 * zoom, 0, -angle/180*Math.PI, true);
        ctx.strokeStyle = "blue"
        ctx.setLineDash([]);
        ctx.lineWidth = 3
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x0 + 1.5*r*zoom, y0)
        ctx.lineTo(x0, y0)
        ctx.lineTo(x0 + 1.5*r*zoom*Math.cos(angle/180*Math.PI), y0 - 1.5*r*zoom*Math.sin(angle/180*Math.PI))
        ctx.strokeStyle = "blue"
        ctx.setLineDash([]);
        ctx.lineWidth = 3
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x0, y0)
        for (let x=1;x<360;x++) {
            ctx.lineTo(x0 + x, y0 - 100*Math.sin(x/180*Math.PI))
        }
        ctx.stroke()
        ctx.restore()

        if (animate) window.requestAnimationFrame(draw)
    }
    let paint = () => {
        if (!animate) window.requestAnimationFrame(draw)
    }
    this.setAngle = v => {
        angle = v
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