function Object(canvas) {
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
    let zoom = 80

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

        ctx.save()
        ctx.beginPath()
        ctx.translate(x0, y0)
        json.forEach(v => canvas_arrow(0, 0, v[0]*zoom, -v[1]*zoom))
        ctx.stroke()

        let resutantkracht = [0, 0]
        ctx.beginPath()
        json.forEach((v,i) => {
            resutantkracht = [resutantkracht[0] + v[0], resutantkracht[1] + v[1]]
            if (i==0) {
                ctx.translate(v[0] * zoom, -v[1] * zoom)
            } else {
                ctx.moveTo(0, 0)
                ctx.lineTo(v[0]*zoom, -v[1]*zoom)
                ctx.translate(v[0] * zoom, -v[1] * zoom)
            }
        })
        ctx.setLineDash([5, 5])
        ctx.strokeStyle = "blue"
        ctx.stroke()

        ctx.beginPath()
        canvas_arrow(-resutantkracht[0]*zoom, resutantkracht[1]*zoom, 0, 0)
        ctx.setLineDash([])
        ctx.strokeStyle = "red"
        ctx.stroke()
        ctx.restore()

        ctx.fillText(new Date(), 5, 15)

        if (animate) window.requestAnimationFrame(draw)
    }
    let canvas_arrow = (fromx, fromy, tox, toy) => {
        var headlen = 10;   // length of head in pixels
        var angle = Math.atan2(toy-fromy,tox-fromx);
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    }
    this.paint = () => {
        if (!animate) window.requestAnimationFrame(draw)
    }
    this.setZoom = v => {
        zoom = v
        this.paint()
    }
    this.setOrigin = (vx,vy) => {
        x0 = vx
        y0 = vy
        this.paint()
    }
    this.setAnimate = v => {
        animate = v
        if (animate) window.requestAnimationFrame(draw)
    }
    this.paint()
}