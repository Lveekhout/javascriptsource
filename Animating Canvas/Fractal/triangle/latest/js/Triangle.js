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

    let animate
    let snowflake = new Snowflake()
    let x0 = canvas.clientWidth / 2
    let y0 = canvas.clientHeight / 2
    let zoom = 20
    let factor = 0.65/(1+Math.sqrt(2))
    let lfo = new LFO(0.1)
    let scroll
//    let lines
//
//    let triangle = (line, level) => {
//        let delta = [line[1][0]-line[0][0], line[1][1]-line[0][1]]
//        let midden = [line[0][0]+delta[0]/2,line[0][1]+delta[1]/2]
//
//        ctx.save()
//        ctx.beginPath()
//        ctx.moveTo(x0+(midden[0]-delta[0]*factor)*zoom, y0-(midden[1]-delta[1]*factor)*zoom)
//        ctx.lineTo(x0+(midden[0]+delta[1]*factor)*zoom, y0-(midden[1]-delta[0]*factor)*zoom)
//        ctx.lineTo(x0+(midden[0]+delta[0]*factor)*zoom, y0-(midden[1]+delta[1]*factor)*zoom)
//        ctx.closePath()
//        ctx.fillStyle = 'rgba(' + parseInt(128+lfo.value*128) + ',0,' + parseInt(128-lfo.value*128) + ',' + 1/(level+2) + ')'
//        ctx.fill()
//        ctx.restore()
//        lines.push([[midden[0]-delta[0]*factor, midden[1]-delta[1]*factor], [midden[0]+delta[1]*factor, midden[1]-delta[0]*factor]])
//        lines.push([[midden[0]+delta[1]*factor, midden[1]-delta[0]*factor], [midden[0]+delta[0]*factor, midden[1]+delta[1]*factor]])
//
//        if (level>0) {
//            triangle([line[0],[midden[0]-delta[0]*factor,midden[1]-delta[1]*factor]], level-1)
//            triangle([[midden[0]-delta[0]*factor,midden[1]-delta[1]*factor],[midden[0]+delta[1]*factor,midden[1]-delta[0]*factor]], level-1)
//            triangle([[midden[0]+delta[1]*factor,midden[1]-delta[0]*factor],[midden[0]+delta[0]*factor,midden[1]+delta[1]*factor]], level-1)
//            triangle([[midden[0]+delta[0]*factor,midden[1]+delta[1]*factor],line[1]], level-1)
//            triangle([[midden[0]-delta[0]*factor,midden[1]-delta[1]*factor],[midden[0]+delta[0]*factor,midden[1]+delta[1]*factor]], level-1)
//        }
//    }
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
        if (animate) { lfo.update(); factor = 0.25+lfo.value/scroll }
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        raster()

        for (i=0; i<snowflake.lines.length;i++) {
            ctx.beginPath()
            ctx.moveTo(x0+snowflake.lines[i][0][0]*zoom, y0-snowflake.lines[i][0][1]*zoom)
            ctx.lineTo(x0+snowflake.lines[i][1][0]*zoom, y0-snowflake.lines[i][1][1]*zoom)
            ctx.stroke()
        }

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
    this.setScroll = v => {
        scroll = v
        paint()
    }
    this.setAnimate = v => {
        animate = v
        if (animate) paint()
    }
}