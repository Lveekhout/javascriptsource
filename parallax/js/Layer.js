class Layer extends Image {
    constructor(pos, offset) {
        super()
        this.pos = pos
        this.offset = offset
    }
    scale = 1

    draw(ctx) {
        ctx.save()
        ctx.translate(this.pos[0], this.pos[1])
        ctx.translate(this.offset[0], this.offset[1])
        ctx.scale(this.scale, this.scale)
        ctx.drawImage(this, -this.offset[0], -this.offset[1])
        ctx.restore()
    }
}