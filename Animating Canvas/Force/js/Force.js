function Force(canvas) {
    let ctx = canvas.getContext('2d')
    let x0 = canvas.clientWidth / 4
    let y0 = canvas.clientHeight / 2
    let animate = false
    let zoom
    let lfo = new LFO(0.02)
    let vector1 = [1,2]
    let vector2 = [2,-1]

    let resolve = v => {
        let result = [0,0]
        v.forEach(e => {
            result[0] += e[0]
            result[1] += e[1]
        })
        return result
    }

    let arrow = (fromx, fromy, tox, toy) => {
        let headlen = 15
        let angle = Math.atan2(toy-fromy,tox-fromx)
        ctx.beginPath()
        ctx.moveTo(fromx, fromy)
        ctx.lineTo(tox, toy)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(tox-headlen*Math.cos(angle-Math.PI/18),toy-headlen*Math.sin(angle-Math.PI/18))
        ctx.lineTo(tox, toy)
        ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/18),toy-headlen*Math.sin(angle+Math.PI/18))
        ctx.fill()
    }

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
        if (animate) { lfo.update(); vector1[0] = lfo.value }

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        raster()
        ctx.fillText(new Date(), 5, 15)

        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = "blue"
        ctx.fillStyle = "blue"
        arrow(x0, y0, x0 + zoom * vector1[0], y0 - zoom * vector1[1])
        arrow(x0, y0, x0 + zoom * vector2[0], y0 - zoom * vector2[1])
        ctx.stroke()

        ctx.beginPath()
        let vector = resolve([vector1, vector2])
        ctx.setLineDash([16,8])
        arrow(x0 + zoom * vector1[0], y0 - zoom * vector1[1], x0 + zoom * vector[0], y0 - zoom * vector[1])
        arrow(x0 + zoom * vector2[0], y0 - zoom * vector2[1], x0 + zoom * vector[0], y0 - zoom * vector[1])
        ctx.stroke()

        ctx.beginPath()
        ctx.strokeStyle = "red"
        ctx.fillStyle = "red"
        ctx.setLineDash([])
        arrow(x0, y0, x0 + zoom * vector[0], y0 - zoom * vector[1])
        ctx.stroke()
        ctx.restore()

        if (animate) window.requestAnimationFrame(draw)
    }
    let paint = () => {
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
 
    let drag = false
    canvas.addEventListener("mousedown", e => drag=true)
    canvas.addEventListener("mouseup", e => drag=false)
    canvas.addEventListener("mouseleave", e => drag=false)
    canvas.addEventListener("mousemove", e => { if (e.altKey) this.setOrigin(e.offsetX, e.offsetY); else if (drag) this.setOrigin(x0+e.movementX, y0+e.movementY) })
    canvas.addEventListener("mousewheel", e => { let _zoom = zoom - e.deltaY/10;  if (_zoom<10) _zoom = 10; if (_zoom>500) _zoom = 500; this.setZoom(_zoom) })

    this.setZoom(150)
}