function Render3D(canvas) {
    canvas.addEventListener("mousewheel", e => {
        let _zoom = zoom - e.deltaY/10
        if (_zoom<10) _zoom = 10
        if (_zoom>500) _zoom = 500
        this.setZoom(_zoom)
    })

    let drag = false
    canvas.addEventListener("mousedown", () => drag=true)
    canvas.addEventListener("mouseup", () => drag=false)
    canvas.addEventListener("mouseleave", () => drag=false)
    canvas.addEventListener("mousemove", e => {
        if (e.altKey) this.setOrigin(e.offsetX, e.offsetY)
        else if (drag) this.setOrigin(x0+e.movementX, y0+e.movementY)
    })

    let ctx = canvas.getContext('2d')
    ctx.fillStyle = "red"
    ctx.strokeStyle = "cyan"
    ctx.lineWidth = 3

    let x0 = canvas.clientWidth / 2
    let y0 = canvas.clientHeight / 2
    let animate = true
    let zoom = 300
    let lfos = [new LFO(0.01), new LFO(0.005), new LFO(0.0025)]
    let depth = 7

    //https://nl.wikipedia.org/wiki/Rotatiematrix
    const rotateLinesX = (lines, angle) => lines.map(line => [[line[0][0],line[0][1]*Math.cos(angle) - line[0][2]*Math.sin(angle),line[0][1]*Math.sin(angle) + line[0][2]*Math.cos(angle)], [line[1][0],line[1][1]*Math.cos(angle) - line[1][2]*Math.sin(angle),line[1][1]*Math.sin(angle) + line[1][2]*Math.cos(angle)]])
    const rotateLinesY = (lines, angle) => lines.map(line => [[line[0][0]*Math.cos(angle) + line[0][2]*Math.sin(angle),line[0][1],-line[0][0]*Math.sin(angle) + line[0][2]*Math.cos(angle)], [line[1][0]*Math.cos(angle) + line[1][2]*Math.sin(angle),line[1][1],-line[1][0]*Math.sin(angle) + line[1][2]*Math.cos(angle)]])
    const rotateLinesZ = (lines, angle) => lines.map(line => [[line[0][0]*Math.cos(angle) - line[0][1]*Math.sin(angle),line[0][0]*Math.sin(angle) + line[0][1]*Math.cos(angle),line[0][2]], [line[1][0]*Math.cos(angle) - line[1][1]*Math.sin(angle),line[1][0]*Math.sin(angle) + line[1][1]*Math.cos(angle),line[1][2]]])
    const rotatePointsX = (points, angle) => points.map(point => [point[0],point[1]*Math.cos(angle) - point[2]*Math.sin(angle),point[1]*Math.sin(angle) + point[2]*Math.cos(angle)])
    const rotatePointsY = (points, angle) => points.map(point => [point[0]*Math.cos(angle) + point[2]*Math.sin(angle),point[1],-point[0]*Math.sin(angle) + point[2]*Math.cos(angle)])
    const rotatePointsZ = (points, angle) => points.map(point => [point[0]*Math.cos(angle) - point[1]*Math.sin(angle),point[0]*Math.sin(angle) + point[1]*Math.cos(angle),point[2]])

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
        if (animate) {
            window.requestAnimationFrame(draw)
            lfos.forEach(lfo => lfo.update())
        }

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        // raster()

        ctx.save()
        ctx.beginPath()
        ctx.arc(x0, y0, zoom, 0, 2*Math.PI)
        ctx.fillStyle = "#FF000020"
        ctx.fill()
        ctx.restore()

        let lines = []
        lines.push([[ 0, 0, 0], [ 1, 0, 0]])  // straal
        // lines.push([[-2, 0, 0], [ 2, 0, 0]])  // x-as
        // lines.push([[ 0,-2, 0], [ 0, 2, 0]])  // y-as
        // lines.push([[ 0, 0,-2], [ 0, 0, 2]])  // z-as
        // lines.push([[ 1, 1,-1], [-1, 1,-1]])
        // lines.push([[-1, 1,-1], [-1,-1,-1]])
        // lines.push([[-1,-1,-1], [ 1,-1,-1]])
        // lines.push([[ 1,-1,-1], [ 1, 1,-1]])
        // lines.push([[ 1, 1, 1], [-1, 1, 1]])
        // lines.push([[-1, 1, 1], [-1,-1, 1]])
        // lines.push([[-1,-1, 1], [ 1,-1, 1]])
        // lines.push([[ 1,-1, 1], [ 1, 1, 1]])
        // lines.push([[ 1, 1,-1], [ 1, 1, 1]])
        // lines.push([[-1, 1,-1], [-1, 1, 1]])
        // lines.push([[-1,-1,-1], [-1,-1, 1]])
        // lines.push([[ 1,-1,-1], [ 1,-1, 1]])
        let lines_ = rotateLinesX(lines, lfos[0].angle)
        lines_ = rotateLinesY(lines_, lfos[1].angle)
        lines_ = rotateLinesZ(lines_, lfos[2].angle)
        lines_.forEach(line => {
            let d = [line[0][2]/depth+1, line[1][2]/depth+1] // f(x) -> 1/(x/2.4+1)
            ctx.beginPath()
            ctx.moveTo(x0+line[0][0]/d[0]*zoom, y0-line[0][1]/d[0]*zoom)
            ctx.lineTo(x0+line[1][0]/d[1]*zoom, y0-line[1][1]/d[1]*zoom)
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(x0+line[0][0]/d[0]*zoom, y0-line[0][1]/d[0]*zoom, 3, 0, 2*Math.PI)
            ctx.arc(x0+line[1][0]/d[1]*zoom, y0-line[1][1]/d[1]*zoom, 3, 0, 2*Math.PI)
            ctx.fill()
        })

        let points = []
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x), Math.sin(x), 0])
        points = rotatePointsY(points, Math.PI/10)
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x), Math.sin(x), 0])
        points = rotatePointsY(points, Math.PI/10)
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x), Math.sin(x), 0])
        points = rotatePointsY(points, Math.PI/10)
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x), Math.sin(x), 0])
        points = rotatePointsY(points, Math.PI/10)
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x), Math.sin(x), 0])
        points = rotatePointsY(points, Math.PI/10)
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x), Math.sin(x), 0])
        points = rotatePointsY(points, Math.PI/10)
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x), Math.sin(x), 0])
        points = rotatePointsY(points, Math.PI/10)
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x), Math.sin(x), 0])
        points = rotatePointsY(points, Math.PI/10)
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x), Math.sin(x), 0])
        points = rotatePointsY(points, Math.PI/10)
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x), Math.sin(x), 0])

        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x), 0, Math.sin(x)])
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x)*Math.cos(Math.PI/4), Math.sin(Math.PI/4), Math.sin(x)*Math.cos(Math.PI/4)])
        for (let x=0;x<2*Math.PI;x+=Math.PI/50) points.push([Math.cos(x)*Math.cos(Math.PI/4), -Math.sin(3*Math.PI/4), Math.sin(x)*Math.cos(Math.PI/4)])

        let points_ = rotatePointsX(points, lfos[0].angle)
        points_ = rotatePointsY(points_, lfos[1].angle)
        points_ = rotatePointsZ(points_, lfos[2].angle)
        points_ = points_.filter(point => point[2]<0)
        points_.forEach(point => {
            let d = point[2] / depth + 1 // f(x) -> 1/(x/2.4+1)
            ctx.beginPath()
            ctx.arc(x0 + point[0] / d * zoom, y0 - point[1] / d * zoom, 2, 0, 2 * Math.PI)
            ctx.fill()
        })

        ctx.fillText(new Date(), 5, 15)
        ctx.fillText("depth = " + depth, 5, 35)
    }
    let paint = () => {
        if (!animate) window.requestAnimationFrame(draw)
    }
    this.setDepth = v => {
        depth = v
        paint()
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
    window.requestAnimationFrame(draw)
}