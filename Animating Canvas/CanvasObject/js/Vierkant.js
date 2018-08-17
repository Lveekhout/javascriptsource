function Vierkant(canvas) {
    canvas.addEventListener("mousewheel", e => {
        let zoom = this.zoom - e.deltaY/10
        if (zoom<10) zoom = 10
        if (zoom>500) zoom = 500
        this.setZoom(zoom)
    })

    let drag = false
    canvas.addEventListener("mousedown", e => drag=true)
    canvas.addEventListener("mouseup", e => drag=false)
    canvas.addEventListener("mouseleave", e => drag=false)
    canvas.addEventListener("mousemove", e => { if (drag) this.setOrigin(this.x0+e.movementX, this.y0+e.movementY) })

    this.ctx = canvas.getContext('2d')
    this.x0 = canvas.clientWidth / 2
    this.y0 = canvas.clientHeight / 2
    this.animate = false

    this.x
    this.b = 2
    this.c = 1
    this.zoom = 50

    raster = () => {
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
    this.center = () => {
        this.ctx.beginPath()
        this.ctx.arc(this.x0, this.y0, 15, 0, 2*Math.PI)
        this.ctx.fillStyle = "red"
        this.ctx.fill()
        this.ctx.lineWidth = 3
        this.ctx.stroke()
    }
    this.draw = m => {
        this.ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        raster()
        this.ctx.font = "10pt Verdana"
        this.ctx.fillStyle = "blue"
        this.ctx.fillText(new Date(), 5, 15)

        this.ctx.save()
        this.ctx.beginPath()
            this.ctx.globalAlpha = 0.5
            this.ctx.fillStyle = "blue"
            this.ctx.fillRect(this.x0, this.y0, this.x*this.zoom, -this.x*this.zoom)
            this.ctx.fillStyle = "red"
            this.ctx.fillRect(this.x0 + this.x*this.zoom, this.y0, this.b*this.zoom, -this.x*this.zoom)
            this.ctx.fillStyle = "green"
            this.ctx.fillRect(this.x0, this.y0 - this.x*this.zoom, this.x*this.zoom, -this.c*this.zoom)
            this.ctx.fillStyle = "orange"
            this.ctx.fillRect(this.x0 + this.x*this.zoom, this.y0 - this.x*this.zoom, this.b*this.zoom, -this.c*this.zoom)

            if (Math.abs((this.x+this.b)*(this.x+this.c)) > 0) {
                this.ctx.globalAlpha = 1
                this.ctx.lineWidth = 2
                this.ctx.rect(this.x0, this.y0, this.x*this.zoom + this.b*this.zoom, -(this.x*this.zoom + this.c*this.zoom))
            }
        this.ctx.stroke()
        this.ctx.restore()
        this.center()

        if (this.animate) window.requestAnimationFrame(this.draw)
    }
    this.paint = () => {
        if (!this.animate) window.requestAnimationFrame(this.draw)
    }
    this.setX = x => {
        this.x = x
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
    this.setX(4)
}