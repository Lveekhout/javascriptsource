function Car(id, position, speed, color, interval) {
    this.id = id
    this.position = position
    this.speed = speed
    this.interval = interval
    this.alpha = 0
    this.color = color
    this.history = []

    let acceleration = 0

    this.crash = nextCarArray => {
        const delta = nextCarArray[0].position + nextCarArray[1] - this.position
        if (delta<2) {
            console.log(this)
            console.log(nextCarArray)
        }
        return delta<2
    }

    this.getAcceleration = () => {
        return acceleration
    }

    this.setAcceleration = a => {
        acceleration = a > 5 ? 5 : a < -5 ? -5 : a;
        // if (a>5) {
        //     acceleration = 5
        // } else if (a<-5) {
        //     acceleration = -5
        // } else {
        //     acceleration = a
        // }
    }

    this.update = t => {
        if (this.speed > 0 || acceleration > 0) {
            this.position += acceleration * Math.pow(t, 2) + this.speed * t
            this.speed += 2 * acceleration * t
            if (this.speed < 0) this.speed = 0
        }
    }

    this.decide = nextCarArray => {
        this.alpha = 1

        const b = this.speed
        const s = nextCarArray[0].position + nextCarArray[1] - this.position - 3
        const v = nextCarArray[0].speed
        const result = at(b, s, v)
        // const bots = bots(this.speed, )
        const a = result[0]
        const t = result[1]
        this.history.push({interval: this.interval, b: b, s: s, v: v, a: a, t: t})
        if (isFinite(result[0])) {
            if (result[0] < 0) {
                this.setAcceleration(result[0])
            } else if (isFinite(result[1])) {
                if (result[1] > this.interval / 1000) {
                    this.setAcceleration(result[0])
                }
            } else {
                this.setAcceleration(5)
            }
        }
    }

    //07-02-2020 hoofdstuk 9: https://www.overleaf.com/project/5bc484ce38b3903e926ed5c0
    const at = (b, distance, speed) => {
        const t = 2 * distance / (speed + b)
        return [(speed - b) / (2 * t), t]  // (speed^2-b^2)/4*distance
    }

    const bots = (b, b_, c_) => {
        const t = c_ / (b - b_)
        return ({duration: t, distance: b * t})
    }
}
