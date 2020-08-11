const arrow2d = (canvas, position, length, rotate) => {
    let size = 12
    let ctx = canvas.getContext("2d")
    ctx.save()
    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'red'
    ctx.lineWidth = 1

    ctx.translate(position[0], position[1])
    ctx.translate(0.5, 0.5)
    ctx.rotate(rotate)
    // ctx.scale(10, 10)

    // ctx.beginPath()
    // ctx.rect(0, -size/4, length, size/2 )
    // ctx.clip()

    ctx.moveTo(0, 0)
    ctx.lineTo(length-size, 0)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(length-size, 0)
    ctx.lineTo(length-size, -size/4)
    ctx.lineTo(length, 0)
    ctx.lineTo(length-size, size/4)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
}