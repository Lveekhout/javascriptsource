function Cirkeloppervlak(canvas) {
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
    ctx.fillStyle = "rgba(0,0,0,0.5)"

    let x0 = canvas.clientWidth / 5
    let y0 = canvas.clientHeight / 1.2
    let zoom = 95
    let straal
    let currentStage
    let progressStage1 = 0
    let progressStage2

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
    let drawStage1 = m => {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        raster()

        let x = straal*Math.PI*2*(progressStage1/1000)
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.arc(x0+x*zoom, y0-straal*zoom, straal*zoom, Math.PI/2, Math.PI/2-Math.PI*2*((1000-progressStage1)/1000), true)
        ctx.lineTo(x0+x*zoom, y0-straal*zoom)
        ctx.closePath()
        ctx.fill()

//        ctx.beginPath()
//        ctx.strokeStyle = "red"
//        ctx.arc(x0+x*zoom, y0-straal*zoom, straal*zoom, 0, Math.PI*2, true)
//        ctx.stroke()

        ctx.fillText(new Date(), 5, 15)
    }
    let drawStage2 = m => {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        raster()

        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x0+Math.PI*straal*zoom, y0)
        ctx.lineTo(x0+Math.PI*straal*zoom, y0-0.5*straal*zoom)
        ctx.closePath()
        ctx.fill()

        ctx.save()
        ctx.translate(x0+Math.PI*straal*zoom, y0-0.5*straal*zoom)
        ctx.rotate(Math.PI+Math.PI*progressStage2/1000)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, 0.5*straal*zoom)
        ctx.lineTo(Math.PI*straal*zoom, 0.5*straal*zoom)
        ctx.lineTo(Math.PI*straal*zoom, -0.5*straal*zoom)
        ctx.fill()
        ctx.restore()
        
        ctx.fillText(new Date(), 5, 15)
    }
    let paint = () => {
        window.requestAnimationFrame(currentStage)
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
    this.setStraal = v => {
        straal = v
        paint()
    }
    this.setprogressStage1 = v => {
        progressStage1 = v
        currentStage = drawStage1
        paint()
    }
    this.setprogressStage2 = v => {
        progressStage2 = v
        currentStage = drawStage2
        paint()
    }
}