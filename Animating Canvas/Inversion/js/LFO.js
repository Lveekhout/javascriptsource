function LFO(speed) {
    this.angle = 0
    this.speed = speed
    this.value = Math.sin(this.angle)
    this.update = () => {
        this.angle += this.speed
        if (this.angle>Math.PI*2) this.angle -= Math.PI*2
        this.value = Math.sin(this.angle)
    }
    this.setSpeed = v => this.speed = v
}