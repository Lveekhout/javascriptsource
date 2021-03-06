function Grafiek(canvas) {
    canvas.width = canvas.parentNode.clientWidth
    canvas.height = canvas.parentNode.clientHeight

    const ctx = canvas.getContext('2d')
    console.log(ctx.strokeStyle)

    let origin = []
    this.scale = 30
    let prevTime
    this.object = new Object(ctx)

    const draw = t => {
        let dt = t - prevTime
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        ctx.fillText(dt, 10, 10)
        this.object.wrijving(dt/1000)

        ctx.save()
        ctx.translate(origin[0], origin[1])
        this.object.draw(this.scale)
        ctx.restore()

        prevTime = t; window.requestAnimationFrame(draw)
    }
    const initAnimate = t => {
        prevTime = t; window.requestAnimationFrame(draw)
    }
    this.draw = () => {
        window.requestAnimationFrame(initAnimate)
    }
    this.initContext = () => {
        origin = [Math.trunc(canvas.clientWidth/2), Math.trunc(canvas.clientHeight/2)]
        ctx.font = "9pt Courier new"
        ctx.textBaseline = "top"
        ctx.fillStyle = "gray"
        ctx.lineWidth = 3
    }

    this.initContext()
}