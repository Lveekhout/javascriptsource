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

    let x0 = canvas.clientWidth / 2
    let y0 = canvas.clientHeight / 1.2
    let animate = false
    let zoom = 95
    let progress = 100

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

        let _hoek = Math.PI/Math.pow(2,7)*(progress/100)
        let hoek = Math.PI/2 + _hoek/2
        let pos = [1,0]
        let len = 0.024543076571439844
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x0+(pos[0])*zoom, y0-(pos[1])*zoom)
        for (let i=0;i<Math.pow(2,8);i++) {
            pos = [pos[0]+Math.cos(hoek)*len, pos[1]+Math.sin(hoek)*len]
            ctx.lineTo(x0+(pos[0])*zoom, y0-(pos[1])*zoom)
            hoek += _hoek
        }
        ctx.closePath()
        ctx.stroke()

        _hoek = Math.PI/Math.pow(2,7)*(progress/100)
        hoek = Math.PI/2 + _hoek/2
        pos = [1/(4/3),0]
        len = 0.024543076571439844/(4/3)
        ctx.beginPath()
        ctx.moveTo(x0+(pos[0])*zoom, y0-(pos[1])*zoom)
        for (let i=0;i<Math.pow(2,8);i++) {
            pos = [pos[0]+Math.cos(hoek)*len, pos[1]+Math.sin(hoek)*len]
            ctx.lineTo(x0+(pos[0])*zoom, y0-(pos[1])*zoom)
            hoek += _hoek
        }
//        ctx.closePath()
        ctx.stroke()

        _hoek = Math.PI/Math.pow(2,7)*(progress/100)
        hoek = Math.PI/2 + _hoek/2
        pos = [1/2,0]
        len = 0.024543076571439844/2
        ctx.beginPath()
        ctx.moveTo(x0+(pos[0])*zoom, y0-(pos[1])*zoom)
        for (let i=0;i<Math.pow(2,8);i++) {
            pos = [pos[0]+Math.cos(hoek)*len, pos[1]+Math.sin(hoek)*len]
            ctx.lineTo(x0+(pos[0])*zoom, y0-(pos[1])*zoom)
            hoek += _hoek
        }
//        ctx.closePath()
        ctx.stroke()

        _hoek = Math.PI/Math.pow(2,7)*(progress/100)
        hoek = Math.PI/2 + _hoek/2
        pos = [1/3,0]
        len = 0.024543076571439844/3
        ctx.beginPath()
        ctx.moveTo(x0+(pos[0])*zoom, y0-(pos[1])*zoom)
        for (let i=0;i<Math.pow(2,8);i++) {
            pos = [pos[0]+Math.cos(hoek)*len, pos[1]+Math.sin(hoek)*len]
            ctx.lineTo(x0+(pos[0])*zoom, y0-(pos[1])*zoom)
            hoek += _hoek
        }
//        ctx.closePath()
        ctx.stroke()

        _hoek = Math.PI/Math.pow(2,7)*(progress/100)
        hoek = Math.PI/2 + _hoek/2
        pos = [1/4,0]
        len = 0.024543076571439844/4
        ctx.beginPath()
        ctx.moveTo(x0+(pos[0])*zoom, y0-(pos[1])*zoom)
        for (let i=0;i<Math.pow(2,8);i++) {
            pos = [pos[0]+Math.cos(hoek)*len, pos[1]+Math.sin(hoek)*len]
            ctx.lineTo(x0+(pos[0])*zoom, y0-(pos[1])*zoom)
            hoek += _hoek
        }
//        ctx.closePath()
        ctx.stroke()

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
    this.setProgress = v => {
        progress = v
        if (!animate) window.requestAnimationFrame(draw)
    }
    paint()
}