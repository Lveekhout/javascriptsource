function Object(canvas) {
    let drag = false
    canvas.addEventListener("mousedown", e => drag=true)
    canvas.addEventListener("mouseup", e => drag=false)
    canvas.addEventListener("mouseleave", e => drag=false)
    canvas.addEventListener("mousemove", e => {
        if (e.altKey) this.setOrigin(e.offsetX, e.offsetY)
        else if (drag) this.setOrigin(x0+e.movementX, y0+e.movementY)
        // inverse([(e.offsetX-x0)/zoom, (e.offsetY-y0)/-zoom])
    })

    let ctx = canvas.getContext('2d')

    let x0 = canvas.clientWidth / 2
    let y0 = canvas.clientHeight / 2
    let animate = true
    let rotating = false
    let zoom = 200
    let or = [0, 0]
    this.lfo = new LFO(0.002)

    const inversion = () => {
        ctx.save()

        ctx.translate(x0, y0)
        ctx.scale(1, 1)
        ctx.lineWidth = 1
        ctx.strokeStyle = "#008"

        ctx.beginPath()
        ctx.arc(0, 0, zoom, 0, 2*Math.PI)
        ctx.stroke()

        // ctx.beginPath()
        // ctx.moveTo(0, 0)
        // ctx.lineTo(2*zoom, -zoom)
        // ctx.stroke()

        // ctx.translate(0, -zoom)
        // ctx.save()
        // ctx.rotate(-Math.atan(1/2))
        // ctx.beginPath()
        // ctx.moveTo(0, 0)
        // ctx.lineTo(0, Math.sqrt(5)*zoom)
        // ctx.stroke()
        // ctx.restore()

        // ctx.beginPath()
        // ctx.moveTo(-2*zoom, 0)
        // ctx.lineTo(3*zoom, 0)
        // ctx.setLineDash([zoom/25, zoom/50])
        // ctx.stroke()

        // ctx.translate(2*zoom, 0)
        // ctx.rotate(Math.atan(2)-Math.atan(1/2))
        // ctx.beginPath()
        // ctx.moveTo(0, 0)
        // ctx.lineTo( 0, 3*zoom)
        // ctx.setLineDash([zoom/25, zoom/50])
        // ctx.stroke()

        ctx.restore()
    }

    const inverse = ps => {
        ctx.save()
        ctx.translate(x0, y0)
 
        ctx.beginPath()
        ps.forEach((p, idx) => {
            if (idx===0) ctx.moveTo(p[0]*zoom, -p[1]*zoom)
            else ctx.lineTo(p[0]*zoom, -p[1]*zoom)
        })
        // ctx.closePath()
        ctx.strokeStyle = "#0F0"
        ctx.stroke()

        ctx.beginPath()
        ps.forEach((p, idx) => {
            let len = Math.sqrt(Math.pow(p[0], 2) +Math.pow(p[1], 2))
            let fraction = 1 / Math.pow(len, 2)
            if (idx===0) ctx.moveTo(p[0]*zoom*fraction, -p[1]*zoom*fraction)
            else ctx.lineTo(p[0]*zoom*fraction, -p[1]*zoom*fraction)
        })
        // ctx.closePath()
        ctx.strokeStyle = "#F00"
        ctx.stroke()
 
        ctx.restore()
    }

    const raster = () => {
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
    const draw = m => {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        raster()

        ctx.fillText(new Date(), 5, 15)

        inversion()
        if (rotating) this.lfo.update();
        shapes.forEach(s => {
            points = s
            let rotated = rotate(or, this.lfo.angle)
            inverse(rotated)
        })

        if (animate) window.requestAnimationFrame(draw)
    }
    const paint = () => {
        if (!animate) window.requestAnimationFrame(draw)
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
    this.setRotating = v => {
        rotating = v
    }
    this.setOriginRotation = v => {
        or = v
    }
    draw()
}