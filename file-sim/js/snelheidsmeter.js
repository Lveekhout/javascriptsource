const drawSnelheidsmeter = (ctx, x, y, zoom, r) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(zoom/6, zoom/6)

    for (i=0;i<=25;i++) {
        ctx.beginPath()
        ctx.moveTo(110, 0)
        ctx.lineTo(120, 0)
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.fillText(25-i, 140, 4)
        ctx.rotate(-Math.PI/25)
    }
    ctx.restore()

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(r)
    ctx.scale(1/2, 1/2)
    ctx.beginPath()
    ctx.arc(0, 0, 10, 1.5*Math.PI, 0.5*Math.PI, true)
    ctx.lineTo(200, 0)
    ctx.closePath()
    ctx.shadowBlur = 10
    ctx.shadowColor = "black"
    ctx.fillStyle = "#123456"
    // ctx.lineWidth = 10
    ctx.fill()

    ctx.restore()
}