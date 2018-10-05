function Bolletje() {
    this.mass = 10
    this.position = [1,0]
    this.speed = [0,0.04]
    let force = 0.001

    this.update = () => {
        if (this.position[0] > 0) this.speed[0] -= force
        else this.speed[0] += force

        if (this.position[1] > 0) this.speed[1] -= force
        else this.speed[1] += force

        this.position[0] += this.speed[0]
        this.position[1] += this.speed[1]
    }
}