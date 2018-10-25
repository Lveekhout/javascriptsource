function Triangle(canvas) {
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
    let zoom = 40
    let straal = 1

    let triangle = (line, level) => {
        let delta = [line[1][0]-line[0][0], line[1][1]-line[0][1]]
        let midden = [line[0][0]+delta[0]/2,line[0][1]+delta[1]/2]
        let factor = 0.65/(1+Math.sqrt(2))

        ctx.moveTo(x0+(midden[0]-delta[0]*factor)*zoom, y0-(midden[1]-delta[1]*factor)*zoom)
        ctx.lineTo(x0+(midden[0]+delta[1]*factor)*zoom, y0-(midden[1]-delta[0]*factor)*zoom)
        ctx.lineTo(x0+(midden[0]+delta[0]*factor)*zoom, y0-(midden[1]+delta[1]*factor)*zoom)

        if (level>0) {
            triangle([line[0],[midden[0]-delta[0]*factor,midden[1]-delta[1]*factor]], level-1)
            triangle([[midden[0]-delta[0]*factor,midden[1]-delta[1]*factor],[midden[0]+delta[1]*factor,midden[1]-delta[0]*factor]], level-1)
            triangle([[midden[0]+delta[1]*factor,midden[1]-delta[0]*factor],[midden[0]+delta[0]*factor,midden[1]+delta[1]*factor]], level-1)
            triangle([[midden[0]+delta[0]*factor,midden[1]+delta[1]*factor],line[1]], level-1)
            triangle([[midden[0]-delta[0]*factor,midden[1]-delta[1]*factor],[midden[0]+delta[0]*factor,midden[1]+delta[1]*factor]], level-1)
        }
    }
    let draw = m => {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        let line = [[20,0], [-20,0]]
        ctx.beginPath()
        triangle(line, 6)
        triangle([line[1],line[0]], 6)
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
    paint()
}