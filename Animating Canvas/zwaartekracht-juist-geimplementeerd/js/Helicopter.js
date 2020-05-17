class Helicopter extends Image {
    #step
    constructor(offset) {
        super()
        this.pos = [0, 0]
        this.speed = [0, 0]
        this.rotation = 0
        this.offset=offset
        this.#step = 2
    }

    apply_acc = (acc) => {
        for (let i=0;i<2;i++) {
            this.pos[i] += acc[i] * Math.pow(this.step, 2) + this.speed[i] * this.#step
            this.speed[i] += 2 * acc[i] * this.#step
        }
    }

    get step() {
        return this.#step
    }

    set step(value) {
        this.#step = value
    }
}