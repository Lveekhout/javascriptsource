function Vierkant(canvas) {
    this.ctx = canvas.getContext('2d')
    this.x0 = canvas.clientWidth / 2
    this.y0 = canvas.clientHeight / 2
    this.center = () => {
        this.ctx.beginPath()
        this.ctx.arc(this.x0, this.y0, 15, 0, 2*Math.PI)
        this.ctx.fillStyle = "red"
        this.ctx.fill()
        this.ctx.lineWidth = 3
        this.ctx.stroke()
    }
    this.draw = (x, b, c) => {
        this.ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // clear canvas

        this.ctx.font = "10pt Verdana"
        this.ctx.fillStyle = "blue"
        this.ctx.fillText(new Date(), 5, 15)

        this.ctx.save()
        this.ctx.beginPath()
            this.ctx.globalAlpha = 0.5
            this.ctx.fillStyle = "blue"
            this.ctx.fillRect(this.x0, this.y0, x, -x)
            this.ctx.fillStyle = "red"
            this.ctx.fillRect(this.x0 + x, this.y0, b, -x)
            this.ctx.fillStyle = "green"
            this.ctx.fillRect(this.x0, this.y0 - x, x, -c)
            this.ctx.fillStyle = "orange"
            this.ctx.fillRect(this.x0 + x, this.y0 - x, b, -c)
            this.ctx.globalAlpha = 1
            this.ctx.lineWidth = 2
            this.ctx.rect(this.x0, this.y0, x + b, -(x + c))
        this.ctx.stroke()
        this.ctx.restore()
//        this.center()
    }
}