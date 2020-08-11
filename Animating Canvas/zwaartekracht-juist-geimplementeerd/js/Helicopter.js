class Helicopter extends Image {
    #step
    constructor(offset) {
        super()
        this.pos = [0, 0]
        this.speed = [0, 0]
        this.rotation = 0
        this.offset = offset
        this.#step = 2
        this.scale = 1

        this.onload = event => this.scale = 3/this.height
    }

    apply_acc = (acc, delta) => {
        for (let i=0;i<2;i++) {
            // this.pos[i] += acc[i] * Math.pow(this.step, 2) + this.speed[i] * this.#step
            // this.speed[i] += 2 * acc[i] * this.#step
            this.pos[i] += acc[i] * Math.pow(delta, 2) + this.speed[i] * delta
            this.speed[i] += 2 * acc[i] * delta
        }
    }

    get step() {
        return this.#step
    }

    set step(value) {
        this.#step = value
    }
}