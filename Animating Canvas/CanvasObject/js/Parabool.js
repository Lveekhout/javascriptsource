function Parabool(canvas) {
    canvas.addEventListener("mousewheel", e => {
        let zoom = this.zoom - e.deltaY/100
        if (zoom<10) zoom = 10
        if (zoom>500) zoom = 500
        this.setZoom(zoom)
    })

    this.onSetXPos
    let drag = false
    canvas.addEventListener("mousedown", e => drag=true)
    canvas.addEventListener("mouseup", e => drag=false)
    canvas.addEventListener("mouseleave", e => drag=false)
    canvas.addEventListener("mousemove", e => {
        if (e.ctrlKey) { if (this.onSetXPos) this.onSetXPos(parseFloat(((e.offsetX-this.x0)/this.zoom).toFixed(1))) }
        else if (drag) this.setOrigin(this.x0+e.movementX, this.y0+e.movementY)
    })

    this.ctx = canvas.getContext('2d')
    this.x0 = canvas.clientWidth / 2
    this.y0 = canvas.clientHeight / 2
    this.animate = false

    this.p = 2
    this.q = 1
    this.zoom

    let raster = () => {
        this.ctx.save()
        this.ctx.lineWidth = 1
        this.ctx.beginPath()
            for (let x=this.x0+this.zoom; x<canvas.clientWidth; x+=this.zoom) { this.ctx.moveTo(x, 0); this.ctx.lineTo(x, canvas.clientHeight) }
            for (let y=this.y0+this.zoom; y<canvas.clientHeight; y+=this.zoom) { this.ctx.moveTo(0, y); this.ctx.lineTo(canvas.clientWidth, y) }
            for (let x=this.x0-this.zoom; x>0; x-=this.zoom) { this.ctx.moveTo(x, 0); this.ctx.lineTo(x, canvas.clientHeight) }
            for (let y=this.y0-this.zoom; y>0; y-=this.zoom) { this.ctx.moveTo(0, y); this.ctx.lineTo(canvas.clientWidth, y) }
            this.ctx.strokeStyle = "#CCC"
        this.ctx.stroke()
        this.ctx.beginPath()
            this.ctx.moveTo(this.x0, 0)
            this.ctx.lineTo(this.x0, canvas.clientHeight)
            this.ctx.moveTo(0, this.y0)
            this.ctx.lineTo(canvas.clientWidth, this.y0)
            this.ctx.strokeStyle = "#F88"
        this.ctx.stroke()
        this.ctx.restore()
    }
    this.draw = m => {
        this.ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        raster()
        this.ctx.font = "10pt Verdana"
        this.ctx.fillStyle = "blue"
        this.ctx.fillText(new Date(), 5, 15)

        if (this.animate) window.requestAnimationFrame(this.draw)
    }
    this.paint = () => {
        if (!this.animate) window.requestAnimationFrame(this.draw)
    }
    this.setP = p => {
        this.p = p
        this.paint()
    }
    this.setQ = q => {
        this.q = q
        this.paint()
    }
    this.setZoom = zoom => {
        this.zoom = zoom
        this.paint()
    }
    this.setOrigin = (x,y) => {
        this.x0 = x
        this.y0 = y
        this.paint()
    }
    this.setAnimate = checked => {
        this.animate = checked
        if (checked) window.requestAnimationFrame(this.draw)
    }
    this.setZoom(50)
}