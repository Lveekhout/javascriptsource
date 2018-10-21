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
    let zoom = 200
    let lfo = new LFO(0.06)
    let straal = 2

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
    let calcLength = (line) => {
        return Math.sqrt(Math.pow(line[0][0]-line[1][0],2)+Math.pow(line[0][1]-line[1][1],2))
    }
    let calcPunt = (rc,len) => {
        let fraction = len/calcLength([[0,0],rc])
        let _rc = [rc[1]*fraction,-rc[0]*fraction]
        return _rc
    }
    let fractal = (line) => {
//        console.log(line[0] + " - " + line[1])
        let delta = [line[1][0]-line[0][0],line[1][1]-line[0][1]]
        let rc = delta[1]/delta[0]
        let midden = [line[0][0]+delta[0]/2,line[0][1]+delta[1]/2]
        let lengte = straal-calcLength([midden,[0,0]])
        ctx.beginPath()
        ctx.moveTo(x0+line[0][0]*zoom, y0-line[0][1]*zoom)
        ctx.lineTo(x0+line[1][0]*zoom, y0-line[1][1]*zoom)
        ctx.moveTo(x0+midden[0]*zoom, y0-midden[1]*zoom)
        ctx.lineTo(x0+midden[0]+calcPunt(delta,straal)[0]*zoom, y0-midden[1]-calcPunt(delta,straal)[1]*zoom)
        ctx.stroke()

        ctx.save()
        ctx.beginPath()
        ctx.arc(x0+midden[0]*zoom, y0-midden[1]*zoom, 2, 0 , Math.PI*2)
        ctx.strokeStyle = "red"
        ctx.stroke()
        ctx.restore()
    }
    let draw = m => {
        if (animate) { lfo.update(); zoom = 110 + lfo.value * 100 }

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        raster()
        ctx.beginPath()
        ctx.arc(x0, y0, straal*zoom, 0, Math.PI*2, true)
        ctx.stroke()
        fractal([[straal,0],[-straal,0]])
        fractal([[straal,0],[0,straal]])
        fractal([[straal,0],[straal*Math.sqrt(0.5),straal*Math.sqrt(0.5)]])

        ctx.fillText(new Date(), 5, 15)

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
    paint()
}