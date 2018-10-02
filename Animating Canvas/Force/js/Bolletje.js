function Bolletje() {
    this.mass = 10
    this.position = [1,0]
    this.speed = [0,0]
    let force = 0.001

    this.update = () => {
        if (this.position[0] > 0) this.speed[0] -= force
        else this.speed[0] += force

        this.position[0] += this.speed[0]
        this.position[1] += this.speed[1]
    }
}