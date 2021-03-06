function Object(ctx) {
    this.dim = [3, 2] // dimention
    this.ctr = [1.5, 1] // center of mass
    this.pos = [-10, -10]
    this.acc = [-0.1, -0.3]
    this.speed = [10, 30]
    this.Fd = 0
    this.Fw

    let mass = this.dim[0] * this.dim[1] // massa in kg
    let Us = 1.0
    let Uk = 0.5

    this.wrijving = dt => { // dt = delta t = tijd in sec
        // if (this.speed[0]>0) {
        //     let Fn = mass * 9.81
        //     this.Fw = Uk * Fn
        // }
        this.pos[0] += this.acc[0]*Math.pow(dt, 2) + this.speed[0]*dt; this.speed[0] += 2*this.acc[0]
        this.pos[1] += this.acc[1]*Math.pow(dt, 2) + this.speed[1]*dt; this.speed[1] += 2*this.acc[1]
        if (this.speed[0]<0) { this.acc[0] = 0; this.speed[0] = 0}
        if (this.speed[1]<0) { this.acc[1] = 0; this.speed[1] = 0}
    }
    this.draw = scale => {
        ctx.save()
        ctx.fillText(this.pos[0].toFixed(2), 0, 0)
        ctx.translate(-this.ctr[0]*scale, -this.ctr[1]*scale)
        ctx.beginPath()
        ctx.rect(this.pos[0]*scale, this.pos[1]*scale, this.dim[0]*scale, this.dim[1]*scale)
        ctx.fill()
        arrow2d([(this.pos[0]+this.ctr[0])*scale, (this.pos[1]+this.ctr[1])*scale], this.Fd, 0, "red")
        arrow2d([(this.pos[0]+this.ctr[0])*scale, (this.pos[1]+this.ctr[1])*scale], this.Fw, 0, "blue")
        ctx.restore()
    }
    const arrow2d = (position, length, rotate, kleur) => {
        let size = 12
        ctx.save()
        ctx.strokeStyle = kleur
        ctx.fillStyle = kleur
        ctx.lineWidth = 1

        ctx.translate(position[0], position[1])
        ctx.rotate(rotate)

        ctx.beginPath()
        ctx.arc(0, 0, size/4, 0, Math.PI*2)
        ctx.fill()

        ctx.save()
        ctx.beginPath()
        ctx.rect(0, -size/4, length, size/2)
        ctx.clip()

        ctx.beginPath()
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
        ctx.restore()
    }
}